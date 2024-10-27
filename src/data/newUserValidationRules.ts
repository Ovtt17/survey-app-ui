import dayjs, { Dayjs } from "dayjs";

const minDate = dayjs().subtract(100, 'year');
const maxDate = dayjs().subtract(15, 'year');

const errorMessages = {
  required: 'El nombre de usuario es obligatorio',
  noSpaces: 'El nombre de usuario no debe contener espacios',
  noOnlyNumbers: 'El nombre de usuario no debe ser solo números',
  noSpecialChars: 'El nombre de usuario no debe contener caracteres especiales',
  noEmail: 'El nombre de usuario no debe ser un correo electrónico',
  minLength: 'El nombre de usuario debe tener al menos 5 caracteres',
  minLetters: 'El nombre de usuario debe contener al menos 4 letras',
  consecutiveLetters: 'El nombre de usuario debe contener al menos 4 letras consecutivas'
};

const validateUsername = (username: string): string | null => {
  const trimmedUsername = username.trim();

  if (!trimmedUsername) return errorMessages.required;
  if (/\s/.test(trimmedUsername)) return errorMessages.noSpaces;
  if (/^\d+$/.test(trimmedUsername)) return errorMessages.noOnlyNumbers;
  if (/[^a-zA-Z0-9]/.test(trimmedUsername)) return errorMessages.noSpecialChars;
  if (/\S+@\S+\.\S+/.test(trimmedUsername)) return errorMessages.noEmail;
  if (trimmedUsername.length < 5) return errorMessages.minLength;

  const letterCount = (trimmedUsername.match(/[a-zA-Z]/g) || []).length;

  if (letterCount < 4) return errorMessages.minLetters;
  if (!/[a-zA-Z]{4,}/.test(trimmedUsername)) return errorMessages.consecutiveLetters;

  return null;
};

export const newUserValidationRules = {
  username: {
    required: 'El nombre de usuario es obligatorio.',
    minLength: {
      value: 5,
      message: 'El nombre de usuario debe tener al menos 5 caracteres.'
    },
    validate: (username: string) => {
      const error = validateUsername(username);
      return error ? error : true;
    }
  },
  firstName: {
    required: 'El nombre es obligatorio.'
  },
  lastName: {
    required: 'El apellido es obligatorio.',
  },
  dateOfBirth: {
    required: 'La fecha de nacimiento es obligatoria.',
    validate: {
      minDate: (value: Dayjs) => dayjs(value).isAfter(minDate) || `La fecha debe ser posterior a ${minDate.format('DD/MM/YYYY')}.`,
      maxDate: (value: Dayjs) => dayjs(value).isBefore(maxDate) || `La fecha debe ser anterior a ${maxDate.format('DD/MM/YYYY')}.`,
    },
  },
  phone: {
    required: 'El teléfono es obligatorio.',
    minLength: {
      value: 8,
      message: 'El teléfono debe tener 8 caracteres.'
    },
    maxLength: {
      value: 8,
      message: 'El teléfono debe tener 8 caracteres.'
    },
    validate: (phone: string) => {
      const phoneRegex = /^[0-9]{8}$/;
      return phoneRegex.test(phone) ? true : 'El teléfono debe contener solo números y tener 8 caracteres.';
    }
  },
  email: {
    required: 'El correo electrónico es obligatorio.',
    validate: (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) ? true : 'El correo electrónico no es válido.';
    }
  },
  password: {
    required: 'La contraseña es obligatoria.',
    minLength: {
      value: 8,
      message: 'La contraseña debe tener al menos 8 caracteres.'
    }
  }
};