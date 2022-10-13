import IController from '../controllers/interfaces/IController';
import GetTeamByIdRepository from '../external/repositories/sequelize/GetTeamByIdRepository';
import GetTeamByIdService from '../services/GetTeamByIdService';
import GetTeamByIdController from '../controllers/GetTeamByIdController';

export default class GetTeamByIdControllerFactory {
  static make(): IController {
    const repository = new GetTeamByIdRepository();
    const service = new GetTeamByIdService(repository);
    const controller = new GetTeamByIdController(service);

    return controller;
  }
}
