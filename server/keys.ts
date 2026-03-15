import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT = '',
  MONGO_URL = '',
  SECRET_KEY = '',
  AUTH_TOKEN = '',
  AI_API_URL = '',
  AI_AUTH = '',
  X_APP_AUTH = '',
} = process.env;
