export interface Translation {
  id: string;
  term: string;
  category: 'pangyo' | 'digital' | 'tech' | 'trend';
  difficulty: 'easy' | 'medium' | 'hard';
  simple: string;
  detailed: string;
  example: string;
  origin?: string;
  relatedTerms?: string[];
  tags: string[];
  userLevel: ('senior' | 'mz' | 'newbie')[];
}

export interface UserCategory {
  id: 'senior' | 'mz' | 'newbie';
  name: string;
  description: string;
  color: string;
  icon: any; // React component from lucide-react
}

export interface SearchResult extends Translation {
  score: number;
}

export interface LearningProgress {
  userId: string;
  learnedTerms: string[];
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
}
