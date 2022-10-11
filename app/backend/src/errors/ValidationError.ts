import { StatusCodes } from 'http-status-codes';

import HttpError from './HttpError';

export default class ValidationError extends HttpError {
  constructor(message = 'Some field is invalid') {
    super(message, StatusCodes.BAD_REQUEST);

    this.name = 'ValidationError';
  }
}
