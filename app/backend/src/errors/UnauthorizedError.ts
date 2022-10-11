import { StatusCodes } from 'http-status-codes';

import HttpError from './HttpError';

export default class UnauthorizedError extends HttpError {
  constructor(message = 'Not authorized') {
    super(message, StatusCodes.UNAUTHORIZED);

    this.name = 'UnauthorizedError';
  }
}
