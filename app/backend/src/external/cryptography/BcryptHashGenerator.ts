import { genSaltSync, hashSync } from 'bcryptjs';

import IHashGenerator from '../../services/interfaces/IHashGenerator';
import Password from '../../entities/user/value-objects/Password';

export default class BcryptHashGenerator implements IHashGenerator {
  private readonly saltRounds = 8;

  generate(password: Password): string {
    const salt = genSaltSync(this.saltRounds);
    const hash = hashSync(password.value, salt);

    return hash;
  }
}
