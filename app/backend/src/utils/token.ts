import { sign, verify } from 'jsonwebtoken';

import User from '../entities/user/User';
import UserDTO from '../entities/user/dtos/UserDTO';
import InvalidTokenError from './errors/InvalidTokenError';

const SECRET = process.env.JWT_SECRET || 'secret';

export function generateToken(user: User): string {
  const userDTO: UserDTO = user.toUserDTO();

  delete userDTO.password;

  return sign(userDTO, SECRET);
}
export function decodeToken(token: string): User {
  let userDTO: UserDTO;

  try {
    userDTO = verify(token, SECRET) as UserDTO;
  } catch {
    throw new InvalidTokenError();
  }

  return User.create(userDTO);
}
