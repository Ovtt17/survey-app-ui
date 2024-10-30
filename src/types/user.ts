import { Dayjs } from "dayjs";

interface BaseUser {
  username: string;
  firstName: string;
  lastName: string;
}

export interface User extends BaseUser {
  fullName: string;
  profilePictureUrl: string;
}

export interface NewUser extends BaseUser {
  dateOfBirth: Dayjs | null;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}