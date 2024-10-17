import {Question} from "./question";
import {User} from "./user";

export interface BaseSurvey {
  title: string;
  description: string;
  pictureUrl?: string;
}

export interface SurveySubmission extends BaseSurvey {
  id?: number;
  creator?: User;
  questions: Question[];
  averageRating?: number;
  ratingCount?: number;
  creationDate?: string;
  picture?: File;
}

export interface SurveyResponse extends BaseSurvey {
  id: number;
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