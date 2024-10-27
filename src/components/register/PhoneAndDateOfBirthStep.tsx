import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { newUserValidationRules } from '../../data/newUserValidationRules';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import UserInputField from './UserInputField';


const PhoneAndDateOfBirthStep = () => {
  const minDate = dayjs().subtract(100, 'year');
  const maxDate = dayjs().subtract(15, 'year');
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <Controller
          name="dateOfBirth"
          control={control}
          rules={newUserValidationRules.dateOfBirth}
          render={({ field }) => (
            <DatePicker
              {...field}
              autoFocus
              className='w-full'
              label="Fecha de Nacimiento"
              format='DD/MM/YYYY'
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => field.onChange(date)}
              value={field.value || null}
            />
          )}
        />
      </LocalizationProvider>
      {errors.dateOfBirth && <span className="text-red-500">{String(errors.dateOfBirth.message)}</span>}
      <UserInputField
        id="phone"
        type='tel'
        label="Teléfono"
        placeholder="Ingrese su número de teléfono"
        validationRules={newUserValidationRules.phone}
        autoComplete="tel"
      />
    </>
  );
}

export default PhoneAndDateOfBirthStep;