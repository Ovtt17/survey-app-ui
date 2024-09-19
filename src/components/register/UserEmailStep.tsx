import { TextField } from '@mui/material';
import { FC } from 'react';

interface UserEmailStepProps {
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: string | null;
}

const UserEmailStep: FC<UserEmailStepProps> = ({
  email,
  handleChange,
  emailError,
}) => {
  const emailField = 'email';

  return (
    <div>
      <TextField
        label='Email'
        name={emailField}
        type='email'
        required
        value={email}
        onChange={handleChange}
        error={!!emailError}
        helperText={emailError}
        fullWidth
        margin="normal"
      />
    </div>
  );
}

export default UserEmailStep;