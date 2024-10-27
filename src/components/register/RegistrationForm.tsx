import React, { FC, useState } from 'react';
import PersonalDetailsStep from './PersonalDetailsStep';
import PhoneAndDateOfBirthStep from './PhoneAndDateOfBirthStep';
import EmailStep from './EmailStep';
import StepNavigation from './StepNavigation';
import UsernameStep from './UsernameStep';
import PasswordStep from './PasswordStep';
import { useFormContext } from 'react-hook-form';
import { checkExistingEmail, checkExistingUsername } from '../../services/authService';

interface RegistrationFormProps {
  handleSubmit: (event: React.FormEvent) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
  handleSubmit,
}) => {
  const { getValues, trigger, setError } = useFormContext();
  const [step, setStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const steps = [
    <PersonalDetailsStep />,
    <PhoneAndDateOfBirthStep />,
    <EmailStep />,
    <UsernameStep />,
    <PasswordStep />
  ];

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const checkFieldExistence = async (field: 'email' | 'username', checkFunction: (value: string) => Promise<boolean>) => {
    setIsLoading(true);
    await delay(1000);
    const value = getValues(field);
    const isInUse = await checkFunction(value);
    setIsLoading(false);
    if (isInUse) {
      setError(field, { type: 'manual', message: 'En uso, Intenta con otro.' });
      return false;
    }
    return true;
  };

  const validateStep = async () => {
    const result = await trigger(
      [
        'firstName',
        'lastName',
        'phone',
        'dateOfBirth',
        'email',
        'username',
        'password',
        'confirmPassword',
      ]);

    if (!result) return false;

    const emailStep = steps[2];
    const usernameStep = steps[3];

    if (emailStep === steps[step]) {
      return await checkFieldExistence('email', checkExistingEmail);
    } else if (usernameStep === steps[step]) {
      return await checkFieldExistence('username', checkExistingUsername);
    }
    return true;
  }

  const handlePrevStep = () => {
    setStep(step - 1);
  }

  const handleNextStep = async () => {
    const isValidStep = await validateStep();
    if (!isValidStep) {
      return;
    }
    setStep(step + 1);
  };


  const totalSteps = steps.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 lg:gap-6 flex flex-col h-full justify-between">
      <div className='flex flex-col gap-3'>
        {steps[step]}
      </div>
      <StepNavigation
        step={step}
        totalSteps={totalSteps}
        isLoading={isLoading}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
      />
    </form>
  );
};

export default RegistrationForm;