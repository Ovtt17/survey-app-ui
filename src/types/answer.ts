interface BaseAnswer {
  surveyId: number;
  questionId: number;
  answerText: string;
}
export interface Answer extends BaseAnswer {
  id?: number;
  questionText?: string;
}

export interface NewAnswer extends BaseAnswer {
}