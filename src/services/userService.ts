import { User } from "../types/user";
import { getToken } from "../utils/auth";
import { fetchWithHandling } from "./networkService";

const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

export const getUser = async (): Promise<User> => {
  return await fetchWithHandling(BASE_URL + '/me', {
    method: 'GET',
    headers: getHeaders()
  });
};

export const getUserByUsername = async (username: string): Promise<User> => {
  return await fetchWithHandling(BASE_URL + `/${username}`, {
    method: 'GET',
    headers: getHeaders()
  });
};