import { StatusCodes } from 'http-status-codes';

import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);

    this.name = 'NotFoundError';
  }
}
