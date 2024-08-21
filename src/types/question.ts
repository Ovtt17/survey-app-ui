import { NewQuestionOption } from './questionOption';
import { QuestionType } from './questionType';

export interface Question {
  id: number;
  surveyId: number;
  text: string;
  type: QuestionType;
}

export interface NewQuestion {
  text: string;
  type: QuestionType;
  options: NewQuestionOption[];
}