import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { getToken } from '../utils/auth';
import { useAuthContext } from '../context/AuthContext';
import { SitemarkIcon } from '../icons/CustomIcons';
import LoginForm from '../components/sign-in/LoginForm';
import OrSeparator from '../components/sign-in/OrSeparator';
import SocialLoginButtons from '../components/sign-in/SocialLoginButtons';

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

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

  const handleGoogleLogin = async () => {
    console.log('Google login');
  };

  const handleFacebookLogin = async () => {
    console.log('Facebook login');
  };

  const handlePasswordChange = () => setErrorMessage('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth(token);
      navigate('/');
    }
  }, [navigate]);

  return (
    <section className="flex min-h-screen flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className='w-full flex justify-center max-w-lg p-6 sm:p-8 bg-white rounded-md shadow-md'>
        <article className="flex flex-col gap-4 w-full max-w-sm">
          <SitemarkIcon />
          <h2 className="text-start text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar Sesión
          </h2>
          <LoginForm
            handleSubmit={handleSubmit}
            passwordRef={passwordRef}
            errorMessage={errorMessage}
            handlePasswordChange={handlePasswordChange}
          />
          <OrSeparator />
          <SocialLoginButtons
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={handleFacebookLogin}
          />
        </article>
      </div>
    </section>
  );
};

export default Login;