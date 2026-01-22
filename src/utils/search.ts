// 검색 유틸리티
import { Translation } from '../types';

export const searchTranslations = (
  translations: Translation[],
  query: string,
  category?: string
): Translation[] => {
  if (!query.trim()) {
    return category && category !== 'all'
      ? translations.filter(t => t.category === category)
      : translations;
  }

  const lowerQuery = query.toLowerCase();
  let results = translations.filter(t => 
    t.term.toLowerCase().includes(lowerQuery) ||
    t.simple.toLowerCase().includes(lowerQuery) ||
    t.detailed.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    t.relatedTerms?.some(term => term.toLowerCase().includes(lowerQuery))
  );

  if (category && category !== 'all') {
    results = results.filter(t => t.category === category);
  }

  // Sort by relevance
  return results.sort((a, b) => {
    const aExact = a.term.toLowerCase() === lowerQuery;
    const bExact = b.term.toLowerCase() === lowerQuery;
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    const aStarts = a.term.toLowerCase().startsWith(lowerQuery);
    const bStarts = b.term.toLowerCase().startsWith(lowerQuery);
    
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    
    return 0;
  });
};

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};
