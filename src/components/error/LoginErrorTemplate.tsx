import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorTemplate from './ErrorTemplate';
import { AnimationPaths } from '../../constants/animationPaths';

const LoginErrorTemplate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorTemplate
      error={{
        name: 'UnauthorizedError',
        title: 'No Autorizado',
        message: 'Debes iniciar sesión para crear una encuesta.',
        animationSrc: AnimationPaths.Unauthorized,
        buttonText: 'Iniciar sesión'
      }}
      onButtonClick={() => navigate('/login')}
    />
  );
};

export default LoginErrorTemplate;