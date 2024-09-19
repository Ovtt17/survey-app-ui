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
  dateOfBirth?: Date;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}