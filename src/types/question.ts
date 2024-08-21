import { NewQuestionOption, QuestionOption } from './questionOption';
import { QuestionType } from './questionType';

export interface Question {
  id: number;
  surveyId: number;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
}

export interface NewQuestion {
  text: string;
  type: QuestionType;
  options?: NewQuestionOption[];
}