import dayjs, { Dayjs } from 'dayjs';
import { NewUser } from '../types/user';

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

export const validateField = (name: string, value: string | Dayjs | null, formData: NewUser, minDate: Dayjs, maxDate: Dayjs): string | null => {
  const isString = typeof value === 'string';

  switch (name) {
    case 'firstName':
      return isString && !value.trim() ? 'El nombre es obligatorio' : null;
    case 'lastName':
      return isString && !value.trim() ? 'El apellido es obligatorio' : null;
    case 'phone':
      return isString && (!value.trim() || !/^\d{8}$/.test(value)) ? 'El número de teléfono debe tener 8 dígitos' : null;
    case 'email':
      return isString && !/\S+@\S+\.\S+/.test(value) ? 'El correo electrónico es inválido' : null;
    case 'username':
      return isString ? validateUsername(value) : null;
    case 'password':
      return isString && value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : null;
    case 'confirmPassword':
      return isString && value !== formData.password ? 'Las contraseñas no coinciden' : null;
    case 'dateOfBirth':
      const dateValue = dayjs(value);
      const isValidDate = dateValue.isAfter(minDate) && dateValue.isBefore(maxDate);
      return isValidDate ? null : 'Fecha de nacimiento no válida';
    default:
      return null;
  }
};