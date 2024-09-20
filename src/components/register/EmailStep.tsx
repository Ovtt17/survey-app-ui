import { TextField } from '@mui/material';
import { FC } from 'react';
import ErrorHelperText from '../error/ErrorHelperText';

interface EmailStepProps {
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: string | null;
}

const EmailStep: FC<EmailStepProps> = ({
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
        helperText={emailError ? <ErrorHelperText errorMessage={emailError} /> : null}
        fullWidth
        margin="normal"
      />
    </div>
  );
}

export default EmailStep;