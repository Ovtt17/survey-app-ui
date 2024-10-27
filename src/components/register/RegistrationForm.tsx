import React, { FC } from 'react';
import PersonalDetailsStep from './PersonalDetailsStep';
import PhoneAndDateOfBirthStep from './PhoneAndDateOfBirthStep';
import EmailStep from './EmailStep';
import StepNavigation from './StepNavigation';
import UsernameStep from './UsernameStep';
import PasswordStep from './PasswordStep';
import { useFormContext } from 'react-hook-form';

interface RegistrationFormProps {
  handleSubmit: (event: React.FormEvent) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
  handleSubmit,
}) => {
  const { trigger } = useFormContext();
  const [step, setStep] = React.useState<number>(0);
  const steps = [
    <PersonalDetailsStep
    />,
    <PhoneAndDateOfBirthStep
    />,
    <EmailStep
    />,
    <UsernameStep
    />,
    <PasswordStep
    />
  ];

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
    return result;
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
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
      />
    </form>
  );
};

export default RegistrationForm;