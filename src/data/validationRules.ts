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
    minOptions: {
      message: 'Debe haber al menos dos opciones.',
      condition: (options: QuestionOption[], questionType: string) => {
        return options.length < 2 && questionType === QuestionType.SELECCION_UNICA;
      }
    },
    textOptions: {
      message: 'Las preguntas de texto solo pueden tener opciones si es una respuesta correcta.',
      condition: (options: QuestionOption[], questionType: string, isCorrect: boolean) => {
        return options.length > 0
          && questionType === QuestionType.TEXTO
          && !isCorrect;
      }
    }
  }
};