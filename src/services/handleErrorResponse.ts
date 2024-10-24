import { AnimationPaths } from "../constants/animationPaths";
import { errorMappings } from "../constants/errorMappings";
import { AppError } from "../types/AppError";
import { ExceptionResponse } from "../types/ExceptionResponse";

export const handleErrorResponse = async (response: Response) => {
  const errorData: ExceptionResponse = await response.json();
  const errorMapping = errorMappings[response.status];
  if (errorMapping) {
    throw new AppError(
      errorData.businessErrorDescription || 'Error',
      errorData.error || 'Error desconocido',
      errorMapping.animationSrc,
      errorMapping.buttonText
    );
  } else {
    throw new AppError(
      'Error desconocido',
      errorData.error || 'Error desconocido',
      AnimationPaths.UnknownError,
      'Volver al inicio'
    );
  }
};