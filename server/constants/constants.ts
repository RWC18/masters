import { AUTH_TOKEN, AI_API_URL, AI_AUTH, X_APP_AUTH } from '../keys';

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
  count: 4,
};

export const DEFAULT_NEGATIVE_PROMPT =
  'bad anatomy, bad proportions, blurry, cloned face, cropped, deformed, dehydrated, disfigured, duplicate, error, extra arms, extra fingers, extra legs, extra limbs, fused fingers, gross proportions, jpeg artifacts, long neck, low quality, lowres, malformed limbs, missing arms, missing legs, morbid, mutated hands, mutation, mutilated, out of frame, poorly drawn face, poorly drawn hands, signature, text, too many fingers, ugly, username, watermark, worst quality';

export const AVATAR_BASE_URL = 'https://genai-avatars-api.picsart.io/v1/avatars/instant';

export const SERVICE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PROCESSING: 'processing',
  QUEUED: 'queued',
};

export const BASE_URL = 'https://genai-api.picsart.io/v1';

export const DEFAULT_HEADERS = {
  accept: 'application/json',
  'content-type': 'application/json',
  'X-Picsart-API-Key': AUTH_TOKEN,
};

export const AI_API_HEADERS = {
  'Content-Type': 'application/json',
  'x-app-authorization': `Bearer ${X_APP_AUTH}`,
  Authorization: `Bearer ${AI_AUTH}`,
  platform: 'website',
  aiTouchPoint: 'aiportal',
};

export const AI_API_BASE_URL = AI_API_URL;

export const LOGO_GEN_DEFAULT_MODEL = 'urn:air:fluxai:model:fluxai:flux-2-pro@1';