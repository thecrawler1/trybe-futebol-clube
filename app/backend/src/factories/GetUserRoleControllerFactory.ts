import IController from '../controllers/interfaces/IController';
import GetUserRoleController from '../controllers/GetUserRoleController';

export default class GetUserRoleCOntrollerFactory {
  static make(): IController {
    return new GetUserRoleController();
  }
}
