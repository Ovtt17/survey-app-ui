import { AuthenticationResponse } from "../types/authenticationResponse";
import { NewUser } from "../types/user";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (usernameOrEmail: string, password: string): Promise<AuthenticationResponse> => {
  const data = { usernameOrEmail, password };

  try {
    const response = await fetch(`${BASE_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const authResponse: AuthenticationResponse = await response.json();
      localStorage.setItem('token', authResponse.token);
      console.log(authResponse);
      console.log(authResponse.user.profilePictureUrl);
      return authResponse;
    } else {
      throw new Error('Login failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const registerUser = async (user: NewUser): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Registration failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const activateUser = async (token: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/activate-account?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Activation failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}