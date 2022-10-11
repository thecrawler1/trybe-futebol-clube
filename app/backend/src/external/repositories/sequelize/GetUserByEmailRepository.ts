import IGetUserByEmailRepository from '../../../services/interfaces/IGetUserByEmailRepository';
import UserModel from '../../../database/models/User';
import Email from '../../../entities/user/value-objects/Email';
import User from '../../../entities/user/User';

export default class GetUserByEmailRepository implements IGetUserByEmailRepository {
  private userModel = UserModel;

  async perform(email: Email): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email: email.value } });

    if (!user) return null;

    return User.create({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      passwordHash: user.password,
    });
  }
}
