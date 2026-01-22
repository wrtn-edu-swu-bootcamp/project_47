// Mock AI Translation (n8n 없이 테스트용)
import { AITranslationResponse } from './aiTranslation';

const mockTranslations: Record<string, AITranslationResponse> = {
  '크로스플랫폼': {
    term: '크로스플랫폼',
    simple: '여러 기기에서 동시에 사용 가능한 프로그램',
    detailed: '하나의 프로그램을 만들면 Windows, Mac, iOS, Android 등 여러 운영체제에서 모두 사용할 수 있는 기술입니다. 한 번 개발로 모든 기기를 지원하므로 개발 시간과 비용을 절약할 수 있습니다.',
    example: '원래: "이 앱은 크로스플랫폼으로 개발됐어요"\n쉽게: "이 앱은 아이폰, 안드로이드 모두에서 사용할 수 있어요"',
    category: 'tech',
    isAI: true
  },
  '디버깅': {
    term: '디버깅',
    simple: '프로그램의 오류를 찾아서 고치기',
    detailed: '컴퓨터 프로그램이 제대로 작동하지 않을 때, 문제의 원인(버그)을 찾아내고 수정하는 작업입니다. 개발자가 가장 많은 시간을 쓰는 작업 중 하나입니다.',
    example: '원래: "오늘 하루 종일 디버깅만 했어요"\n쉽게: "오늘 하루 종일 프로그램 오류 찾아서 고치기만 했어요"',
    category: 'tech',
    isAI: true
  },
  '레거시': {
    term: '레거시',
    simple: '오래되고 낡은 시스템이나 코드',
    detailed: '옛날에 만들어진 오래된 시스템이나 프로그램을 의미합니다. 최신 기술이 아니지만 여전히 사용되고 있어서 함부로 바꾸기 어려운 경우가 많습니다.',
    example: '원래: "레거시 코드 건드리기 무서워요"\n쉽게: "오래된 코드 고치다가 다른 곳에서 오류 날까봐 무서워요"',
    category: 'tech',
    isAI: true
  },
  '빌드': {
    term: '빌드',
    simple: '소스 코드를 실행 가능한 프로그램으로 만들기',
    detailed: '개발자가 작성한 코드를 일반 사용자가 실행할 수 있는 프로그램 파일로 변환하는 과정입니다. 컴파일, 압축, 최적화 등의 작업이 포함됩니다.',
    example: '원래: "빌드 돌리는 데 10분 걸려요"\n쉽게: "프로그램 만드는 데 10분 걸려요"',
    category: 'tech',
    isAI: true
  },
  '리팩토링': {
    term: '리팩토링',
    simple: '코드를 더 깔끔하게 정리하기',
    detailed: '프로그램의 기능은 그대로 두고, 코드의 구조를 개선해서 읽기 쉽고 유지보수하기 좋게 만드는 작업입니다. 마치 방 청소처럼 기능은 그대로인데 정리만 하는 것입니다.',
    example: '원래: "이번 주는 리팩토링에 집중할게요"\n쉽게: "이번 주는 코드 정리에 집중할게요"',
    category: 'tech',
    isAI: true
  },
  '배포': {
    term: '배포',
    simple: '만든 프로그램을 사용자가 쓸 수 있게 공개하기',
    detailed: '개발이 완료된 프로그램을 서버에 올려서 실제 사용자들이 사용할 수 있도록 만드는 과정입니다. 앱스토어에 앱을 올리거나 웹사이트를 인터넷에 공개하는 것을 말합니다.',
    example: '원래: "내일 새벽 3시에 배포할 예정이에요"\n쉽게: "내일 새벽 3시에 새 버전을 공개할 예정이에요"',
    category: 'tech',
    isAI: true
  },
  '마이그레이션': {
    term: '마이그레이션',
    simple: '데이터나 시스템을 다른 곳으로 옮기기',
    detailed: '기존 시스템이나 데이터를 새로운 환경으로 이동시키는 작업입니다. 예를 들어 낡은 서버에서 새 서버로 옮기거나, 다른 데이터베이스로 데이터를 이전하는 것을 말합니다.',
    example: '원래: "AWS로 마이그레이션하는 중이에요"\n쉽게: "AWS 클라우드로 시스템을 옮기는 중이에요"',
    category: 'tech',
    isAI: true
  },
  '스프린트': {
    term: '스프린트',
    simple: '정해진 기간 동안 목표 달성하기',
    detailed: '보통 1~2주 정도의 짧은 개발 주기를 의미합니다. 이 기간 동안 팀이 완성하기로 약속한 기능을 집중해서 개발합니다. 마라톤이 아닌 단거리 달리기처럼 짧고 강하게!',
    example: '원래: "이번 스프린트 목표는 로그인 기능이에요"\n쉽게: "이번 2주 동안 로그인 기능을 완성할 거예요"',
    category: 'pangyo',
    isAI: true
  },
  '온보딩': {
    term: '온보딩',
    simple: '새로운 사용자를 위한 안내 과정',
    detailed: '앱이나 서비스를 처음 사용하는 사람에게 사용법을 알려주는 과정입니다. 회사에 새로 입사한 사람을 교육하는 것도 온보딩이라고 합니다.',
    example: '원래: "온보딩 화면을 더 직관적으로 만들어야 해요"\n쉽게: "처음 사용자를 위한 안내 화면을 더 쉽게 만들어야 해요"',
    category: 'pangyo',
    isAI: true
  },
  '스케일업': {
    term: '스케일업',
    simple: '시스템 규모를 키워서 더 많은 사용자 처리하기',
    detailed: '사용자가 늘어나도 서비스가 원활하게 작동하도록 서버 성능을 높이거나 수를 늘리는 것입니다. 가게가 손님이 많아지면 직원을 더 고용하는 것과 비슷합니다.',
    example: '원래: "사용자가 급증해서 스케일업이 필요해요"\n쉽게: "사용자가 급증해서 서버를 증설해야 해요"',
    category: 'tech',
    isAI: true
  }
};

export function getMockAITranslation(term: string): AITranslationResponse | null {
  const normalized = term.toLowerCase().trim();
  
  // 정확히 일치하는 단어 찾기
  for (const key in mockTranslations) {
    if (key.toLowerCase() === normalized) {
      return mockTranslations[key];
    }
  }
  
  // 부분 일치
  for (const key in mockTranslations) {
    if (key.toLowerCase().includes(normalized) || normalized.includes(key.toLowerCase())) {
      return mockTranslations[key];
    }
  }
  
  return null;
}

export function hasMockTranslation(term: string): boolean {
  return getMockAITranslation(term) !== null;
}
