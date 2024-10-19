import { Rating } from "./rating";

interface BaseReview {
  title: string;
  content: string;
  surveyId: number;
  rating: Rating;
}

export interface NewReview extends BaseReview {}

export interface Review extends BaseReview {
  id?: number;
  authorUsername: string;
  authorPicture?: string;
  createdDate?: string;
}