
export enum AppState {
  WELCOME,
  DASHBOARD,
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
}

export enum MessageSender {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}
