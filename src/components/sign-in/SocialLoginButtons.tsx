import { FC } from 'react';
import SocialButton from '../buttons/SocialButton';
import { FacebookIcon, GoogleIcon } from '../../icons/CustomIcons';

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
}

const SocialLoginButtons: FC<SocialLoginButtonsProps> = ({ onGoogleLogin, onFacebookLogin }) => {
  return (
    <div className='flex flex-col gap-4'>
      <SocialButton
        icon={<GoogleIcon />}
        text='Iniciar Sesión con Google'
        textSm='Google'
        onClick={onGoogleLogin}
      />
      <SocialButton
        icon={<FacebookIcon />}
        text='Iniciar Sesión con Facebook'
        textSm='Facebook'
        onClick={onFacebookLogin}
      />
    </div>
  );
}

export default SocialLoginButtons;