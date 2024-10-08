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
  }
};