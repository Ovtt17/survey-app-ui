import { TextField } from '@mui/material';
import React, { FC } from 'react';
import ErrorHelperText from '../error/ErrorHelperText';

interface UsernameStepProps {
  username: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  usernameError: string | null;
}

const UsernameStep: FC<UsernameStepProps> = ({
  username,
  handleChange,
  usernameError,
}) => {
  const usernameField = 'username';

  return (
    <div>
      <TextField
        label='Nombre de usuario'
        name={usernameField}
        type='text'
        required
        value={username}
        onChange={handleChange}
        error={!!usernameError}
        helperText={usernameError ? <ErrorHelperText errorMessage={usernameError} /> : null}
        fullWidth
        margin="normal"
      />
    </div>
  );
}

export default UsernameStep;