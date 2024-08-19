export interface Answer {
  id: number;
  userId: number;
  questionId: number;
  answerText: string;
  answerOptionId?: number;
}