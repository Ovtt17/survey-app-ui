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
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('An error occurred while fetching user data. Please try again later.');
  }
};

export const getUserByUsername = async (username: string): Promise<User> => {
  try {
    const response = await fetch(BASE_URL + `/${username}`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (response.status === 404) {
      throw new Error(`User ${username} not found`);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch data for user ${username}: ${response.statusText}`);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error(`Error fetching data for user ${username}:`, error);
    throw new Error(`An error occurred while fetching data for user ${username}. Please try again later.`);
  }
};