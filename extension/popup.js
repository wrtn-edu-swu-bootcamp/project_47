// 간단한 사전 데이터 (실제로는 API에서 가져올 수 있음)
const dictionary = {
  '어레인지': {
    term: '어레인지',
    simple: '우리 상황에 맞게 수정하기',
    detailed: '원래 있던 것을 상황에 맞게 바꾸거나 재구성하는 것을 의미합니다.'
  },
  '디벨롭': {
    term: '디벨롭',
    simple: '더 구체적으로 발전시키기',
    detailed: '초안이나 아이디어를 더 정교하고 완성도 있게 만드는 것을 의미합니다.'
  },
  '린하게': {
    term: '린하게',
    simple: '최소한의 기능만으로 빠르게 시작하기',
    detailed: '불필요한 것 없이 핵심만 간결하게 진행하는 것을 의미합니다.'
  },
  '어사인': {
    term: '어사인',
    simple: '업무를 배정하기',
    detailed: '일이나 역할을 특정 사람에게 할당하는 것을 의미합니다.'
  },
  '컨펌': {
    term: '컨펌',
    simple: '최종 확인/승인 받기',
    detailed: '최종 결정권자의 승인이나 확인을 받는 것을 의미합니다.'
  },
  '펜딩': {
    term: '펜딩',
    simple: '일단 보류하기',
    detailed: '당장 진행하지 않고 나중으로 미루거나 보류하는 것을 의미합니다.'
  },
  '리소스': {
    term: '리소스',
    simple: '사람, 시간, 예산 등의 자원',
    detailed: '프로젝트나 업무를 수행하는 데 필요한 인력, 시간, 예산, 장비 등 모든 자원을 통칭합니다.'
  },
  'MVP': {
    term: 'MVP',
    simple: '최소 기능 제품',
    detailed: 'Minimum Viable Product의 약자로, 핵심 기능만 담아 빠르게 만든 최소 버전의 제품입니다.'
  },
  'ASAP': {
    term: 'ASAP',
    simple: '최대한 빨리',
    detailed: 'As Soon As Possible의 약자로, 가능한 한 빨리 처리해달라는 의미입니다.'
  },
  '데드라인': {
    term: '데드라인',
    simple: '마감 기한',
    detailed: '프로젝트나 업무를 반드시 완료해야 하는 최종 기한을 의미합니다.'
  },
  // MZ 트렌드 용어
  '야르': {
    term: '야르',
    simple: '기분이 좋을 때 내뱉는 감탄사',
    detailed: '게임에서 승리하거나 원하는 아이템을 얻었을 때, 혹은 예상치 못한 행운이 찾아왔을 때 지르는 쾌재입니다.'
  },
  '에바': {
    term: '에바',
    simple: '너무 심하다, 과하다',
    detailed: '"오바(over)하다"를 더 세게 표현한 말입니다. 뭔가 지나치거나 황당할 때 사용합니다.'
  },
  '밤티': {
    term: '밤티',
    simple: '촌스럽다, 없어 보이다',
    detailed: '주로 겉모습이 세련되지 못하거나, 공들인 것에 비해 결과물이 어설플 때 사용하는 표현입니다.'
  },
  '아자스': {
    term: '아자스',
    simple: '감사합니다',
    detailed: '일본어의 감사 인사 \'아리가토 고자이마스\'를 아주 빠르게 발음하거나 줄여서 말하는 방식입니다.'
  },
  '쌰갈': {
    term: '쌰갈',
    simple: '조용히 해, 입 닫아',
    detailed: '영어 \'Shut up\'을 한국어식으로 강하고 위트 있게 변형한 표현입니다. 상대방이 시끄러울 때 사용합니다.'
  },
  '도티낳다': {
    term: '도티낳다',
    simple: '눈에 띄다, 돋보이다',
    detailed: '\'돋보이다\'의 맞춤법 실수에서 유래한 밈입니다. 누군가의 외모나 실력이 아주 훌륭해 보일 때 사용합니다.'
  }
};

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');
const noResultDiv = document.getElementById('noResult');
const speakBtn = document.getElementById('speakBtn');

function search() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (!query) return;

  // 사전에서 검색
  let found = null;
  for (const key in dictionary) {
    if (key.toLowerCase().includes(query) || query.includes(key.toLowerCase())) {
      found = dictionary[key];
      break;
    }
  }

  if (found) {
    document.getElementById('termName').textContent = found.term;
    document.getElementById('simpleText').textContent = found.simple;
    document.getElementById('detailedText').textContent = found.detailed;
    resultDiv.classList.add('show');
    noResultDiv.classList.remove('show');
  } else {
    resultDiv.classList.remove('show');
    noResultDiv.classList.add('show');
  }
}

function speak() {
  const text = document.getElementById('simpleText').textContent;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}

searchBtn.addEventListener('click', search);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    search();
  }
});

speakBtn.addEventListener('click', speak);

// 저장된 검색어가 있으면 자동으로 검색
chrome.storage.local.get(['lastSearch'], (result) => {
  if (result.lastSearch) {
    searchInput.value = result.lastSearch;
    search();
  }
});
