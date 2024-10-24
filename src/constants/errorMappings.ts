import { AnimationPaths } from './animationPaths';

export interface ErrorMapping {
  animationSrc: string;
  buttonText: string;
}

export const errorMappings: { [key: number]: { animationSrc: string; buttonText: string } } = {
  204: {
    animationSrc: AnimationPaths.NoResultFound,
    buttonText: 'Volver al inicio',
  },
  400: {
    animationSrc: AnimationPaths.BadRequest,
    buttonText: 'Intentar de nuevo',
  },
  401: {
    animationSrc: AnimationPaths.Unauthorized,
    buttonText: 'Iniciar sesión',
  },
  403: {
    animationSrc: AnimationPaths.Forbidden,
    buttonText: 'Contactar Soporte',
  },
  404: {
    animationSrc: AnimationPaths.NotFound,
    buttonText: 'Volver al inicio',
  },
  500: {
    animationSrc: AnimationPaths.ServerError,
    buttonText: 'Intentar de nuevo',
  },
};