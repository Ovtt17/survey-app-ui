import { Participation } from "../types/participation";
import {SurveyPagedResponse, SurveyResponse, SurveySubmission} from "../types/survey";
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

export const createSurvey = async (survey: SurveySubmission): Promise<Response> => {
  return await fetchWithHandling(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(survey)
  });
};

export const updateSurvey = async (survey: SurveySubmission): Promise<Response> => {
  return await fetchWithHandling(`${BASE_URL}/${survey.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(survey)
  });
};

export const deleteSurvey = async (id: number): Promise<Response> => {
  return await fetchWithHandling(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
};

export const getSurveys = async (): Promise<SurveyResponse[]> => {
  return await fetchWithHandling(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
};

export const getSurveyByIdForSubmission = async (id: string): Promise<SurveySubmission> => {
  return await fetchWithHandling(`${BASE_URL}/${id}/submission`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveyByIdForOwner = async (id: string): Promise<SurveySubmission> => {
  return await fetchWithHandling(`${BASE_URL}/${id}/owner`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveyById = async (id: string): Promise<SurveyResponse> => {
  return await fetchWithHandling(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveysByCurrentUser = async (): Promise<SurveyResponse[]> => {
  return await fetchWithHandling(`${BASE_URL}/user`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveysByCurrentUserWithPaging = async (page: number, size: number): Promise<SurveyPagedResponse> => {
  const adjustedPage = page - 1;
  return await fetchWithHandling(`${BASE_URL}/user/paged?page=${adjustedPage}&size=${size}`, {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getSurveysByUsernameWithPaging = async (username: string, page: number, size: number): Promise<SurveyPagedResponse> => {
  const adjustedPage = page - 1;
  return await fetchWithHandling(`${BASE_URL}/user/${username}/paged?page=${adjustedPage}&size=${size}`, {
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