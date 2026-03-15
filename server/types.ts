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

export interface IAvatarRequest {
  image_url: string;
  prompt: string;
  count: number;
}

export interface ILogoGenRequest {
  brand_name: string;
  business_description: string;
  color_tone: string;
  count: number;
}