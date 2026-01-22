# 🤖 AI 번역 기능 빠른 시작 가이드

## 🎯 AI 번역이란?

사전에 없는 단어를 검색하면 **AI(OpenAI)가 자동으로 번역**해주는 기능입니다!

## 🚀 빠른 시작 (Mock 모드)

n8n 설정 없이도 바로 테스트할 수 있습니다!

### 1. 개발 서버 실행
```bash
npm run dev
```

### 2. 웹사이트 접속
http://localhost:3000/search

### 3. 테스트 단어 검색
다음 단어들로 AI 번역을 테스트해보세요:
- **크로스플랫폼**
- **디버깅**
- **레거시**
- **빌드**

### 4. 결과 확인
- 검색 결과가 없으면 자동으로 AI 번역 시작
- 보라색 배경의 "AI 번역 결과" 카드 표시
- "OpenAI 제공" 뱃지 확인

## 🔧 실제 n8n 연동 (프로덕션)

### 1단계: n8n 설치
```bash
# Docker 사용
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n

# 브라우저에서 확인
http://localhost:5678
```

### 2단계: 워크플로우 임포트
1. n8n 웹 인터페이스 접속
2. 좌측 메뉴 "Workflows" → "Import from File"
3. `n8n-workflow.json` 파일 선택
4. 워크플로우가 자동으로 생성됨

### 3단계: OpenAI API 설정
1. https://platform.openai.com/api-keys 에서 API 키 발급
2. n8n "Credentials" 메뉴 → "New" → "OpenAI API"
3. API Key 입력 및 저장
4. 워크플로우의 OpenAI 노드에 연결

### 4단계: 워크플로우 활성화
1. 워크플로우 우측 상단 토글 ON
2. Webhook URL 복사 (예: http://localhost:5678/webhook/translate)

### 5단계: 환경 변수 설정
```bash
# .env 파일 생성
echo "VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/translate" > .env

# 개발 서버 재시작
npm run dev
```

### 6단계: 테스트
1. 웹사이트에서 사전에 없는 단어 검색
2. AI 번역 결과 확인
3. 브라우저 Console에서 로그 확인

## ✅ 작동 확인

### Mock 모드 (기본)
```
🤖 Mock AI 모드 - n8n 연결 없이 테스트 중
```

### 실제 n8n 연동 모드
```
🔄 AI 번역 요청: 크로스플랫폼
✅ AI 번역 완료
```

## 💡 주요 기능

### 1. 자동 감지
- 사전 검색 결과 없음 → 자동으로 AI 번역 시도

### 2. 스마트 캐싱
- 한 번 번역한 단어는 저장
- 다음부터는 즉시 표시 (API 비용 절약)

### 3. 에러 처리
- n8n 연결 실패 시 친절한 안내 메시지
- 해결 방법 가이드 제공

### 4. 음성 읽기
- AI 번역 결과도 음성으로 들을 수 있음

## 🎨 UI 특징

### AI 번역 결과 카드
- 🤖 아이콘으로 AI 번역임을 표시
- 보라색 그라데이션 배경
- "OpenAI 제공" 뱃지
- 면책 문구 포함

### 로딩 상태
- "AI 번역 중..." 애니메이션
- 회전하는 로더 아이콘

## 🐛 문제 해결

### "AI 번역 실패" 에러
1. n8n 실행 확인: http://localhost:5678
2. 워크플로우 활성화 확인
3. OpenAI API 키 확인
4. .env 파일 확인

### Mock 모드에서 벗어나고 싶을 때
```bash
# .env 파일에 실제 n8n URL 입력
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/translate

# 개발 서버 재시작
npm run dev
```

## 💰 비용

### OpenAI API 비용 (2024 기준)
- **gpt-4o-mini**: $0.15 / 1M tokens (추천)
- **gpt-3.5-turbo**: $0.50 / 1M tokens

한 번의 번역에 약 500 토큰 사용 → 약 $0.0001 (0.01원)

### 절약 팁
1. 캐싱 기능 활용 (이미 적용됨)
2. gpt-4o-mini 모델 사용
3. Temperature 낮게 설정 (0.5-0.7)

## 📊 통계

현재 **Mock AI**로 제공되는 테스트 용어:
- 크로스플랫폼
- 디버깅
- 레거시
- 빌드

더 많은 단어는 실제 OpenAI 연동 시 무제한!

---

**Happy Translating with AI! 🚀**
