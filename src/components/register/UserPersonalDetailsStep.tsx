import { FC, useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import "dayjs/locale/es";
import { TextField } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers/models';
import { StepErrors } from '../../pages/Register';

interface UserPersonalDetailsStepProps {
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (date: Dayjs | null) => void;
  firstNameError: boolean;
  lastNameError: boolean;
  setFieldError: (field: keyof StepErrors, value: boolean) => void;
  minDate: Dayjs;
  maxDate: Dayjs;
}

const UserPersonalDetailsStep: FC<UserPersonalDetailsStepProps> = ({
  firstName,
  lastName,
  dateOfBirth,
  handleChange,
  handleChangeDate,
  firstNameError,
  lastNameError,
  setFieldError,
  minDate,
  maxDate
}) => {

  const [error, setError] = useState<DateValidationError | null>(null);

  const handleDateError = (error: DateValidationError | null) => {
    setError(error);
    setFieldError('dateOfBirth', true);
  };

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': return 'Solo se permiten edades entre 15 y 100 años.';
      case 'invalidDate': return 'Por favor, selecciona una fecha válida.';
      default: return '';
    }
  }, [error]);

  return (
    <div>
      <TextField
        label="Nombre"
        name="firstName"
        value={firstName}
        onChange={handleChange}
        error={firstNameError}
        onError={() => setFieldError('firstName', true)}
        helperText={firstNameError ? 'Este campo es obligatorio' : ''}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Apellido"
        name="lastName"
        value={lastName}
        onChange={handleChange}
        error={lastNameError}
        onError={() => setFieldError('lastName', true)}
        helperText={lastNameError ? 'Este campo es obligatorio' : ''}
        fullWidth
        margin="normal"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <DatePicker
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
    </div>
  );
};

export default UserPersonalDetailsStep;