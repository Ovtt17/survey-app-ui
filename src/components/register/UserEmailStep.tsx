import { TextField } from '@mui/material';
import { FC } from 'react';
import { StepErrors } from '../../pages/Register';

interface UserEmailStepProps {
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: boolean;
  setFieldError: (field: keyof StepErrors, value: boolean) => void;
  helperText: string;
}

const UserEmailStep: FC<UserEmailStepProps> = ({
  email,
  handleChange,
  emailError,
  setFieldError,
  helperText
}) => {
  const fieldName = 'email';

  return (
    <div>
      <TextField
        label='Email'
        name='email'
        type='email'
        required
        value={email}
        onChange={handleChange}
        error={emailError}
        onError={() => setFieldError(fieldName, true)}
        helperText={emailError ? helperText : ''}
        fullWidth
        margin="normal"
      />
    </div>
  );
}

export default UserEmailStep;