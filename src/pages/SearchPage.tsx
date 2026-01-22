import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Volume2, Filter, Mic, MicOff, Loader2 } from 'lucide-react';
import { translations } from '../data/translations';
import { Translation } from '../types';
import { getAITranslationWithCache, AITranslationResponse } from '../services/aiTranslation';
import AIResultCard from '../components/AIResultCard';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Translation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isListening, setIsListening] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AITranslationResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    performSearch(q);
  }, [searchParams]);

  const performSearch = async (searchQuery: string, category: string = selectedCategory) => {
    const lowerQuery = searchQuery.toLowerCase();
    let filtered = translations;

    // 검색어로 필터링
    if (searchQuery.trim()) {
      filtered = translations.filter(t => 
        t.term.toLowerCase().includes(lowerQuery) ||
        t.simple.toLowerCase().includes(lowerQuery) ||
        t.detailed.toLowerCase().includes(lowerQuery) ||
        t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // 카테고리로 필터링
    if (category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }

    setResults(filtered);

    // 검색 결과가 없고 검색어가 있으면 AI 번역 시도
    if (filtered.length === 0 && searchQuery.trim()) {
      await tryAITranslation(searchQuery);
    } else {
      setAiResult(null);
      setAiError(null);
    }
  };

  const tryAITranslation = async (term: string) => {
    setIsLoadingAI(true);
    setAiError(null);
    
    try {
      const result = await getAITranslationWithCache(term);
      setAiResult(result);
    } catch (error) {
      console.error('AI Translation Error:', error);
      setAiError('AI 번역을 불러올 수 없습니다. n8n 워크플로우가 실행 중인지 확인해주세요.');
      setAiResult(null);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('음성 인식이 지원되지 않는 브라우저입니다.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setSearchParams({ q: transcript });
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'pangyo', name: '판교어' },
    { id: 'digital', name: '디지털 기초' },
    { id: 'trend', name: 'MZ 트렌드' },
    { id: 'tech', name: '기술 용어' }
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Search Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">검색</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="궁금한 단어를 입력하세요..."
                className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                aria-label="검색어 입력"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
            
            <button
              type="button"
              onClick={startVoiceRecognition}
              className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
              aria-label="음성 검색"
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              검색
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-gray-500" />
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  performSearch(query, cat.id);
                }}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {results.length}개의 결과
          {query && <span className="text-primary-600"> - "{query}"</span>}
          {aiResult && <span className="text-purple-600 ml-2">+ AI 번역</span>}
        </h2>
        
        {isListening && (
          <div className="flex items-center gap-2 text-red-600 animate-pulse">
            <Mic className="w-5 h-5" />
            <span className="font-semibold">듣고 있습니다...</span>
          </div>
        )}

        {isLoadingAI && (
          <div className="flex items-center gap-2 text-purple-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-semibold">AI 번역 중...</span>
          </div>
        )}
      </div>

      {/* AI Translation Result */}
      {aiResult && !isLoadingAI && (
        <AIResultCard result={aiResult} onSpeak={speak} />
      )}

      {/* AI Error */}
      {aiError && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚠️</span>
            <h3 className="text-lg font-bold text-red-800">AI 번역 실패</h3>
          </div>
          <p className="text-red-700 mb-3">{aiError}</p>
          <details className="text-sm text-red-600">
            <summary className="cursor-pointer hover:text-red-800 font-semibold mb-2">
              해결 방법 보기 ▼
            </summary>
            <div className="bg-white p-4 rounded-lg mt-2 space-y-2">
              <p>1. n8n이 실행 중인지 확인: http://localhost:5678</p>
              <p>2. 워크플로우가 활성화되어 있는지 확인</p>
              <p>3. OpenAI API 키가 올바르게 설정되었는지 확인</p>
              <p>4. .env 파일의 VITE_N8N_WEBHOOK_URL이 올바른지 확인</p>
              <p className="text-primary-600 font-semibold mt-3">
                자세한 설정 방법: N8N_SETUP_GUIDE.md 참고
              </p>
            </div>
          </details>
        </div>
      )}

      {/* Results List */}
      {results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((translation) => {
            const isExpanded = expandedId === translation.id;
            
            // 카테고리별 배경색 정의
            const categoryStyles = {
              pangyo: {
                bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
                border: 'border-orange-200',
                badge: 'bg-orange-500 text-white',
                text: 'text-orange-700'
              },
              digital: {
                bg: 'bg-gradient-to-br from-blue-50 to-sky-50',
                border: 'border-blue-200',
                badge: 'bg-blue-500 text-white',
                text: 'text-blue-700'
              },
              trend: {
                bg: 'bg-gradient-to-br from-pink-50 to-rose-50',
                border: 'border-pink-200',
                badge: 'bg-pink-500 text-white',
                text: 'text-pink-700'
              },
              tech: {
                bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
                border: 'border-purple-200',
                badge: 'bg-purple-500 text-white',
                text: 'text-purple-700'
              }
            };
            
            const style = categoryStyles[translation.category as keyof typeof categoryStyles] || categoryStyles.tech;

            return (
              <div
                key={translation.id}
                className={`${style.bg} rounded-xl shadow-md hover:shadow-lg transition-all p-5 border-2 ${
                  isExpanded ? style.border : 'border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : translation.id)}
                      className="text-left w-full"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {translation.term}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${style.badge}`}>
                          {translation.category === 'pangyo' ? '판교어' :
                           translation.category === 'digital' ? '디지털' : 
                           translation.category === 'trend' ? 'MZ' : '기술'}
                        </span>
                      </div>
                      <p className={`text-lg font-semibold ${style.text}`}>
                        {translation.simple}
                      </p>
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 expand-animation">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">자세한 설명</p>
                          <p className="text-gray-700 leading-relaxed">{translation.detailed}</p>
                        </div>

                        {translation.example && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">사용 예시</p>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                              {translation.example}
                            </p>
                          </div>
                        )}

                        {translation.relatedTerms && translation.relatedTerms.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">관련 단어</p>
                            <div className="flex flex-wrap gap-2">
                              {translation.relatedTerms.map((term, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                                >
                                  {term}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => speak(translation.simple)}
                    className="p-3 hover:bg-primary-50 rounded-full transition-colors flex-shrink-0"
                    aria-label="읽어주기"
                  >
                    <Volume2 className="w-6 h-6 text-primary-600" />
                  </button>
                </div>

                {!isExpanded && (
                  <button
                    onClick={() => setExpandedId(translation.id)}
                    className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    자세히 보기 →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600 mb-6">다른 검색어로 시도해보세요</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
