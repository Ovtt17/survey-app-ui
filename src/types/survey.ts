import {Question} from "./question";
import {User} from "./user";

export interface BaseSurvey {
  title: string;
  description: string;
  picture?: File | string;
}

export interface SurveySubmission extends BaseSurvey {
  id?: number;
  creator?: User;
  questions: Question[];
}

export interface SurveyResponse extends BaseSurvey {
  id: number;
  creatorFullName: string;
  creatorUsername: string;
  creatorProfilePicture?: string;
  averageRating: number;
  ratingCount: number;
  pictureUrl?: string;
}

export interface SurveyPagedResponse {
  surveys: SurveyResponse[];
  page: number;
  totalPages: number;
}