import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import TextField from '@mui/material/TextField';
import { getToken } from '../../utils/auth';
import { useAuthContext } from '../../context/AuthContext';
import Alert from '@mui/material/Alert';
import { Box, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { FacebookIcon, GoogleIcon, SitemarkIcon } from '../../icons/CustomIcons';
import SocialButton from '../buttons/SocialButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const usernameOrEmail = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await login(usernameOrEmail, password);
      setAuth(result.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      if (passwordRef.current) {
        passwordRef.current.value = '';
        passwordRef.current.focus();
      }
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth(token);
      navigate('/');
    }
  }, [navigate]);

  return (
    <section className="flex min-h-screen flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className='w-full flex justify-center max-w-lg p-6 sm:p-10 bg-white rounded-md shadow-md'>
        <article className="flex flex-col gap-4 w-full max-w-sm">
          <SitemarkIcon />
          <h2 className="text-start text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormControl fullWidth error={!!errorMessage}>
              <TextField
                id="usernameOrEmail"
                label="Email / Username"
                variant="outlined"
                name="email"
                type="email"
                required
                fullWidth
                error={!!errorMessage}
              />
            </FormControl>
            <FormControl fullWidth error={!!errorMessage}>
              <div className="flex justify-end">
                <div className="text-sm">
                  <a href="#" className="leading-6 text-midnight-black hover:text-gray-600 underline">
                    Olvidaste la Contraseña?
                  </a>
                </div>
              </div>
              <FormControl required fullWidth variant="outlined" error={!!errorMessage}>
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
                />
                {errorMessage && (
                  <Alert severity="error" className="mt-2">
                    {errorMessage}
                  </Alert>
                )}
              </FormControl>
            </FormControl>
            <div>
              <button type="submit"
              className="flex w-full justify-center rounded-md bg-midnight-black hover:bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                Iniciar Sesión
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
          <Box display="flex" alignItems="center" marginY={2}>
            <Divider style={{ flex: 1 }} />
            <Typography variant="body1" style={{ margin: '0 10px' }}>or</Typography>
            <Divider style={{ flex: 1 }} />
          </Box>
          <div className='flex flex-col gap-4'>
            <SocialButton
              icon={<GoogleIcon />}
              text='Iniciar Sesión con Google'
              textSm='Google'
              onClick={() => console.log('Google')}
            />
            <SocialButton
              icon={<FacebookIcon />}
              text='Iniciar Sesión con Facebook'
              textSm='Facebook'
              onClick={() => console.log('Facebook')}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Login;