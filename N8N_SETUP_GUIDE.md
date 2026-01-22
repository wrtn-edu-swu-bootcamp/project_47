# n8n AI 번역 워크플로우 설정 가이드

## 📋 개요

이 프로젝트는 n8n을 통해 OpenAI API와 연동하여 사전에 없는 단어를 실시간으로 번역하는 기능을 제공합니다.

## 🚀 n8n 워크플로우 설정

### 1. n8n 설치 및 실행

```bash
# Docker로 n8n 실행
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# 또는 npm으로 설치
npm install n8n -g
n8n start
```

### 2. 워크플로우 생성

n8n 웹 인터페이스 (http://localhost:5678) 접속 후:

#### Node 1: Webhook (Trigger)
- **Type:** Webhook
- **HTTP Method:** POST
- **Path:** `translate`
- **Response Mode:** Last Node

#### Node 2: Function (데이터 가공)
```javascript
// 입력 데이터 파싱
const inputData = $input.all()[0].json;
const term = inputData.term || inputData.body.term;

return {
  json: {
    term: term,
    prompt: `다음 단어나 표현을 쉽게 설명해주세요:

단어: "${term}"

다음 형식으로 응답해주세요:
1. 간단한 설명 (한 줄)
2. 자세한 설명 (2-3문장)
3. 사용 예시 (실제 대화 예시)
4. 카테고리 (pangyo/digital/trend/tech 중 하나)

JSON 형식으로 응답:
{
  "simple": "간단한 설명",
  "detailed": "자세한 설명",
  "example": "사용 예시",
  "category": "카테고리"
}`
  }
};
```

#### Node 3: OpenAI (AI 번역)
- **Operation:** Message a Model
- **Model:** gpt-4o-mini (또는 gpt-3.5-turbo)
- **Prompt:** `{{ $json.prompt }}`
- **Temperature:** 0.7
- **Max Tokens:** 500

#### Node 4: Function (응답 파싱)
```javascript
const response = $input.all()[0].json;
const content = response.message?.content || response.choices?.[0]?.message?.content || '';

// JSON 파싱 시도
let parsed;
try {
  // 코드 블록 제거
  const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  parsed = JSON.parse(cleanContent);
} catch (e) {
  // 파싱 실패 시 기본 응답
  parsed = {
    simple: content.substring(0, 100),
    detailed: content,
    example: '',
    category: 'tech'
  };
}

return {
  json: {
    term: $('Function').item.json.term,
    simple: parsed.simple || '번역 결과를 가져올 수 없습니다',
    detailed: parsed.detailed || '',
    example: parsed.example || '',
    category: parsed.category || 'tech',
    timestamp: new Date().toISOString()
  }
};
```

### 3. Webhook URL 복사

워크플로우를 활성화하고 Webhook 노드의 **Production URL**을 복사합니다.

예: `http://localhost:5678/webhook/translate`

### 4. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```bash
# .env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/translate
```

## 🔑 OpenAI API 키 설정

### 1. OpenAI API 키 발급

1. https://platform.openai.com/api-keys 접속
2. "Create new secret key" 클릭
3. API 키 복사

### 2. n8n에서 Credential 설정

1. n8n 웹 인터페이스에서 "Credentials" 메뉴
2. "New" → "OpenAI API"
3. API Key 입력 및 저장
4. OpenAI 노드에서 해당 Credential 선택

## 🧪 테스트

### 1. Webhook 테스트

```bash
curl -X POST http://localhost:5678/webhook/translate \
  -H "Content-Type: application/json" \
  -d '{"term": "린하게"}'
```

예상 응답:
```json
{
  "term": "린하게",
  "simple": "최소한의 기능만으로 빠르게 시작하기",
  "detailed": "불필요한 것 없이 핵심만 간결하게 진행하는 것을 의미합니다.",
  "example": "원래: \"일단 린하게 시작해봐요\"\n쉽게: \"일단 최소한의 기능만으로 빠르게 시작해봐요\"",
  "category": "pangyo"
}
```

### 2. 웹 애플리케이션 테스트

1. 개발 서버 실행: `npm run dev`
2. http://localhost:3000/search 접속
3. 사전에 없는 단어 검색 (예: "크로스플랫폼")
4. AI 번역 결과 확인

## 📊 n8n 워크플로우 JSON (임포트용)

워크플로우를 빠르게 설정하려면 아래 JSON을 복사해서 n8n에 임포트하세요:

```json
{
  "name": "판교어 번역기 - AI 번역",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "translate",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "functionCode": "const inputData = $input.all()[0].json;\nconst term = inputData.term || inputData.body.term;\n\nreturn {\n  json: {\n    term: term,\n    prompt: `다음 단어나 표현을 쉽게 설명해주세요:\\n\\n단어: \"${term}\"\\n\\n다음 형식으로 응답해주세요:\\n1. 간단한 설명 (한 줄)\\n2. 자세한 설명 (2-3문장)\\n3. 사용 예시 (실제 대화 예시)\\n4. 카테고리 (pangyo/digital/trend/tech 중 하나)\\n\\nJSON 형식으로 응답:\\n{\\n  \"simple\": \"간단한 설명\",\\n  \"detailed\": \"자세한 설명\",\\n  \"example\": \"사용 예시\",\\n  \"category\": \"카테고리\"\\n}`\n  }\n};"
      },
      "name": "Parse Input",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "message",
        "model": "gpt-4o-mini",
        "messages": {
          "values": [
            {
              "role": "user",
              "content": "={{ $json.prompt }}"
            }
          ]
        },
        "options": {
          "temperature": 0.7,
          "maxTokens": 500
        }
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [650, 300],
      "credentials": {
        "openAiApi": {
          "id": "1",
          "name": "OpenAI API"
        }
      }
    },
    {
      "parameters": {
        "functionCode": "const response = $input.all()[0].json;\nconst content = response.message?.content || response.choices?.[0]?.message?.content || '';\n\nlet parsed;\ntry {\n  const cleanContent = content.replace(/```json\\n?/g, '').replace(/```\\n?/g, '').trim();\n  parsed = JSON.parse(cleanContent);\n} catch (e) {\n  parsed = {\n    simple: content.substring(0, 100),\n    detailed: content,\n    example: '',\n    category: 'tech'\n  };\n}\n\nreturn {\n  json: {\n    term: $('Parse Input').item.json.term,\n    simple: parsed.simple || '번역 결과를 가져올 수 없습니다',\n    detailed: parsed.detailed || '',\n    example: parsed.example || '',\n    category: parsed.category || 'tech',\n    timestamp: new Date().toISOString()\n  }\n};"
      },
      "name": "Format Response",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [850, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{ "node": "Parse Input", "type": "main", "index": 0 }]]
    },
    "Parse Input": {
      "main": [[{ "node": "OpenAI", "type": "main", "index": 0 }]]
    },
    "OpenAI": {
      "main": [[{ "node": "Format Response", "type": "main", "index": 0 }]]
    }
  }
}
```

## 🔧 고급 설정

### CORS 설정 (프로덕션 환경)

n8n을 외부에서 접근할 경우 CORS 설정이 필요합니다:

```bash
# Docker 환경 변수
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e WEBHOOK_URL=https://your-n8n-domain.com \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=your-password \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 로깅 추가

