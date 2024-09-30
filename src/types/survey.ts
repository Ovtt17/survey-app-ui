import { Question } from "./question";
import { User } from "./user";

export interface SurveySubmission {
  id?: number;
  title: string;
  description: string;
  creator?: User;
  averageRating?: number;
  ratingCount?: number;
  creationDate?: string;
  questions: Question[];
}

export interface SurveyResponse {
  id: number;
  title: string;
  description: string;
  creatorFullName: string;
  creatorUsername: string;
  creatorProfilePicture?: string;
  averageRating: number;
  ratingCount: number;
}

export interface SurveyPagedResponse {
  surveys: SurveyResponse[];
  page: number;
  totalPages: number;
}