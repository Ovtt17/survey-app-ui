import { Dayjs } from 'dayjs';
import { NewUser } from '../types/user';
import { validateField } from './validationService';
import { ERROR_MESSAGES, StepErrors, STEP_FIELDS } from './constants';
import { checkExistingEmail, checkExistingUsername } from '../services/authService';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const SHORT_DELAY_MS = 500;
const LONG_DELAY_MS = 1000;

export const validateStep = async (
  step: number,
  formData: NewUser,
  minDate: Dayjs,
  maxDate: Dayjs,
  setLoading: (loading: boolean) => void,
  setErrors: (errors: (prev: StepErrors[]) => StepErrors[]) => void,
  setErrorMessage: (message: string) => void
): Promise<boolean> => {
  setLoading(true);
  try {
    const newErrors = await validateFieldsForStep(step, formData, minDate, maxDate);

    setErrors(prev => {
      const updatedErrors = [...prev];
      updatedErrors[step] = newErrors;
      return updatedErrors;
    });

    if (!Object.values(newErrors).every(error => error === null)) {
      setErrorMessage(ERROR_MESSAGES.requiredFields);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error during step validation:', error);
    setErrorMessage('Ocurrió un error durante la validación. Por favor, inténtalo de nuevo.');
    return false;
  } finally {
    setLoading(false);
  }
};

export const validateFieldsForStep = async (
  step: number,
  formData: NewUser,
  minDate: Dayjs,
  maxDate: Dayjs
): Promise<StepErrors> => {
  const currentStepFields = STEP_FIELDS[step];
  const newErrors: StepErrors = {};

  await delay(SHORT_DELAY_MS);
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

const checkFieldExistence = async (checkFunction: () => Promise<boolean>, errorMessage: string): Promise<string | null> => {
  await delay(LONG_DELAY_MS);
  const alreadyExists = await checkFunction();
  return alreadyExists ? errorMessage : null;
};

export const verifyStepData = async (step: number, formData: NewUser): Promise<string | null> => {
  const EMAIL_STEP = 2;
  const USERNAME_STEP = 3;

  switch (step) {
    case EMAIL_STEP:
      return await checkFieldExistence(() => checkExistingEmail(formData.email), ERROR_MESSAGES.emailInUse);
    case USERNAME_STEP:
      return await checkFieldExistence(() => checkExistingUsername(formData.username), ERROR_MESSAGES.usernameInUse);
    default:
      return null;
  }
};