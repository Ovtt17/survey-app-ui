import { Alert, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { registerUser } from '../../services/authService';
import { NewUser } from '../../types/user';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface RegisterProps { }

const Register: FC<RegisterProps> = ({ }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<NewUser>({
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    phone: 0,
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setFormData({
        ...formData,
        dateOfBirth: date.toDate(),
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      await registerUser(formData);
      navigate('/activate-account');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Crear Cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                name="firstName"
                type="text"
                required
                className="w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                name="lastName"
                type="text"
                required
                className="w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full"
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                className="w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                name="phone"
                type="tel"
                required
                className="w-full"
                value={formData.phone}
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-full"
                  label="Date of Birth"
                  value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </div>

            {errorMessage && (
              <Alert severity="error" className="mb-4">
                {errorMessage}
              </Alert>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
