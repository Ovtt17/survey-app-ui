export interface NewAnswer {
  surveyId: number;
  questionId: number;
  answerText: string;
}

export interface Answer {
  id: number;
  surveyId: number;
  questionId: number;
  answerText: string;
}