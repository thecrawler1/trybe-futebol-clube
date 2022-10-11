import * as bcrypt from 'bcryptjs';

import IHashComparer from '../../services/interfaces/IHashComparer';
import Password from '../../entities/user/value-objects/Password';

export default class BcryptHashComparer implements IHashComparer {
  private _compare = bcrypt.compareSync;

  compare(password: Password, hash: string): boolean {
    return this._compare(password.value, hash);
  }
}
