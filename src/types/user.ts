import { Dayjs } from "dayjs";

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePictureUrl: string;
}

export interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs | null;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}