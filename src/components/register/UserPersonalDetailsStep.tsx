import { TextField } from '@mui/material';
import { FC } from 'react';

interface UserPersonalDetailsStepProps {
  firstName: string;
  lastName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldErrors: { firstName: boolean; lastName: boolean };
}

const UserPersonalDetailsStep: FC<UserPersonalDetailsStepProps> = ({
  firstName,
  lastName,
  handleChange,
  fieldErrors,
}) => {
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
    </div>
  );
};

export default UserPersonalDetailsStep;