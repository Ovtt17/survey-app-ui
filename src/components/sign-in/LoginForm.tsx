import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorHelperText from '../error/ErrorHelperText';
import GradientCircularProgress from '../loadings/GradientCircularProgress';

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  passwordRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  handlePasswordChange: () => void;
  isLoading: boolean;
}

const LoginForm: FC<LoginFormProps> = ({
  handleSubmit,
  passwordRef,
  errorMessage,
  handlePasswordChange,
  isLoading
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormControl fullWidth error={!!errorMessage}>
        <TextField
          id="usernameOrEmail"
          label="Email / Username"
          variant="outlined"
          name="email"
          type="text"
          required
          fullWidth
          error={!!errorMessage}
        />
      </FormControl>
      <FormControl fullWidth error={!!errorMessage}>
        <FormControl
          required
          fullWidth
          variant="outlined"
          error={!!errorMessage}
        >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            inputRef={passwordRef}
            onChange={handlePasswordChange}
            inputProps={{ minLength: 8 }}
          />
          {errorMessage && (
            <FormHelperText>
              <ErrorHelperText errorMessage={errorMessage} />
            </FormHelperText>
          )}
        </FormControl>
        <div className="flex justify-end">
          <div className="text-sm">
            <a href="#" className="leading-6 text-midnight-black hover:text-gray-600 underline">
              Olvidaste la Contraseña?
            </a>
          </div>
        </div>
      </FormControl>
      <div>
        <button type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md bg-midnight-black hover:bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
          {isLoading ? <GradientCircularProgress size={24} /> : 'Iniciar Sesión'}
        </button>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500">
        No tienes cuenta?{' '}
        <span>
          <Link to={'/register'} className="leading-6 underline text-midnight-black hover:text-gray-600">
            Regístrate
          </Link>
        </span>
      </p>
    </form>
  );
}

export default LoginForm;