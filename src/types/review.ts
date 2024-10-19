import { Rating } from "./rating";

export interface Review {
  id?: number;
  title: string;
  content: string;
  surveyId: number;
  author: string;
  authorPicture?: string;
  rating: Rating;
  createdDate?: string;
}