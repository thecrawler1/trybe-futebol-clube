import { StatusCodes } from 'http-status-codes';

import IResponse from '../interfaces/IResponse';

export function ok(data: any): IResponse {
  return { statusCode: StatusCodes.OK, data };
}

export function created(data: any): IResponse {
  return { statusCode: StatusCodes.CREATED, data };
}
