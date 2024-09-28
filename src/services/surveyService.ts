import { Participation } from "../types/participation";
import { Survey } from "../types/survey";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

const handleErrorResponse = async (response: Response) => {
  const errorData = await response.json();
  const error = new Error(errorData.businessErrorDescription || 'Error desconocido');
  (error as any).status = response.status;
  throw error;
};

const fetchWithHandling = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      await handleErrorResponse(response);
    }
    return await response.json();
  } catch (error) {
    console.error('Error during fetch operation:', error);
    throw error;
  }
};

export const createSurvey = async (survey: Survey): Promise<Survey> => {
  return await fetchWithHandling(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(survey)
  });
};

export const updateSurvey = async (survey: Survey): Promise<Survey> => {
  return await fetchWithHandling(`${BASE_URL}/${survey.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(survey)
  });
};

export const deleteSurvey = async (id: number): Promise<void> => {
  await fetchWithHandling(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
};

export const getSurveys = async (): Promise<Survey[]> => {
  return await fetchWithHandling(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
};

export const getSurveyById = async (id: string): Promise<Survey> => {
  return await fetchWithHandling(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveyByIdForOwner = async (id: string): Promise<Survey> => {
  return await fetchWithHandling(`${BASE_URL}/${id}/owner`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveysByUsername = async (username: string): Promise<Survey[]> => {
  return await fetchWithHandling(`${BASE_URL}/user/${username}`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getCurrentUserSurveys = async (): Promise<Survey[]> => {
  return await fetchWithHandling(`${BASE_URL}/user`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveyParticipants = async (id: string): Promise<Participation[]> => {
  return await fetchWithHandling(`${BASE_URL}/${id}/participants`, {
    method: 'GET',
    headers: getHeaders()
  });
};