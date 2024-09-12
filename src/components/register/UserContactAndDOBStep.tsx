import { TextField } from '@mui/material';
import React, { FC } from 'react';

interface UserContactAndDOBStepProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserContactAndDOBStep: FC<UserContactAndDOBStepProps> = ({ handleChange }) => {
  return (
    <div className="container mt-4">
      <div className="item w-full p-2">
        <TextField
          id="dob-day"
          label="Día"
          variant="outlined"
          name="dobDay"
          required
          className="w-full"
          inputProps={{ min: 1, max: 31 }}
          onChange={handleChange}
        />
      </div>
      <div className="item w-full p-2">
        <TextField
          id="dob-month"
          label="Mes"
          variant="outlined"
          name="dobMonth"
          select
          required
          className="w-full"
          SelectProps={{
            native: true,
          }}
          onChange={handleChange}
        >
          <option value="" disabled>
            Selecciona un mes
          </option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </TextField>
      </div>
      <div className="item w-full p-2">
        <TextField
          id="dob-year"
          label="Año"
          variant="outlined"
          name="dobYear"
          required
          className="w-full"
          inputProps={{ min: 1900, max: new Date().getFullYear() }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default UserContactAndDOBStep;