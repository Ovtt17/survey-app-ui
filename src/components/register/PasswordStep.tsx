import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { newUserValidationRules } from '../../data/newUserValidationRules';
import { Checkbox, FormControlLabel } from '@mui/material';

const PasswordStep = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { register, getValues, formState: { errors } } = useFormContext();

  return (
    <>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register('password', newUserValidationRules.password)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          autoFocus
        />
        {errors.password && <span className="text-red-500">{String(errors.password.message)}</span>}
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Confirmar Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register('confirmPassword', {
            required: 'Este campo es requerido',
            validate: value => value === getValues('password') || 'Las contraseñas no coinciden'
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          autoFocus
        />
        {errors.confirmPassword && <span className="text-red-500">{String(errors.confirmPassword.message)}</span>}
      </div>
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