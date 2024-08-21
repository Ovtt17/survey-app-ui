export interface QuestionOption {
  id: number;
  questionId: number;
  text: string;
}

export interface NewQuestionOption {
  text: string;
  isCorrect?: boolean;
}