import { Button, SvgIconProps } from '@mui/material';
import { FC } from 'react';

interface SocialButtonProps {
  icon: React.ReactElement<SvgIconProps>;
  text: string;
  onClick: () => void;
}

const SocialButton: FC<SocialButtonProps> = ({ icon, text, onClick }) => {
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
      <span className="text-sm sm:text-base">{text}</span>
    </Button>
  );
}

export default SocialButton;