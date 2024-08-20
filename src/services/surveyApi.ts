import { NewSurvey, Survey } from "../types/survey";

const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys`;

export const createSurvey = async (survey: NewSurvey): Promise<Survey> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(survey) // Enviar los datos del survey en el cuerpo de la solicitud
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const newSurvey: Survey = await response.json();
    return newSurvey;
  } catch (error) {
    console.error('Error creating survey:', error);
    throw error;
  }
}