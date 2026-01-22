import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Volume2, Filter, Mic, MicOff } from 'lucide-react';
import { translations } from '../data/translations';
import { Translation } from '../types';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Translation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isListening, setIsListening] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    performSearch(q);
  }, [searchParams]);

  const performSearch = (searchQuery: string, category: string = selectedCategory) => {
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
        </h2>
        
        {isListening && (
          <div className="flex items-center gap-2 text-red-600 animate-pulse">
            <Mic className="w-5 h-5" />
            <span className="font-semibold">듣고 있습니다...</span>
          </div>
        )}
      </div>

      {/* Results List */}
      {results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((translation) => {
            const isExpanded = expandedId === translation.id;

            return (
              <div
                key={translation.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 border-2 ${
                  isExpanded ? 'border-primary-500' : 'border-transparent'
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
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          translation.category === 'pangyo' ? 'bg-blue-100 text-blue-700' :
                          translation.category === 'digital' ? 'bg-green-100 text-green-700' :
                          translation.category === 'trend' ? 'bg-pink-100 text-pink-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {translation.category === 'pangyo' ? '판교어' :
                           translation.category === 'digital' ? '디지털' : 
                           translation.category === 'trend' ? 'MZ' : '기술'}
                        </span>
                      </div>
                      <p className="text-lg text-primary-700 font-semibold">
                        {translation.simple}
                      </p>
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4">
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
