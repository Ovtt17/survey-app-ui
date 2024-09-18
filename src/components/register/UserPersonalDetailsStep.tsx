import { FC, useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import "dayjs/locale/es";
import { TextField } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers/models';
import { FieldErrorsHandler } from '../../pages/Register';


interface UserPersonalDetailsStepProps {
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (date: Dayjs | null) => void;
  fieldErrorsHandler: FieldErrorsHandler;
  minDate: Dayjs;
  maxDate: Dayjs;
}

const UserPersonalDetailsStep: FC<UserPersonalDetailsStepProps> = ({
  firstName,
  lastName,
  dateOfBirth,
  handleChange,
  handleChangeDate,
  fieldErrorsHandler,
  minDate,
  maxDate
}) => {

  const [error, setError] = useState<DateValidationError | null>(null);

  const { fieldErrors, setFieldError } = fieldErrorsHandler;

  const handleDateError = (error: DateValidationError | null) => {
    setError(error);
    setFieldError('dateOfBirth', !!error);

  };

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Por favor, selecciona una fecha entre 15 y 100 años de edad';
      }

      case 'invalidDate': {
        return 'Por favor, selecciona una fecha válida';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  return (
    <div>
      <TextField
        label="Nombre"
        name="firstName"
        value={firstName}
        onChange={handleChange}
        error={fieldErrors.firstName}
        helperText={fieldErrors.firstName ? 'Este campo es obligatorio' : ''}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Apellido"
        name="lastName"
        value={lastName}
        onChange={handleChange}
        error={fieldErrors.lastName}
        helperText={fieldErrors.lastName ? 'Este campo es obligatorio' : ''}
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