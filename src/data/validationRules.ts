export const validationRules = {
  questionText: {
    required: 'La pregunta es obligatoria',
    minLength: {
      value: 5,
      message: 'La pregunta debe tener al menos 5 caracteres'
    }
  },
  optionText: {
    required: 'La opción es obligatoria'
  },
  title: {
    required: 'El título es obligatorio'
  },
  description: {
    required: 'La descripción es obligatoria'
  }
};