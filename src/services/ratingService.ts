import { Rating } from "../types/rating";
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
}