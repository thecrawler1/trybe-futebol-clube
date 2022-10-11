import { sign, decode } from 'jsonwebtoken';

import User from '../../entities/user/User';
import UserDTO from '../../entities/user/dtos/UserDTO';

const SECRET = process.env.JWT_SECRET || 'secret';

export function generateToken(user: User): string {
  const userDTO: UserDTO = user.toUserDTO();

  delete userDTO.password;

  return sign(userDTO, SECRET);
}
export function decodeToken(token: string): User {
  const userDTO = decode(token) as UserDTO;

  return User.create(userDTO);
}
