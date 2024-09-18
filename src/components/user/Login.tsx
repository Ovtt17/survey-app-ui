import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import TextField from '@mui/material/TextField';
import { getToken } from '../../utils/auth';
import { useAuthContext } from '../../context/AuthContext';
import Alert from '@mui/material/Alert';

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const usernameOrEmail = formData.get('usernameOrEmail') as string;
    const password = formData.get('password') as string;

    try {
      const result = await login(usernameOrEmail, password);
      setAuth(result.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
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
    <section className="flex min-h-screen flex-col justify-center items-center">
      <div className='w-full max-w-lg p-5 bg-white rounded-md shadow-md'>
        <article className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia Sesión
          </h2>
        </article>

        <article className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <TextField
                id="usernameOrEmail"
                label="Email / Username"
                variant="outlined"
                name="usernameOrEmail"
                type="text"
                required
                autoComplete="username"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-end">
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Olvidaste la Contraseña?
                  </a>
                </div>
              </div>
              <TextField
                id="password"
                label="Contraseña"
                variant="outlined"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full"
              />
            </div>
            {errorMessage && (
              <Alert severity="error" className="mb-4">
                {errorMessage}
              </Alert>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No tienes cuenta?{' '}
            <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Regístrate
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default Login;