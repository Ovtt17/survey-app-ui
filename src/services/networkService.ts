import { AnimationPaths } from "../constants/animationPaths";
import { AppError } from "../types/AppError";
import { handleErrorResponse } from "./handleErrorResponse";

export const fetchWithHandling = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      await handleErrorResponse(response);
    }
    return await response.json();
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