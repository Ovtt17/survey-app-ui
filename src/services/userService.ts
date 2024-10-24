import { AnimationPaths } from "../constants/animationPaths";
import { AppError } from "../types/AppError";
import { User } from "../types/user";
import { getToken } from "../utils/auth";
import { handleErrorResponse } from "./handleErrorResponse";

const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

export const getUser = async (): Promise<User> => {
  try {
    const response = await fetch(BASE_URL + '/me', {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('An error occurred while fetching user data. Please try again later.');
  }
};

export const getUserByUsername = async (username: string): Promise<User> => {
  try {
    const response = await fetch(BASE_URL + `/${username}`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) {
      await handleErrorResponse(response);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new AppError(
        'Servidor no disponible',
        'No se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde.',
        AnimationPaths.ServerUnavailable,
        'Volver al inicio'
      );
    }
    console.error('Error during fetch operation:', error);
    throw error;
  }
};