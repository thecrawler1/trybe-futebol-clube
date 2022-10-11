import { RequestHandler } from 'express';

import User from '../entities/user/User';
import TokenNotProvidedError from './errors/TokenNotProvidedError';
import { decodeToken } from '../utils/token';

const auth: RequestHandler = async (req, _res, next) => {
  if (!req.headers.authorization) {
    next(new TokenNotProvidedError());
    return;
  }

  const token = req.headers.authorization;
  const user: User = decodeToken(token);

  req.body.user = user.toUserDTO();

  next();
};

export default auth;
