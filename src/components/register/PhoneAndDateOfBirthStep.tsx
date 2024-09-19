import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { FC, useMemo, useState } from 'react';
import { DatePicker, DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StepErrors } from '../../auth/constants';


interface PhoneAndDateOfBirthStepProps {
  phone: string;
  dateOfBirth: Dayjs | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (date: Dayjs | null) => void;
  setFieldError: (field: keyof StepErrors, value: string | null) => void;
  phoneError: string | null;
  minDate: Dayjs;
  maxDate: Dayjs;
}

const PhoneAndDateOfBirthStep: FC<PhoneAndDateOfBirthStepProps> = ({
  phone,
  dateOfBirth,
  handleChange,
  handleChangeDate,
  setFieldError,
  phoneError,
  minDate,
  maxDate
}) => {
  const phoneField = 'phone';
  const [error, setError] = useState<DateValidationError | null>(null);

  const handleDateError = (error: DateValidationError | null) => {
    setError(error);
    setFieldError('dateOfBirth', error ? 'Fecha de nacimiento inválida' : null);
  };

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate': return 'Debes ser mayor de 15 años para registrarte.';
      case 'minDate': return 'La edad máxima es 100 años.';
      case 'invalidDate': return 'Por favor, selecciona una fecha válida.';
      default: return '';
    }
  }, [error]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <DatePicker
          autoFocus
          className='w-full'
          label="Fecha de Nacimiento"
          format='DD/MM/YYYY'
          minDate={minDate}
          maxDate={maxDate}
          value={dateOfBirth}
          onChange={handleChangeDate}
          onError={handleDateError}
          slotProps={{
            textField: {
              helperText: errorMessage,
            },
          }}
          sx={{ marginTop: 2 }}
        />
      </LocalizationProvider>
      <TextField
        required
        type='tel'
        autoComplete='tel'
        label="Teléfono"
        name={phoneField}
        value={phone}
        onChange={handleChange}
        error={!!phoneError}
        helperText={phoneError}
        fullWidth
        margin="normal"
      />
    </div>
  );
}

export default PhoneAndDateOfBirthStep;