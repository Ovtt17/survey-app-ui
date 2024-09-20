import React from 'react';
import { Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorHelperTextProps {
  errorMessage: string;
}

const ErrorHelperText: React.FC<ErrorHelperTextProps> = ({ errorMessage }) => {
  return (
    <Box component="span" display="flex" alignItems="center">
      <ErrorIcon color="error" fontSize="small" style={{ marginRight: 4 }} />
      {errorMessage}
    </Box>
  );
};

export default ErrorHelperText;