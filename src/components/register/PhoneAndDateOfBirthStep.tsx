import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { newUserValidationRules } from '../../data/newUserValidationRules';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

const PhoneAndDateOfBirthStep = () => {
  const minDate = dayjs().subtract(100, 'year');
  const maxDate = dayjs().subtract(15, 'year');
  const { register, control, formState: { errors } } = useFormContext();
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
      <div>
        <label htmlFor="given-name" className="block mb-2 text-sm font-medium text-gray-900">
          Teléfono
        </label>
        <input
          type="tel"
          id="tel"
          {...register('phone', newUserValidationRules.phone)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="87227697"
          required
          autoComplete="tel"
        />
        {errors.phone && <span className="text-red-500">{String(errors.phone.message)}</span>}
      </div>
    </>
  );
}

export default PhoneAndDateOfBirthStep;