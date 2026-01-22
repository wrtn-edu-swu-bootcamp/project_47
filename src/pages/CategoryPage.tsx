import { useParams, Link } from 'react-router-dom';
import { userCategories, translations } from '../data/translations';
import { Volume2, ArrowLeft, Star } from 'lucide-react';
import { useState } from 'react';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const category = userCategories.find(c => c.id === id);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">카테고리를 찾을 수 없습니다</h2>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const categoryTranslations = translations.filter(t => 
    t.userLevel.includes(category.id as 'senior' | 'mz' | 'newbie')
  );

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = category.id === 'senior' ? 0.8 : 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const isSenior = category.id === 'senior';

  return (
    <div className="space-y-6 fade-in">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>돌아가기</span>
      </Link>

      {/* Category Header */}
      <div className={`bg-gradient-to-r from-${category.color}-100 to-${category.color}-50 rounded-2xl p-8 shadow-lg`}>
        <div className="text-6xl mb-4">{category.icon}</div>
        <h1 className={`text-4xl font-bold text-gray-800 mb-3 ${isSenior ? 'senior-text' : ''}`}>
          {category.name}
        </h1>
        <p className={`text-gray-700 ${isSenior ? 'text-xl' : 'text-lg'}`}>
          {category.description}
        </p>
      </div>

      {/* Tips for Senior Users */}
      {isSenior && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-600" />
            사용 팁
          </h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>• 스피커 버튼을 누르면 소리로 들을 수 있어요</li>
            <li>• 천천히 읽으셔도 괜찮아요</li>
            <li>• 궁금한 단어를 누르면 자세한 설명이 나와요</li>
          </ul>
        </div>
      )}

      {/* Translations List */}
      <div className="space-y-4">
        <h2 className={`text-2xl font-bold text-gray-800 ${isSenior ? 'senior-text' : ''}`}>
          총 {categoryTranslations.length}개의 용어
        </h2>

        <div className="grid gap-4">
          {categoryTranslations.map((translation) => {
            const isExpanded = expandedId === translation.id;

            return (
              <div
                key={translation.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 ${
                  isExpanded ? 'border-primary-500' : 'border-transparent'
                } ${isSenior ? 'p-6' : 'p-5'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : translation.id)}
                      className="text-left w-full"
                    >
                      <h3 className={`font-bold text-gray-800 mb-2 ${isSenior ? 'text-2xl' : 'text-xl'}`}>
                        {translation.term}
                      </h3>
                      <p className={`text-primary-700 font-semibold ${isSenior ? 'text-xl' : 'text-lg'}`}>
                        {translation.simple}
                      </p>
                    </button>

                    {isExpanded && (
                      <div className={`mt-4 space-y-4 ${isSenior ? 'text-lg' : 'text-base'}`}>
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

                        {translation.origin && (
                          <div className="text-sm text-gray-500">
                            <span className="font-semibold">어원:</span> {translation.origin}
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
                    className={`${isSenior ? 'p-4' : 'p-3'} hover:bg-primary-50 rounded-full transition-colors flex-shrink-0`}
                    aria-label="읽어주기"
                  >
                    <Volume2 className={`${isSenior ? 'w-7 h-7' : 'w-6 h-6'} text-primary-600`} />
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
      </div>
    </div>
  );
}
