import { Dayjs } from 'dayjs';
import { NewUser } from '../types/user';
import { validateField } from './validationService';
import { ERROR_MESSAGES, StepErrors, STEP_FIELDS } from './constants';
import { checkExistingEmail, checkExistingUsername } from '../services/authService';

export const validateCurrentStep = (
  step: number,
  formData: NewUser,
  minDate: Dayjs,
  maxDate: Dayjs
): StepErrors => {
  const currentStepFields = STEP_FIELDS[step];
  const newErrors: StepErrors = {};

  currentStepFields.forEach(field => {
    const fieldValue = formData[field];
    const errorMessage = validateField(
      field,
      fieldValue as string | Dayjs | null,
      formData,
      minDate,
      maxDate
    );
    newErrors[field] = errorMessage;
  });

  return newErrors;
};

export const verifyStep = async (step: number, formData: NewUser): Promise<string | null> => {
  const emailStep = 2, usernameStep = 3;

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  switch (step) {
    case emailStep:
      await delay(1500);
      const emailAlreadyExists = await checkExistingEmail(formData.email);
      if (emailAlreadyExists) {
        return ERROR_MESSAGES.emailInUse;
      }
      break;
    case usernameStep:
      await delay(1500);
      const usernameAlreadyExists = await checkExistingUsername(formData.username);
      if (usernameAlreadyExists) {
        return ERROR_MESSAGES.usernameInUse;
      }
      break;
    default:
      return null;
  }
  return null;
};