import { Rating, RatingGroup } from "../types/rating";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/ratings`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

export const createRating = async (rating: Rating): Promise<void> => {
  try {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(rating)
    });
  } catch (error) {
    console.error('Error creating rating:', error);
    throw error;
  }
};

export const getRatingGroupBySurveyId = async (surveyId: string): Promise<RatingGroup[]> => {
  try {
    const response = await fetch(BASE_URL + `/grouped/${surveyId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    const ratings = await response.json();
    return ratings;
  } catch (error) {
    console.error('Error getting ratings:', error);
    throw error;
  }
};