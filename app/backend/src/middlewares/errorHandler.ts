import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import HttpError from '../errors/HttpError';

const errorHandler: ErrorRequestHandler = async (error, _req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }

  next();
};

export default errorHandler;
