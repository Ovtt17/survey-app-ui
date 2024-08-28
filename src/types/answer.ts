export interface Answer {
  id?: number;
  surveyId: number;
  surveyTitle?: string;
  questionId: number;
  questionText?: string;
  answerText: string;
  participationId?: number;
}