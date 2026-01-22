// Content script: 웹페이지에서 텍스트 선택 시 번역 제공

const dictionary = {
  '어레인지': '우리 상황에 맞게 수정하기',
  '디벨롭': '더 구체적으로 발전시키기',
  '린하게': '최소한의 기능만으로 빠르게 시작하기',
  '어사인': '업무를 배정하기',
  '컨펌': '최종 확인/승인 받기',
  '펜딩': '일단 보류하기',
  '리소스': '사람, 시간, 예산 등의 자원',
  'MVP': '최소 기능 제품',
  'ASAP': '최대한 빨리',
  '데드라인': '마감 기한',
  '드랍': '공유하기, 전달하기',
  '캐치업': '간단히 상황 공유하기',
  '온보딩': '신입 직원 적응 과정',
  '런칭': '제품이나 서비스 출시',
  'FYI': '참고로 알려드립니다',
  '리텐션': '사용자 유지율',
  'KPI': '핵심 성과 지표',
  '피드백': '의견이나 개선사항 전달',
  '마일스톤': '중요한 중간 목표',
  '스크럼': '짧은 일일 회의',
  // MZ 트렌드 용어
  '야르': '기분이 좋을 때 내뱉는 감탄사',
  '에바': '너무 심하다, 과하다',
  '밤티': '촌스럽다, 없어 보이다',
  '밤티나다': '촌스럽다, 없어 보이다',
  '아자스': '감사합니다',
  '쌰갈': '조용히 해, 입 닫아',
  '도티낳다': '눈에 띄다, 돋보이다'
};

let tooltipElement = null;

function createTooltip(text, x, y) {
  removeTooltip();

  const translation = dictionary[text] || dictionary[text.toLowerCase()];
  
  if (!translation) return;

  tooltipElement = document.createElement('div');
  tooltipElement.className = 'pangyo-translator-tooltip';
  tooltipElement.innerHTML = `
    <div class="pangyo-tooltip-header">
      <strong>${text}</strong>
      <button class="pangyo-close-btn">×</button>
    </div>
    <div class="pangyo-tooltip-content">
      ${translation}
    </div>
  `;

  document.body.appendChild(tooltipElement);

  // Position the tooltip
  const tooltipRect = tooltipElement.getBoundingClientRect();
  let left = x - tooltipRect.width / 2;
  let top = y - tooltipRect.height - 10;

  // Keep tooltip within viewport
  if (left < 10) left = 10;
  if (left + tooltipRect.width > window.innerWidth - 10) {
    left = window.innerWidth - tooltipRect.width - 10;
  }
  if (top < 10) {
    top = y + 20; // Show below if not enough space above
  }

  tooltipElement.style.left = `${left}px`;
  tooltipElement.style.top = `${top}px`;

  // Add close button event
  const closeBtn = tooltipElement.querySelector('.pangyo-close-btn');
  closeBtn.addEventListener('click', removeTooltip);

  // Store search in extension storage
  chrome.storage.local.set({ lastSearch: text });
}

function removeTooltip() {
  if (tooltipElement) {
    tooltipElement.remove();
    tooltipElement = null;
  }
}

// Listen for text selection
document.addEventListener('mouseup', (e) => {
  const selection = window.getSelection();
  const text = selection.toString().trim();

  if (text && text.length > 0 && text.length < 20) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    setTimeout(() => {
      createTooltip(text, rect.left + rect.width / 2, rect.top + window.scrollY);
    }, 100);
  } else {
    removeTooltip();
  }
});

// Remove tooltip when clicking outside
document.addEventListener('mousedown', (e) => {
  if (tooltipElement && !tooltipElement.contains(e.target)) {
    removeTooltip();
  }
});

console.log('판교어 번역기 확장 프로그램이 활성화되었습니다!');
