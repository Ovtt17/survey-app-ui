import { Alert, TextField, Button, Box, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { activateUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const ActivateAccount: FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (code.length === 0) {
      setErrorMessage('El código no puede estar vacío.');
      return;
    }
    if (code.length !== 6) {
      setErrorMessage('El código debe tener 6 dígitos.');
      return;
    }

    try {
      await activateUser(code);
      setSuccessMessage('Cuenta activada con éxito. ¡Gracias por confirmar tu cuenta!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrorMessage('La activación de la cuenta falló. Por favor, intenta nuevamente.');
    }
  };

  return (
    <Box
      className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8"
      component="form"
      onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
    >
      <Box className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <Typography
          variant="h4"
          component="h2"
          className="mt-10 text-center font-bold leading-9 tracking-tight text-gray-900"
        >
          Confirmar Cuenta
        </Typography>
      </Box>

      <Box className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='pb-5'>
          <TextField
            id="code"
            label="Código de Verificación"
            variant="outlined"
            name="code"
            type="text"
            className='pb-10'
            required
            fullWidth
            value={code}
            onChange={handleChange}
            inputProps={{ maxLength: 6 }}
          />
        </div>

        {errorMessage && (
          <Alert severity="error" className="mt-4">
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" className="mt-4">
            {successMessage}
          </Alert>
        )}

        <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-6"
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};

export default ActivateAccount;
