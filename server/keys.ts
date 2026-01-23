import dotenv from 'dotenv';
dotenv.config();

export const { PORT = '', MONGO_URL = '', SECRET_KEY = '', AUTH_TOKEN = '' } = process.env;
