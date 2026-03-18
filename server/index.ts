import express from 'express';
import { MONGO_URL, PORT } from './keys';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import ErrorHandler from './src/middleware/ErrorHandler';
import { router } from './src/controller';
import path from 'path';

const app = express();

app.use(
  cors({
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
    ],
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
    preflightContinue: false,
  })
);
// Handle preflight OPTIONS requests explicitly for Cloudflare compatibility
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.sendStatus(200);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve persisted generated images (Option A)
app.use('/generated', express.static(path.join(process.cwd(), 'public', 'generated')));

// Support both legacy routes (/auth, /generation, ...) and versioned routes (/api/v1/*)
app.use('/api/v1', router);
app.use(router);
app.use(ErrorHandler);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to DB'))
  .catch((err: Error) => console.log(err));

const port = PORT;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
