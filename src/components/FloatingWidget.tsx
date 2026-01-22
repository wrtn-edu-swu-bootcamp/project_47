import { useState, useEffect } from 'react';
import { Search, X, Volume2 } from 'lucide-react';
import { translations } from '../data/translations';
import { Translation } from '../types';

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [result, setResult] = useState<Translation | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
          });

          // 선택된 텍스트로 번역 검색
          const found = translations.find(
            t => t.term.toLowerCase() === text.toLowerCase()
          );
          setResult(found || null);
          setIsOpen(true);
        }
      }
    };

    document.addEventListener('mouseup', handleTextSelection);
    return () => document.removeEventListener('mouseup', handleTextSelection);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedText('');
    setResult(null);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={handleClose}
      />

      {/* Widget */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl border-2 border-primary-500 p-4 max-w-sm animate-fade-in"
        style={{
          left: `${Math.min(position.x, window.innerWidth - 400)}px`,
          top: `${Math.max(position.y, 10)}px`,
          transform: 'translateX(-50%) translateY(-100%)'
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-gray-800">번역 결과</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {result ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">선택한 단어</p>
              <p className="text-lg font-bold text-primary-700">{result.term}</p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">쉬운 말로</p>
                  <p className="text-base font-semibold text-gray-800">{result.simple}</p>
                </div>
                <button
                  onClick={() => speak(result.simple)}
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                  aria-label="읽어주기"
                >
                  <Volume2 className="w-5 h-5 text-primary-600" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">자세한 설명</p>
              <p className="text-sm text-gray-700 leading-relaxed">{result.detailed}</p>
            </div>

            {result.example && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">사용 예시</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{result.example}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600">"{selectedText}"</p>
            <p className="text-sm text-gray-500 mt-2">
              해당 단어를 찾을 수 없습니다
            </p>
          </div>
        )}
      </div>
    </>
  );
}
