import React, { FC } from 'react';
import UserPersonalDetailsStep from './UserPersonalDetailsStep';
import UserPhoneAndDateOfBirthStep from './UserPhoneAndDateOfBirthStep';
import UserEmailStep from './UserEmailStep';
import { NewUser } from '../../types/user';
import { Dayjs } from 'dayjs';
import { StepErrors } from '../../auth/constants';
import ErrorMessage from './ErrorMessage';
import StepNavigation from './StepNavigation';
import UsernameStep from './UsernameStep';

interface RegistrationFormProps {
  formData: NewUser;
  errors: Array<StepErrors>;
  dateOfBirth: Dayjs | null;
  minDate: Dayjs;
  maxDate: Dayjs;
  errorMessage: string;
  step: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (newDateOfBirth: Dayjs | null) => void;
  updateError: (field: keyof StepErrors, value: string | null) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
  formData,
  errors,
  dateOfBirth,
  minDate,
  maxDate,
  errorMessage,
  step,
  handleChange,
  handleChangeDate,
  updateError,
  handlePrevStep,
  handleNextStep,
  handleSubmit,
}) => {
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
    <UsernameStep
      username={formData.username}
      handleChange={handleChange}
      usernameError={errors[3].username}
    />,
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-3 lg:gap-6 flex flex-col h-full justify-between">
      <div>{steps[step]}</div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <StepNavigation step={step} handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />
    </form>
  );
};

export default RegistrationForm;