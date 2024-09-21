import { Button, SvgIconProps } from '@mui/material';
import { FC } from 'react';

interface SocialButtonProps {
  icon: React.ReactElement<SvgIconProps>;
  text: string;
  textSm: string;
  onClick: () => void;
}

const SocialButton: FC<SocialButtonProps> = ({ icon, text, textSm, onClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      onClick={onClick}
      fullWidth
      className='hover:bg-midnight-black hover:text-white'
      sx={{
        textTransform: 'none',
        borderColor: '#E0E0E0',
        color: '#333333',
        paddingY: 1,
      }}
    >
      <span className="hidden sm:inline">{text}</span>
      <span className="inline sm:hidden">{textSm}</span>
    </Button>
  );
}

export default SocialButton;