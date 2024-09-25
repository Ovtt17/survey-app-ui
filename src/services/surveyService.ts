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

export const createSurvey = async (survey: Survey): Promise<Survey> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(survey)
    });
    if (!response.ok) {
      await handleErrorResponse(response);
    }
    const surveyCreated: Survey = await response.json();
    return surveyCreated;
  } catch (error) {
    console.error('Error al crear la encuesta:', error);
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
      await handleErrorResponse(response);
    }
    const updatedSurvey: Survey = await response.json();
    return updatedSurvey;
  } catch (error) {
    console.error('Error al actualizar la encuesta:', error);
    throw error;
  }
}

export const deleteSurvey = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) {
      await handleErrorResponse(response);
    }
  } catch (error) {
    console.error('Error al eliminar la encuesta:', error);
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
      }
    });
    if (!response.ok) {
      await handleErrorResponse(response);
    }
    const surveys: Survey[] = await response.json();
    return surveys;
  } catch (error) {
    console.error('Error al obtener las encuestas:', error);
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
      await handleErrorResponse(response);
    }
    const survey: Survey = await response.json();
    return survey;
  } catch (error) {
    console.error('Error al obtener la encuesta:', error);
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
      await handleErrorResponse(response);
    }
    const surveys: Survey[] = await response.json();
    return surveys;
  } catch (error) {
    console.error('Error al obtener las encuestas del usuario:', error);
    throw error;
  }
}

export const getSurveyParticipants = async (id: string): Promise<Participation[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/participants`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) {
      await handleErrorResponse(response);
    }
    const participants: Participation[] = await response.json();
    return participants;
  } catch (error) {
    console.error('Error al obtener los participantes de la encuesta:', error);
    throw error;
  }
};