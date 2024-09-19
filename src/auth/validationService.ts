import dayjs, { Dayjs } from 'dayjs';
import { NewUser } from '../types/user';

export const validateField = (name: string, value: string | Dayjs | null, formData: NewUser, minDate: Dayjs, maxDate: Dayjs): string | null => {
  const isString = typeof value === 'string';

  switch (name) {
    case 'firstName':
      return isString && !value.trim() ? 'El nombre es obligatorio' : null;
    case 'lastName':
      return isString && !value.trim() ? 'El apellido es obligatorio' : null;
    case 'phone':
      return isString && (!/^\d{8}$/.test(value) || value.length !== 8) ? 'El número de teléfono debe tener 8 dígitos' : null;
    case 'email':
      return isString && !/\S+@\S+\.\S+/.test(value) ? 'El correo electrónico es inválido' : null;
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