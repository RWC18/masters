export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegistration {
  full_name: string;
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  full_name: string;
  _id: string;
  credits?: number;
}