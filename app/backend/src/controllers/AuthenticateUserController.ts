import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IAuthenticateUserService from '../services/interfaces/IAuthenticateUserService';
import Email from '../entities/user/value-objects/Email';
import Password from '../entities/user/value-objects/Password';
import ValidationError from '../errors/ValidationError';
import { ok } from './util/httpControllerResponses';

export default class AuthenticateUserController implements IController {
  constructor(private authenticateUser: IAuthenticateUserService) {}

  async handle(request: IRequest): Promise<IResponse> {
    AuthenticateUserController.validateIfEmailAndPasswordWereProvided(request);

    const email = Email.create(request.payload.email);
    const password = Password.create(request.payload.password);
    const { token } = await this.authenticateUser.perform(email, password);

    return ok({ token });
  }

  private static validateIfEmailAndPasswordWereProvided(request: IRequest): void {
    const { payload } = request;
    const hasEmail = !!payload.email;
    const hasPassword = !!payload.password;

    if (!hasEmail || !hasPassword) throw new ValidationError('All fields must be filled');
  }
}
