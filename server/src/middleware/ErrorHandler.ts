// packages
import { ErrorRequestHandler } from 'express';

// middleware
import { HttpError } from './httpError';

const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error && error instanceof HttpError) {
    res.status(error.status || 400).json({ msg: error.message, status: error.status });
  } else {
    res.status(500).json({ msg: 'Internal error' });
  }

  next(); // Ensure Express knows the request is handled
};

export default ErrorHandler;
