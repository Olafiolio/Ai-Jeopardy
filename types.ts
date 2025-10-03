
export interface Card {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  points: number;
  cards: Card[];
  correctSentence: string;
  completed: boolean;
  answeredCorrectly: boolean | null;
}

export interface Category {
  title: string;
  color: string;
  questions: Question[];
}

export interface GameState {
  board: Category[];
  score: number;
  questionsAnswered: number;
}
