import { User } from "../types/user";
import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

export const getUser = async (): Promise<User> => {
  try {
    const response = await fetch(BASE_URL + '/me', {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}