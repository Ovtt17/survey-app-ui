import { Alert } from '@mui/material';
import { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Alert severity="error" className="pb-4">
      {message}
    </Alert>
  );
}

export default ErrorMessage;