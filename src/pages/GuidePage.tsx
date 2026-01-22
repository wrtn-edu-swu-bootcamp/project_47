import { Link } from 'react-router-dom';
import { ArrowLeft, Search, MousePointer2, Mic, Volume2, Smartphone, Globe } from 'lucide-react';

export default function GuidePage() {
  const guides = [
    {
      icon: <MousePointer2 className="w-8 h-8" />,
      title: '텍스트 드래그 번역',
      description: '웹페이지에서 모르는 단어를 드래그하면 즉시 번역창이 나타납니다.',
      steps: [
        '웹페이지에서 모르는 단어를 마우스로 드래그하세요',
        '자동으로 번역 팝업이 나타납니다',
        '쉬운 설명, 자세한 설명, 사용 예시를 확인할 수 있습니다',
        '스피커 버튼을 누르면 음성으로 들을 수 있습니다'
      ]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: '검색 기능',
      description: '궁금한 단어를 직접 검색하고 자세한 설명을 확인하세요.',
      steps: [
        '상단의 검색창을 클릭하세요',
        '궁금한 단어를 입력하세요',
        '카테고리 필터로 원하는 분야만 볼 수 있습니다',
        '"자세히 보기"를 눌러 더 많은 정보를 확인하세요'
      ]
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: '음성 검색',
      description: '말로 검색하고 음성으로 설명을 들을 수 있습니다.',
      steps: [
        '검색 페이지에서 마이크 버튼을 클릭하세요',
        '궁금한 단어를 말하세요',
        '자동으로 검색이 완료됩니다',
        '스피커 버튼으로 설명을 들을 수 있습니다'
      ]
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: '음성 읽어주기 (TTS)',
      description: '모든 설명을 음성으로 들을 수 있습니다.',
      steps: [
        '각 단어 카드의 스피커 버튼을 클릭하세요',
        '자동으로 설명이 음성으로 재생됩니다',
        '시니어 모드에서는 더 천천히 읽어줍니다',
        '언제든지 다시 들을 수 있습니다'
      ]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: '카테고리별 학습',
      description: '내 수준에 맞는 카테고리를 선택하세요.',
      steps: [
        '홈 화면에서 원하는 카테고리를 선택하세요',
        '"천천히 배우기": 디지털이 처음이신 분',
        '"요즘 그거 뭔데?": MZ 트렌드를 알고 싶은 분',
        '"판교 생존 가이드": IT 업계 신입'
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: '브라우저 확장 프로그램',
      description: '모든 웹사이트에서 바로 번역할 수 있습니다.',
      steps: [
        '크롬 웹스토어에서 확장 프로그램 설치',
        '설치 후 모든 웹페이지에서 작동합니다',
        '텍스트를 드래그하면 자동으로 번역됩니다',
        '확장 프로그램 아이콘을 클릭해 검색도 가능합니다'
      ]
    }
  ];

  const tips = [
    {
      title: '💡 시니어를 위한 팁',
      items: [
        '글씨가 작다면 카테고리에서 "천천히 배우기"를 선택하세요',
        '스피커 버튼을 눌러 음성으로 듣는 것을 추천합니다',
        '한 번에 하나씩 천천히 배워도 괜찮습니다',
        '궁금한 점이 있으면 같은 단어를 여러 번 찾아봐도 됩니다'
      ]
    },
    {
      title: '✨ MZ 세대를 위한 팁',
      items: [
        '"요즘 그거 뭔데?" 카테고리에서 최신 트렌드 용어를 확인하세요',
        '검색 필터로 MZ 트렌드만 볼 수 있습니다',
        '새로운 밈과 신조어가 계속 추가됩니다',
        '친구들과 공유해서 함께 배워보세요'
      ]
    },
    {
      title: '🚀 IT 신입을 위한 팁',
      items: [
        '"판교 생존 가이드"에서 업무에 필요한 용어를 먼저 익히세요',
        '관련 단어들을 함께 보면 더 이해하기 쉽습니다',
        '모르는 용어는 바로바로 검색하는 습관을 들이세요',
        'AI 번역으로 사전에 없는 최신 용어도 찾을 수 있습니다'
      ]
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>홈으로 돌아가기</span>
      </Link>

      {/* Header */}
      <section className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          사용 가이드
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          판교어 번역기를 더욱 효과적으로 사용하는 방법을 알아보세요
        </p>
      </section>

      {/* Quick Start */}
      <section className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8 mx-4 border-2 border-primary-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">⚡ 빠른 시작</h2>
        <div className="space-y-3 text-lg text-gray-700">
          <p>1. 홈 화면에서 자신에게 맞는 <strong>카테고리</strong>를 선택하세요</p>
          <p>2. 모르는 단어를 <strong>검색</strong>하거나 <strong>드래그</strong>하세요</p>
          <p>3. <strong>스피커 버튼</strong>을 눌러 음성으로 들어보세요</p>
          <p>4. 더 자세한 설명이 필요하면 <strong>"자세히 보기"</strong>를 클릭하세요</p>
        </div>
      </section>

      {/* Main Guides */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          주요 기능 사용법
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-primary-300 transition-all"
            >
              <div className="text-primary-600 mb-4">{guide.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {guide.title}
              </h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <div className="space-y-2">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">{idx + 1}.</span>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          사용자별 맞춤 팁
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {tip.title}
              </h3>
              <ul className="space-y-3">
                {tip.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 pb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          자주 묻는 질문
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <details className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
            <summary className="font-bold text-lg text-gray-800 cursor-pointer">
              Q. 원하는 단어가 없으면 어떻게 하나요?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              검색 기능을 사용하시면 AI가 자동으로 번역해드립니다. 사전에 없는 최신 용어나 전문 용어도 AI가 이해하기 쉽게 설명해줍니다.
            </p>
          </details>

          <details className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
            <summary className="font-bold text-lg text-gray-800 cursor-pointer">
              Q. 음성이 안 나와요
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              브라우저의 음성 권한을 허용해주세요. 크롬의 경우 주소창 왼쪽의 자물쇠 아이콘을 클릭하여 음성 권한을 허용할 수 있습니다.
            </p>
          </details>

          <details className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
            <summary className="font-bold text-lg text-gray-800 cursor-pointer">
              Q. 모바일에서도 사용할 수 있나요?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              네! 모바일 브라우저에서도 모든 기능을 사용할 수 있습니다. 모바일에서는 텍스트를 길게 누르면 번역 기능을 사용할 수 있습니다.
            </p>
          </details>

          <details className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
            <summary className="font-bold text-lg text-gray-800 cursor-pointer">
              Q. 새로운 단어는 어떻게 추가되나요?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              최신 트렌드와 IT 용어를 지속적으로 업데이트하고 있습니다. 특별히 추가를 원하는 단어가 있으시면 피드백을 주시면 검토 후 추가하겠습니다.
            </p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 px-4">
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 mx-4 text-white">
          <h2 className="text-3xl font-bold mb-4">이제 시작해볼까요?</h2>
          <p className="text-xl mb-6 opacity-90">
            궁금한 단어를 검색하고 쉽게 이해해보세요!
          </p>
          <Link
            to="/search"
            className="inline-block px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            검색 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
}
