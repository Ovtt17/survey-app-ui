export interface NewAnswer {
  questionId: number;
  answerText: string;
}

export interface Answer {
  id: number;
  questionId: number;
  answerText: string;
}