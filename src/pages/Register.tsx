import React, { FC, useState } from 'react';
import { Alert } from '@mui/material';
import { registerUser } from '../services/authService';
import { NewUser } from '../types/user';
import { useNavigate } from 'react-router-dom';
import UserPersonalDetailsStep from '../components/register/UserPersonalDetailsStep';
import dayjs, { Dayjs } from 'dayjs';

const ERROR_MESSAGES = {
  requiredFields: 'Por favor, completa todos los campos correctamente.',
  passwordMismatch: 'Las contraseñas no coinciden',
  registrationFailed: 'Registration failed. Please try again',
};

interface FieldErrors {
  firstName: boolean;
  lastName: boolean;
  dateOfBirth: boolean;
}

export interface FieldErrorsHandler {
  fieldErrors: FieldErrors;
  setFieldError: (field: keyof FieldErrors, value: boolean) => void;
}

const Register: FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs>(dayjs('01-01-2000'));

  const minDate = dayjs().subtract(100, 'year');
  const maxDate = dayjs().subtract(15, 'year');

  const [formData, setFormData] = useState<NewUser>({
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: dateOfBirth.toDate(),
    phone: 0,
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleChangeDate = (newDateOfBirth: Dayjs | null) => {
    if (newDateOfBirth?.isAfter(minDate) && newDateOfBirth?.isBefore(maxDate)) {
      setDateOfBirth(newDateOfBirth);
      setFormData((prevData) => ({
        ...prevData,
        dateOfBirth: newDateOfBirth.toDate(),
      }));
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: false,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        dateOfBirth: undefined,
      }));
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: true,
      }));
    }
  };


  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
  });

  const setFieldError = (field: keyof FieldErrors, value: boolean) => {
    setFieldErrors(prev => ({ ...prev, [field]: value }));
  };

  const fieldErrorsHandler: FieldErrorsHandler = {
    fieldErrors,
    setFieldError,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleNextStep = () => {
    const newFieldErrors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      dateOfBirth: !formData.dateOfBirth,
    };

    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).every(error => error === false)) {
      setErrorMessage('');
      setStep(prev => prev + 1);
    } else {
      setErrorMessage(ERROR_MESSAGES.requiredFields);
      return;
    }
  };

  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(ERROR_MESSAGES.passwordMismatch);
      return;
    };

    try {
      await registerUser(formData);
      navigate('/activate-account');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(ERROR_MESSAGES.registrationFailed);
    }
  };

  const steps = [
    <UserPersonalDetailsStep
      firstName={formData.firstName}
      lastName={formData.lastName}
      dateOfBirth={dateOfBirth}
      handleChange={handleChange}
      handleChangeDate={handleChangeDate}
      fieldErrorsHandler={fieldErrorsHandler}
      minDate={minDate}
      maxDate={maxDate}
    />
  ];

  return (
    <section className="flex min-h-screen flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md lg:max-w-5xl bg-white rounded-md shadow-md">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-6 pt-16 lg:pt-24 pb-10 px-10">
          <div className="text-center lg:text-left">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="lg:absolute lg:top-10 lg:left-10 mx-auto lg:mx-0 h-10 w-auto mb-4"
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Crear Cuenta
            </h2>
            <p className="mt-2 text-md text-gray-600">
              Completa la información para crear tu cuenta
            </p>
          </div>
          <div className="relative">
            <form
              onSubmit={handleSubmit}
              className="mt-8 lg:mt-0 space-y-6 lg:gap-6"
            >
              <div>{steps[step]}</div>

              {errorMessage && (
                <Alert severity="error" className="mb-4">
                  {errorMessage}
                </Alert>
              )}

              <div className="flex justify-between items-center lg:col-span-2">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Atrás
                  </button>
                )}
                <div className="flex-1 text-right">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
