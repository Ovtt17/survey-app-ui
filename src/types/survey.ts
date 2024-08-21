import { NewQuestion } from "./question";

export interface Survey {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  creator: string;
  rating: number;
  creationDate?: string;
}

export interface NewSurvey {
  title: string;
  description: string;
  creatorId: number;
  questions: NewQuestion[];
}