import { Alert } from '@mui/material';
import { FC, useState } from 'react';
import { registerUser } from '../services/authService';
import { NewUser } from '../types/user';
import { useNavigate } from 'react-router-dom';
import UserPersonalDetailsStep from '../components/register/UserPersonalDetailsStep';
import UserAndDOBStep from '../components/register/UserDOBStep';

const ERROR_MESSAGES = {
  requiredFields: 'Por favor, completa todos los campos.',
  passwordMismatch: 'Las contraseñas no coinciden',
  registrationFailed: 'Registration failed. Please try again',
};

interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<NewUser>({
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    phone: 0,
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
  });

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

  const validateStep = (): boolean => {
    let errors = { ...fieldErrors };
    let isValid = true;

    if (step === 0) {
      if (!formData.firstName.trim()) {
        errors.firstName = true;
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        errors.lastName = true;
        isValid = false;
      }
    }

    setFieldErrors(errors);
    setErrorMessage(isValid ? '' : ERROR_MESSAGES.requiredFields);
    return isValid;
  };

  const steps = [
    <UserPersonalDetailsStep
      firstName={formData.firstName}
      lastName={formData.lastName}
      handleChange={handleChange}
      fieldErrors={fieldErrors}
    />,
    <UserAndDOBStep handleChange={handleChange} />,
  ];

  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(ERROR_MESSAGES.passwordMismatch);
      return;
    }
    try {
      await registerUser(formData);
      navigate('/activate-account');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(ERROR_MESSAGES.registrationFailed);
    }
  };

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