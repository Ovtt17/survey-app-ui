import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import ErrorHelperText from '../error/ErrorHelperText';

interface PasswordStepProps {
  password: string;
  confirmPassword: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError: string | null;
  confirmPasswordError: string | null;
}

const PasswordStep: FC<PasswordStepProps> = ({
  password,
  confirmPassword,
  handleChange,
  passwordError,
  confirmPasswordError
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <TextField
        fullWidth
        margin="normal"
        required
        autoFocus
        label="Contraseña"
        name='password'
        value={password}
        error={!!passwordError}
        helperText={passwordError ? <ErrorHelperText errorMessage={passwordError} /> : null}
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        required
        label="Confirmar contraseña"
        name='confirmPassword'
        value={confirmPassword}
        error={!!confirmPasswordError}
        helperText={confirmPasswordError ? <ErrorHelperText errorMessage={confirmPasswordError} /> : null}
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={showPassword}
            onChange={handleClickShowPassword}
            color="primary"
          />
        }
        label="Mostrar contraseña"
      />
    </div>
  );
}

export default PasswordStep;