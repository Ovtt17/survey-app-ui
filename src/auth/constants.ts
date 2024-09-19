import { NewUser } from "../types/user";

export const ERROR_MESSAGES = {
  requiredFields: 'Por favor, completa todos los campos correctamente.',
  passwordMismatch: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
  registrationFailed: 'Registration failed. Please try again',
  emailInUse: 'El email ya existe. Por favor, intenta con otro.',
  usernameInUse: 'El nombre de usuario ya existe. Por favor, intenta con otro.',
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
  { username: null },
  { password: null, confirmPassword: null },
];

export const STEP_FIELDS: { [key: number]: Array<keyof NewUser> } = {
  0: ['firstName', 'lastName'],
  1: ['phone', 'dateOfBirth'],
  2: ['email'],
  3: ['username'],
  4: ['password', 'confirmPassword'],
};