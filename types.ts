
export type CubeSize = '2x2' | '3x3' | '4x4' | '5x5';

export interface Pattern {
  id: string;
  name: string;
  size: CubeSize;
  algorithm: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
