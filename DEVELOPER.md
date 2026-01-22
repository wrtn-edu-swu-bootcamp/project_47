# 개발자 가이드

## 프로젝트 구조

```
pangyo-translator/
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── FloatingWidget.tsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── CategoryPage.tsx
│   │   └── SearchPage.tsx
│   ├── data/              # 정적 데이터
│   │   └── translations.ts
│   ├── types/             # TypeScript 타입 정의
│   │   └── index.ts
│   ├── hooks/             # 커스텀 훅
│   │   └── useMediaQuery.ts
│   ├── utils/             # 유틸리티 함수
│   │   ├── accessibility.ts
│   │   └── search.ts
│   ├── App.tsx            # 메인 앱 컴포넌트
│   ├── main.tsx           # 진입점
│   └── index.css          # 글로벌 스타일
├── extension/             # 브라우저 확장 프로그램
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── content.js
│   └── content.css
├── public/                # 정적 파일
└── package.json
```

## 주요 컴포넌트

### Layout.tsx
- 전체 레이아웃 구조
- Header와 FloatingWidget 포함

### FloatingWidget.tsx
- 텍스트 선택 시 자동 번역 팝업
- 음성 읽기 기능
- 위치 자동 조정

### CategoryPage.tsx
- 사용자 레벨별 용어 목록
- 확장 가능한 상세 설명
- 시니어 친화적 큰 글씨 모드

### SearchPage.tsx
- 통합 검색 기능
- 음성 검색 (Web Speech API)
- 카테고리 필터링

## 데이터 구조

### Translation 타입

```typescript
interface Translation {
  id: string;              // 고유 ID
  term: string;            // 용어
  category: 'pangyo' | 'digital' | 'tech';
  difficulty: 'easy' | 'medium' | 'hard';
  simple: string;          // 간단한 설명
  detailed: string;        // 상세 설명
  example: string;         // 사용 예시
  origin?: string;         // 어원
  relatedTerms?: string[]; // 관련 용어
  tags: string[];          // 태그
  userLevel: ('senior' | 'mz' | 'newbie')[];
}
```

## 새로운 기능 추가하기

### 1. 새로운 용어 추가

`src/data/translations.ts` 파일의 `translations` 배열에 추가:

```typescript
{
  id: '26',
  term: '새로운용어',
  category: 'pangyo',
  difficulty: 'easy',
  simple: '쉬운 설명',
  detailed: '자세한 설명',
  example: '사용 예시',
  tags: ['태그'],
  userLevel: ['newbie']
}
```

### 2. 새로운 페이지 추가

1. `src/pages/` 폴더에 새 컴포넌트 생성
2. `src/App.tsx`에 라우트 추가:

```typescript
<Route path="/new-page" element={<NewPage />} />
```

### 3. 새로운 카테고리 추가

`src/data/translations.ts`의 `userCategories` 배열에 추가:

```typescript
{
  id: 'new-category',
  name: '카테고리 이름',
  description: '설명',
  color: 'blue',
  icon: '🎯'
}
```

## API 연동 (향후)

현재는 정적 데이터를 사용하지만, 향후 백엔드 API 연동 시:

```typescript
// src/services/api.ts
export const fetchTranslations = async (): Promise<Translation[]> => {
  const response = await fetch('/api/translations');
  return response.json();
};

export const searchTranslations = async (query: string): Promise<Translation[]> => {
  const response = await fetch(`/api/search?q=${query}`);
  return response.json();
};
```

## 테스트

```bash
# 유닛 테스트 (향후 추가 예정)
npm run test

# E2E 테스트 (향후 추가 예정)
npm run test:e2e

# 타입 체크
npm run type-check
```

## 성능 최적화

### 코드 스플리팅
- React Router의 lazy loading 활용
- 페이지별 번들 분리

### 이미지 최적화
- SVG 아이콘 사용
- WebP 형식 지원

### 캐싱 전략
- 브라우저 캐싱
- Service Worker (PWA 전환 시)

## 접근성 체크리스트

- [x] 키보드 네비게이션
- [x] ARIA 레이블
- [x] 색상 대비 (WCAG AA)
- [x] 포커스 표시
- [x] 스크린 리더 지원
- [x] 큰 터치 타겟 (44x44px)
- [x] 모션 감소 설정 존중

## 브라우저 지원

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

## 배포

### Vercel (추천)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

### GitHub Pages

```bash
npm run build
# dist 폴더를 gh-pages 브랜치에 푸시
```

## 환경 변수

`.env` 파일 생성:

```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

사용:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 기여 가이드

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 코딩 스타일

- ESLint 규칙 준수
- Prettier로 포맷팅
- TypeScript strict 모드
- 함수형 컴포넌트 사용
- Hooks 활용

## 문제 해결

### npm install 실패
```bash
rm -rf node_modules package-lock.json
npm install
```

### 빌드 오류
```bash
npm run clean
npm run build
```

### 타입 오류
```bash
npm run type-check
```
