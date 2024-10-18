import { Answer, NewAnswer } from "../types/answer";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys/answers`;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
};
export const createAnswer = async (answer: NewAnswer[]): Promise<void> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
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

export const getAnswersBySurveyIdAndUserId = async (surveyId: number, userId: number, participationId: number): Promise<Answer[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${surveyId}/${userId}/${participationId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching answers:', error);
    throw error;
  }

}