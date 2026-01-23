import { AUTH_TOKEN } from '../keys';

export const REGISTRATION_MESSAGES = {
  NO_PASS: 'Password is required!',
  NO_EMAIL: 'Email is required!',
  NO_FULLNAME: 'Full name is required!',
  EMAIL_EXISTS: 'User with this email already exists!',
  SUCCESS: 'User successfully created!',
  CATCH: "Can't create new user, please try again later!",
};

export const LOGIN_MESSAGES = {
  NO_PASS: 'Password is required!',
  NO_EMAIL: 'Email is required!',
  EMAIL_NOT_EXISTS: 'User with this email doesnt exists, please register first!',
  SUCCESS: 'User successfully loged in!',
  CATCH: 'Password is not correct!',
};

export const DEFAULT_CATCH_MESSAGE = "Something wen't wrong, please try again later!";


export const TEXT_2_IMAGE_BODY = {
  width: 1024,
  height: 1024,
  model: 'urn:air:picsart:model:picsart:fluxt2i@1',
  count: 1
}


export const SERVICE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PROCESSING: 'processing',
  QUEUED: 'queued',
}


export const BASE_URL = 'https://genai-api.picsart.io/v1';


export const DEFAULT_HEADERS = {
  'accept': 'application/json',
  'content-type': 'application/json',
  'X-Picsart-API-Key': AUTH_TOKEN,
}