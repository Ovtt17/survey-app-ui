import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/images`;

const getHeaders = () => ({
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

const uploadImage = async (url: string, image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
}

export const uploadProfilePicture = async (image: File): Promise<string> => {
  return uploadImage(BASE_URL + '/profile', image);
}

export const uploadSurveyPicture = async (image: File, surveyId: number): Promise<string> => {
  return uploadImage(`${BASE_URL}/survey/${surveyId}`, image);
}