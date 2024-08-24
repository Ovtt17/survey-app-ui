import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import TextField from '@mui/material/TextField';
import { getToken } from '../../utils/auth';
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthContext();

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
      // Handle login error
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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia Sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;