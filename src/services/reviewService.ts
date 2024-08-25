import { Review } from "../types/review";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/reviews`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

export const getReviews = async (surveyId: string): Promise<Review[]> => {
  try {
    const response = await fetch(BASE_URL + `/${surveyId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const reviews: Review[] = await response.json();
    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw error;
  }
}