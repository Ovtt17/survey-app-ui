export interface QuestionOption {
  id: number;
  questionId: number;
  text: string;
  isCorrect?: boolean;
}

export interface NewQuestionOption {
  text: string;
  isCorrect?: boolean;
}