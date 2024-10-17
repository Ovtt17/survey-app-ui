import { FC } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Proccesing from '../../assets/lottie/Proccessing.lottie';

interface ProccessingModalProps {
  isLoading: boolean;
}

const ProccessingModal: FC<ProccessingModalProps> = ({ isLoading }) => {
  return (
    <Dialog
      open={isLoading}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '16px',
        },
      }}
    >
      <h2 className="text-center text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mt-4">
        Procesando Solicitud
      </h2>
      <DialogContent>
        <div className="flex justify-center items-center h-64">
          <div>
            <DotLottieReact
              src={Proccesing}
              loop
              autoplay
              style={{ width: '150px', height: '150px' }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProccessingModal;