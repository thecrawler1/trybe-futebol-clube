import IController from '../controllers/interfaces/IController';
import GetAllTeamsRepository from '../external/repositories/sequelize/GetAllTeamsRepository';
import GetAllTeamsService from '../services/GetAllTeamsService';
import GetAllTeamsController from '../controllers/GetAllTeamsController';

export default class GetAllTeamsControllerFactory {
  static make(): IController {
    const repository = new GetAllTeamsRepository();
    const service = new GetAllTeamsService(repository);
    const controller = new GetAllTeamsController(service);

    return controller;
  }
}
