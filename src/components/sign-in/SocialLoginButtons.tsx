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
        text='Continuar con Google'
        onClick={onGoogleLogin}
      />
      <SocialButton
        icon={<FacebookIcon />}
        text='Continuar con Facebook'
        onClick={onFacebookLogin}
      />
    </div>
  );
}

export default SocialLoginButtons;