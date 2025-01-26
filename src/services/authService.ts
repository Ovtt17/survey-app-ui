import dayjs, { Dayjs } from "dayjs";
import { AuthenticationResponse } from "../types/authenticationResponse";
import { NewUser } from "../types/user";
import { handleErrorResponse } from "./handleErrorResponse";
import { ExceptionResponse } from "../types/ExceptionResponse";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

const getJsonHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const exception: ExceptionResponse = await response.json();
    throw new Error(exception.businessErrorDescription);
  }
  return response.json();
};

const toLocalDateString = (date: Dayjs | Date): string => {
  if (dayjs.isDayjs(date)) {
    date = date.toDate();
  }
  return date.toLocaleDateString('en-CA');
};

export const login = async (usernameOrEmail: string, password: string): Promise<AuthenticationResponse> => {
  const data = { usernameOrEmail, password };

  try {
    const response = await fetch(`${BASE_URL}/authenticate`, {
      method: 'POST',
      headers: getJsonHeaders(),
      body: JSON.stringify(data)
    });

    const authResponse: AuthenticationResponse = await handleResponse(response);
    localStorage.setItem('token', authResponse.token);
    return authResponse;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const registerUser = async (user: NewUser): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('dateOfBirth', user.dateOfBirth ? toLocalDateString(dayjs(user.dateOfBirth)) : '');
    formData.append('phone', user.phone);
    formData.append('email', user.email);
    formData.append('password', user.password);

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      await handleErrorResponse(response);
    }

    const isRegistered = await handleResponse(response);
    return isRegistered;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const activateUser = async (token: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/activate-account?token=${token}`, {
      method: 'GET',
      headers: getJsonHeaders()
    });

    await handleResponse(response);
  } catch (error) {
    console.error('Error during account activation:', error);
    throw error;
  }
};

export const checkExistingEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(BASE_URL + '/email/' + email, {
      method: 'GET',
      headers: getJsonHeaders()
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Error while checking if email already exists:', error);
    throw error;
  }
};

export const checkExistingUsername = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(BASE_URL + '/username/' + username, {
      method: 'GET',
      headers: getJsonHeaders()
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Error while checking if username already exists:', error);
    throw error;
  }
};