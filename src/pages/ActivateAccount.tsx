import { TextField, Button, Box, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { activateUser } from '../services/authService';
import SuccessModal from '../components/modals/SuccessModal';


const ActivateAccount: FC = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const validateCode = (code: string): string | null => {
    if (code.length === 0) return 'El código no puede estar vacío.';
    if (code.length !== 6) return 'El código debe tener 6 dígitos.';
    if (!/^\d+$/.test(code)) return 'El código debe contener solo dígitos.';
    return null;
  };

  const handleCodeValidation = (code: string) => {
    const validationError = validateCode(code);
    if (validationError) {
      setErrorMessage(validationError);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!handleCodeValidation(code)) return;

    try {
      await activateUser(code);
      setSuccessMessage('Cuenta activada con éxito. ¡Gracias por confirmar tu cuenta!');
    } catch (error) {
      setErrorMessage('La activación de la cuenta falló. Por favor, intenta nuevamente.');
    }
  };

  return (
    <Box className="flex flex-col min-h-screen">
      <Box className="flex-grow flex flex-col justify-center items-center px-6 lg:px-8">
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="w-full max-w-sm text-center relative"
        >
          <img
            alt="Logo de la Empresa"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12"
          />
          <Typography variant="h4" className="font-bold tracking-tight text-gray-900">
            Activar Cuenta
          </Typography>

          <Box className="w-full max-w-sm mt-10">
            <TextField
              id="code"
              label="Código de Verificación"
              variant="outlined"
              fullWidth
              required
              value={code}
              onChange={handleChange}
              inputProps={{ maxLength: 6 }}
              error={!!errorMessage}
              helperText={errorMessage || ''}
              sx={{ marginBottom: '20px' }}
            />

            {successMessage && (
              <SuccessModal
                open={true}
                title="¡Activación Exitosa!"
                message={successMessage}
                buttonText="Iniciar Sesión"
                buttonLink="/login"
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px' }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivateAccount;
