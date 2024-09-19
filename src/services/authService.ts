import { AuthenticationResponse } from "../types/authenticationResponse";
import { NewUser } from "../types/user";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

const getJsonHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

export const login = async (usernameOrEmail: string, password: string): Promise<AuthenticationResponse> => {
  const data = { usernameOrEmail, password };

  try {
    const response = await fetch(`${BASE_URL}/authenticate`, {
      method: 'POST',
      headers: getJsonHeaders(),
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
    const formData = new FormData();
    Object.keys(user).forEach(key => {
      const value = (user as any)[key];
      formData.append(key, value);
    });
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      body: formData
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
      headers: getJsonHeaders()
    });
    if (!response.ok) {
      throw new Error('Activation failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export const checkExistingEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(BASE_URL + '/email/' + email, {
      method: 'GET',
      headers: getJsonHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to check email existence: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while checking if email already exists:', error);
    throw new Error('An error occurred while checking for existing email. Please try again later.');
  }
}

export const checkExistingUsername = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(BASE_URL + '/username/' + username, {
      method: 'GET',
      headers: getJsonHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to check username existence: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while checking if username already exists:', error);
    throw new Error('An error occurred while checking for existing username. Please try again later.');
  }
}