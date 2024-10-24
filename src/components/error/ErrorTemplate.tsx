import React from 'react';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from 'react-router-dom';
import { AppError } from '../../types/AppError';

interface ErrorTemplateProps {
  error: AppError;
  onButtonClick?: () => void;
}

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({ error, onButtonClick }) => {
  return (
    <div className="absolute inset-0 z-20 text-midnight-black flex flex-col justify-center items-center text-center gap-2 sm:gap-4">
      <DotLottieReact
        src={error.animationSrc}
        loop
        autoplay
        className="w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[330px]"
      />
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl leading-snug text-blue-gray-900">
        {error.title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl">
        {error.message}
      </p>
      <Link to='/'>
        <button className="px-4 py-2 bg-blue-500 text-white rounded md:w-[10rem]" onClick={onButtonClick}>
          {error.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default ErrorTemplate;