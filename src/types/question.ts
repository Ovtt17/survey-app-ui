import { QuestionType } from './questionType';

export interface Question {
  id: number;
  surveyId: number;
  text: string;
  type: QuestionType;
}