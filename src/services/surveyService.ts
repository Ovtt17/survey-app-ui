import { NewSurvey, Survey } from "../types/survey";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys`;

export const createSurvey = async (survey: NewSurvey): Promise<Survey> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(survey)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const surveyCreated: Survey = await response.json();
    return surveyCreated;
  } catch (error) {
    console.error('Error creating survey:', error);
    throw error;
  }
}

export const getSurveys = async (): Promise<Survey[]> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const surveys: Survey[] = await response.json();
    return surveys;
  } catch (error) {
    console.error('Error creating survey:', error);
    throw error;
  }
}

export const getSurveyById = async (id: string): Promise<Survey> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const survey: Survey = await response.json();
    return survey;
  } catch (error) {
    console.error('Error creating survey:', error);
    throw error;
  }
}