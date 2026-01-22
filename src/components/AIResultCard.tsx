import { AITranslationResponse } from '../services/aiTranslation';

interface AIResultCardProps {
  result: AITranslationResponse;
  onSpeak: (text: string) => void;
}

export default function AIResultCard({ result, onSpeak }: AIResultCardProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-purple-300 fade-in">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">🤖</span>
        <h3 className="text-xl font-bold text-purple-800">AI 번역 결과</h3>
        <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
          OpenAI 제공
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-purple-600 mb-1">검색한 단어</p>
          <p className="text-2xl font-bold text-gray-800">{result.term}</p>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">쉬운 설명</p>
              <p className="text-lg font-semibold text-purple-700">{result.simple}</p>
            </div>
            <button
              onClick={() => onSpeak(result.simple)}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
              aria-label="읽어주기"
            >
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>
        </div>

        {result.detailed && (
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">자세한 설명</p>
            <p className="text-gray-700 leading-relaxed">{result.detailed}</p>
          </div>
        )}

        {result.example && (
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">사용 예시</p>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{result.example}</p>
          </div>
        )}

        <div className="bg-purple-100 p-3 rounded-lg">
          <p className="text-xs text-purple-800">
            💡 이 번역은 AI(OpenAI)가 생성한 결과입니다. 정확하지 않을 수 있으니 참고용으로만 사용해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
