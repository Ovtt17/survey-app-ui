import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SuccessCheck from '../../assets/lottie/SuccessCheck.lottie';

interface SuccessModalProps {
  open: boolean;
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  title,
  message,
  buttonText,
  buttonLink,
}) => {
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '16px',
        },
      }}
    >
      <h2 className="text-center text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mt-4">
        {title}
      </h2>
      <DialogContent>
        <div className="text-center">
          <div className='flex justify-center'>
            <DotLottieReact
              src={SuccessCheck}
              loop
              autoplay
              style={{ width: '150px', height: '150px' }}
            />
          </div>
          <p className="mt-2 text-lg text-gray-600">
            {message}
          </p>
          <div className='pt-10'>
            <Link to={buttonLink}>
              <button className='bg-[#1EDB17] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full'>
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;