검색 로그를 저장하려면 워크플로우에 추가 노드 연결:

- Google Sheets
- Airtable
- PostgreSQL
- MySQL

## 🐛 문제 해결

### AI 번역이 작동하지 않을 때

1. **n8n이 실행 중인지 확인**
   ```bash
   curl http://localhost:5678/webhook/translate
   ```

2. **환경 변수 확인**
   - `.env` 파일의 `VITE_N8N_WEBHOOK_URL` 확인
   - 개발 서버 재시작

3. **OpenAI API 크레딧 확인**
   - https://platform.openai.com/account/usage

4. **브라우저 콘솔 확인**
   - F12 → Console 탭에서 에러 메시지 확인

### CORS 에러 발생 시

프론트엔드에서 다른 도메인의 n8n에 접근할 때:

```typescript
// src/services/aiTranslation.ts
const response = await fetch(N8N_WEBHOOK_URL, {
  method: 'POST',
  mode: 'cors', // 추가
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ term, context }),
});
```

## 💡 팁

1. **비용 절감**: gpt-3.5-turbo 모델 사용
2. **속도 향상**: 캐시 기능 활용 (이미 구현됨)
3. **정확도 향상**: 프롬프트 엔지니어링 최적화
4. **로깅**: n8n의 Execution 탭에서 실행 기록 확인

## 📞 문의

문제가 발생하면:
1. n8n 워크플로우 Execution 로그 확인
2. 브라우저 개발자 도구 Console 확인
3. GitHub Issues에 문의

---

**Happy Translating! 🚀**
