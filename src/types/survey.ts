import { Question } from "./question";
import { User } from "./user";

export interface Survey {
  id?: number;
  title: string;
  description: string;
  creator?: User;
  averageRating?: number;
  ratingCount?: number;
  creationDate?: string;
  questions: Question[];
}