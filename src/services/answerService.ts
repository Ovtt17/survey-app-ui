import { Answer } from "../types/answer";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys/answers`;

export const createAnswer = async (answer: Answer[]): Promise<void> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(answer)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
  } catch (error) {
    console.error('Error creating survey:', error);
    throw error;
  }
}