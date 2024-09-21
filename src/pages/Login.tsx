import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { getToken } from '../utils/auth';
import { useAuthContext } from '../context/AuthContext';
import { SitemarkIcon } from '../icons/CustomIcons';
import LoginForm from '../components/sign-in/LoginForm';
import OrSeparator from '../components/sign-in/OrSeparator';
import SocialLoginButtons from '../components/sign-in/SocialLoginButtons';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SuccessCheck from '../assets/lottie/SuccessCheck.lottie';
import LoadingIndicator from '../components/loadings/LoadingIndicator';

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth, user } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const usernameOrEmail = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await login(usernameOrEmail, password);
      setAuth(result.token);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      if (passwordRef.current) {
        passwordRef.current.value = '';
        passwordRef.current.focus();
      }
    } finally {
      setIsLoading(false);
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
      <div className={`w-full flex justify-center max-w-lg p-6 sm:p-8 bg-white rounded-md shadow-md transition-opacity duration-300 ${isLoading || isSuccess ? 'opacity-10' : ''}`}>
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
            isLoading={isLoading}
          />
          <OrSeparator />
          <SocialLoginButtons
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={handleFacebookLogin}
          />
        </article>
      </div>
      {(isLoading || isSuccess) && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          {isLoading && (
            <LoadingIndicator />
          )}
          {isSuccess && (
            <div className='flex flex-col items-center'>
              <DotLottieReact
                src={SuccessCheck}
                loop
                autoplay
                className='w-[300px] sm:w-[500px] h-[300px] sm:h-[500px]'
              />
              <p className="text-3xl text-center">¡Bienvenido {user?.fullName}!</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Login;