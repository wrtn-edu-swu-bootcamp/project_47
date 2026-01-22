// API 서비스
import { getMockAITranslation } from './mockAI';

export interface AITranslationRequest {
  term: string;
  context?: string;
}

export interface AITranslationResponse {
  term: string;
  simple: string;
  detailed: string;
  example: string;
  category: string;
  isAI: true;
}

// n8n webhook URL (실제 n8n 워크플로우 URL로 교체하세요)
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/translate';

// Mock 모드 (n8n 없이 테스트)
const USE_MOCK = !import.meta.env.VITE_N8N_WEBHOOK_URL;

export async function getAITranslation(term: string, context?: string): Promise<AITranslationResponse> {
  // Mock 모드일 경우
  if (USE_MOCK) {
    console.log('🤖 Mock AI 모드 - n8n 연결 없이 테스트 중');
    const mockResult = getMockAITranslation(term);
    
    if (mockResult) {
      // 실제 API 호출처럼 딜레이 추가
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockResult;
    }
    
    // Mock 데이터에도 없으면 AI처럼 응답
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      term,
      simple: '현재 데이터베이스에 등록되지 않은 용어입니다',
      detailed: `"${term}"에 대한 정확한 정보를 찾을 수 없습니다. 이 용어는 최신 트렌드 용어이거나 특정 분야의 전문 용어일 수 있습니다. 더 많은 정보를 원하시면 웹 검색을 통해 확인해보시는 것을 추천드립니다.`,
      example: `제안:\n• 철자를 다시 확인해보세요\n• 비슷한 용어로 검색해보세요\n• 영문으로 검색해보세요`,
      category: 'tech',
      isAI: true
    };
  }

  // 실제 n8n API 호출
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        term,
        context,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      term: data.term || term,
      simple: data.simple || data.translation || '번역 중...',
      detailed: data.detailed || data.explanation || '',
      example: data.example || '',
      category: data.category || 'tech',
      isAI: true
    };
  } catch (error) {
    console.error('AI Translation Error:', error);
    throw new Error('AI 번역에 실패했습니다. n8n 워크플로우가 실행 중인지 확인해주세요.');
  }
}

// 캐시 관리
const aiTranslationCache = new Map<string, AITranslationResponse>();

export async function getAITranslationWithCache(term: string, context?: string): Promise<AITranslationResponse> {
  const cacheKey = `${term}-${context || ''}`;
  
  // 캐시에 있으면 바로 반환
  if (aiTranslationCache.has(cacheKey)) {
    console.log('✅ 캐시에서 가져옴:', term);
    return aiTranslationCache.get(cacheKey)!;
  }

  // 없으면 AI 번역 요청
  console.log('🔄 AI 번역 요청:', term);
  const result = await getAITranslation(term, context);
  
  // 캐시에 저장
  aiTranslationCache.set(cacheKey, result);
  
  return result;
}

// 캐시 초기화
export function clearAITranslationCache() {
  aiTranslationCache.clear();
  console.log('🗑️ AI 번역 캐시 초기화됨');
}
