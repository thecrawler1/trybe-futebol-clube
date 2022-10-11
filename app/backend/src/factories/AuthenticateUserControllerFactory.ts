import IController from '../controllers/interfaces/IController';
import GetUserByEmailRepository from '../external/repositories/sequelize/GetUserByEmailRepository';
import BcryptHashComparer from '../external/cryptography/BcryptHashComparer';
import AuthenticateUserService from '../services/AuthenticateUserService';
import AuthenticateUserController from '../controllers/AuthenticateUserController';

export default class AuthenticateUserControllerFactory {
  static make(): IController {
    const repository = new GetUserByEmailRepository();
    const hashComparer = new BcryptHashComparer();
    const service = new AuthenticateUserService(repository, hashComparer);
    const controller = new AuthenticateUserController(service);

    return controller;
  }
}
