import React, { FC, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { checkExistingEmail, registerUser } from '../services/authService';
import { NewUser } from '../types/user';
import { useNavigate } from 'react-router-dom';
import UserPersonalDetailsStep from '../components/register/UserPersonalDetailsStep';
import dayjs, { Dayjs } from 'dayjs';
import UserEmailStep from '../components/register/UserEmailStep';
import UserPhoneAndDateOfBirthStep from '../components/register/UserPhoneAndDateOfBirthStep';
import { ERROR_MESSAGES, initialFieldErrors, initialFormData, StepErrors } from '../auth/constants';
import { validateField } from '../auth/validationService';

const Register: FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);

  const minDate = dayjs().subtract(100, 'year');
  const maxDate = dayjs().subtract(15, 'year');

  const [formData, setFormData] = useState<NewUser>(initialFormData);
  const [errors, setErrors] = useState<Array<StepErrors>>(initialFieldErrors);

  const updateError = (field: keyof StepErrors, value: string | null) => {
    setErrors(prev => {
      const newFieldErrors = [...prev];
      newFieldErrors[step] = { ...newFieldErrors[step], [field]: value };
      return newFieldErrors;
    });
  };

  useEffect(() => {
    if (errors.every(stepErrors => Object.values(stepErrors).every(error => error === null))) {
      setErrorMessage('');
    }
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    updateError(name as keyof StepErrors, null);
  };

  const handleChangeDate = (newDateOfBirth: Dayjs | null) => {
    const isValidDate = newDateOfBirth?.isAfter(minDate) && newDateOfBirth?.isBefore(maxDate);
    const name = 'dateOfBirth';
    setDateOfBirth(newDateOfBirth);

    setFormData(prevData => ({
      ...prevData,
      dateOfBirth: isValidDate ? newDateOfBirth?.toDate() : undefined,
    }));
    updateError(name as keyof StepErrors, isValidDate ? null : 'Fecha de nacimiento no válida');
  };

  const handleNextStep = async () => {
    const emailStep = 2;
    const currentStepFields = Object.keys(errors[step]);
    const newErrors: StepErrors = {};

    if (step === 1) {
      const isValidDate = dateOfBirth?.isAfter(minDate) && dateOfBirth?.isBefore(maxDate);
      newErrors.dateOfBirth = isValidDate ? null : 'Fecha de nacimiento no válida';
    }

    currentStepFields.forEach(field => {
      const fieldValue = formData[field as keyof NewUser];
      const errorMessage = validateField(
        field,
        fieldValue as string | Dayjs | null,
        formData,
        minDate,
        maxDate
      );
      newErrors[field] = errorMessage;
    });

    setErrors(prev => {
      const updatedErrors = [...prev];
      updatedErrors[step] = newErrors;
      return updatedErrors;
    });

    if (!Object.values(newErrors).every(error => error === null)) {
      setErrorMessage(ERROR_MESSAGES.requiredFields);
      return;
    }

    if (step === emailStep) {
      const emailAlreadyExists = await checkExistingEmail(formData.email);
      if (emailAlreadyExists) {
        setErrorMessage(ERROR_MESSAGES.emailInUse);
        updateError('email', 'El correo electrónico ya está en uso');
        return;
      }
    }
    setErrorMessage('');
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[step] = {};
      return newErrors;
    });
    setStep((prevStep) => prevStep - 1);
  };

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
      handleChange={handleChange}
      firstNameError={errors[0].firstName}
      lastNameError={errors[0].lastName}
    />,
    <UserPhoneAndDateOfBirthStep
      phone={formData.phone}
      dateOfBirth={dateOfBirth}
      handleChange={handleChange}
      handleChangeDate={handleChangeDate}
      setFieldError={updateError}
      phoneError={errors[1].phone}
      minDate={minDate}
      maxDate={maxDate}
    />,
    <UserEmailStep
      email={formData.email}
      handleChange={handleChange}
      emailError={errors[2].email}
    />,
  ];

  return (
    <section className="flex min-h-screen flex-col justify-center items-center">
      <div className="w-full max-w-md lg:max-w-5xl bg-white rounded-md shadow-md">
        <div className="min-h-80 relative lg:grid lg:grid-cols-2 lg:gap-6 pt-16 lg:pt-24 pb-10 px-10">
          <article className="text-center lg:text-left">
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
          </article>
          <article className="flex flex-col justify-between">
            <form
              onSubmit={handleSubmit}
              className="space-y-3 lg:gap-6 flex flex-col h-full justify-between"
            >
              <div>
                {steps[step]}
              </div>
              {errorMessage && (
                <Alert severity="error" className="pb-4">
                  {errorMessage}
                </Alert>
              )}
              <div className="flex justify-between items-center lg:col-span-2">
                {step > 0 && (
                  <div>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Atrás
                    </button>
                  </div>
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
          </article>
        </div>
      </div>
    </section>
  );
};

export default Register;