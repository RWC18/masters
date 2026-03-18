import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || '';
export const MONGO_URL = process.env.MONGO_URL || '';
export const SECRET_KEY = process.env.SECRET_KEY || '';
export const AUTH_TOKEN = process.env.AUTH_TOKEN || '';
export const AI_API_URL = process.env.AI_API_URL || '';
// Back-compat: some envs used API_AUTH
export const AI_AUTH = process.env.AI_AUTH || process.env.API_AUTH || '';
export const X_APP_AUTH = process.env.X_APP_AUTH || '';
