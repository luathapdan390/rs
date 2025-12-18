
export interface Principle {
  title: string;
  description: string;
  example: string;
}

export interface RulePair {
  from: string;
  to: string;
}

export interface VerbGroup {
  label: string;
  items: string[];
}

export type QuestionType = 'fill' | 'transform' | 'multiple-choice';

export interface Question {
  id: number;
  type: QuestionType;
  content: string;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  explanation?: string;
}
