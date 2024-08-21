import { NewQuestion, Question } from "./question";
import { User } from "./user";

export interface Survey {
  id: number;
  title: string;
  description: string;
  creator: User;
  rating: number;
  creationDate?: string;
  questions: Question[];
}

export interface NewSurvey {
  title: string;
  description: string;
  questions: NewQuestion[];
}