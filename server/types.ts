export interface IUserRegistration {
  full_name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}


export interface IT2ImageTransactionID {
  status: boolean;
  inference_id: string | null;
}