import { FC } from 'react';
import "dayjs/locale/es";
import { TextField } from '@mui/material';
import ErrorHelperText from '../error/ErrorHelperText';


interface PersonalDetailsStepProps {
  firstName: string;
  lastName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  firstNameError: string | null;
  lastNameError: string | null;
}

const PersonalDetailsStep: FC<PersonalDetailsStepProps> = ({
  firstName,
  lastName,
  handleChange,
  firstNameError,
  lastNameError,
  
}) => {
  const firstNameField = 'firstName';
  const lastNameField = 'lastName';
  return (
    <div>
      <TextField
        required
        autoFocus
        type='text'
        autoComplete='given-name'
        label="Nombre"
        name={firstNameField}
        value={firstName}
        onChange={handleChange}
        error={!!firstNameError}
        helperText={firstNameError ? <ErrorHelperText errorMessage={firstNameError} /> : null}
        fullWidth
        margin="normal"
      />
      <TextField
        required
        type='text'
        autoComplete='family-name'
        label="Apellido"
        name={lastNameField}
        value={lastName}
        onChange={handleChange}
        error={!!lastNameError}
        helperText={lastNameError ? <ErrorHelperText errorMessage={lastNameError} /> : null}
        fullWidth
        margin="normal"
      />
    </div>
  );
};

export default PersonalDetailsStep;