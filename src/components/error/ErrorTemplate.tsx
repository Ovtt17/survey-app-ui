import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

interface ErrorTemplateProps {
  title?: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({
  title = 'Error',
  message,
  buttonText = 'Volver al inicio',
  onButtonClick,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      textAlign="center"
      px={3}
    >
      <ErrorOutlineIcon color="error" style={{ fontSize: 80, marginBottom: 16 }} />
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default ErrorTemplate;
