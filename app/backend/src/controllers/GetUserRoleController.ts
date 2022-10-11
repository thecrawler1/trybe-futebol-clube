import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import User from '../entities/user/User';
import { ok } from './util/httpControllerResponses';

export default class GetUserRoleController implements IController {
  private user: User;

  async handle(request: IRequest): Promise<IResponse> {
    this.user = User.create(request.payload.user);

    const role = this.user.role.value;

    return ok({ role });
  }
}
