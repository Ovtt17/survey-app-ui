import { NewUser } from "../types/user";

export const ERROR_MESSAGES = {
  requiredFields: 'Por favor, completa todos los campos correctamente.',
  passwordMismatch: 'Las contraseñas no coinciden',
  registrationFailed: 'Registration failed. Please try again',
  emailInUse: 'El email ya está en uso. Por favor, intenta con otro.',
};

export const initialFormData: NewUser = {
  username: '',
  firstName: '',
  lastName: '',
  dateOfBirth: undefined,
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export interface StepErrors {
  [key: string]: string | null;
}

export const initialFieldErrors: Array<StepErrors> = [
  { firstName: null, lastName: null },
  { phone: null, dateOfBirth: null },
  { email: null },
];