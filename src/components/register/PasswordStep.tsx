import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { newUserValidationRules } from '../../data/newUserValidationRules';
import { Checkbox, FormControlLabel } from '@mui/material';
import UserInputField from './UserInputField';

const PasswordStep = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { getValues } = useFormContext();

  return (
    <>
      <UserInputField
        id="password"
        type={showPassword ? "text" : "password"}
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        validationRules={newUserValidationRules.password}
        autoFocus
      />
      <UserInputField
        id="confirmPassword"
        type={showPassword ? "text" : "password"}
        label="Confirmar Contraseña"
        placeholder="Confirme su contraseña"
        validationRules={{
          required: 'Este campo es requerido',
          validate: value => value === getValues('password') || 'Las contraseñas no coinciden'
        }}
        autoFocus
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
    </>
  );
}

export default PasswordStep;