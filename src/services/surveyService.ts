import { Survey } from "../types/survey";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

export const createSurvey = async (survey: Survey): Promise<Survey> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
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

export const updateSurvey = async (survey: Survey): Promise<Survey> => {
  try {
    const response = await fetch(`${BASE_URL}/${survey.id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(survey)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const updatedSurvey: Survey = await response.json();
    return updatedSurvey;
  } catch (error) {
    console.error('Error updating survey:', error);
    throw error;
  }
}

export const deleteSurvey = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response) {
      throw new Error('Network response was not ok ' + response);
    }
  } catch (error) {
    console.error('Error updating survey:', error);
    throw error;
  }
}

export const getSurveys = async (): Promise<Survey[]> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: getHeaders()
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
      headers: getHeaders()
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

export const getSurveyByUser = async (): Promise<Survey[]> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers: getHeaders()
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