import { QuestionOption } from "../types/questionOption";
import { QuestionType } from "../types/questionType";

export const validationRules = {
  questionText: {
    required: 'El encabezado de la pregunta es obligatoria.',
    minLength: {
      value: 5,
      message: 'El encabezado de la pregunta debe tener al menos 5 caracteres.'
    }
  },
  optionText: {
    required: 'Las opciones son obligatorias.'
  },
  title: {
    required: 'El título es obligatorio.'
  },
  description: {
    required: 'La descripción es obligatoria.'
  },
  options: {
    validate: (options: QuestionOption[], questionType: string, isCorrect: boolean) => {
      if (isCorrect && options.length < 2) {
        return 'Debe haber al menos dos opciones cuando la respuesta debe ser correcta.';
      }
      if (questionType === QuestionType.SELECCION_UNICA && options.length < 2) {
        return 'Debe haber al menos dos opciones para seleccionar.';
      }
      if (questionType === QuestionType.TEXTO && options.length > 0 && !isCorrect) {
        return 'Las preguntas de texto solo pueden tener opciones si es una respuesta correcta.';
      }
      if (isCorrect && !options.some(option => option.isCorrect)) {
        return 'Debe seleccionar al menos una opción como correcta.';
      }
      return true;
    }
  },
};