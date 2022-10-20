import IController from '../controllers/interfaces/IController';
import GetLeaderboardsRepo from '../external/repositories/sequelize/GetLeaderboardsRepository';
import GetLeaderboardsService from '../services/GetLeaderboardsService';
import GetLeaderboardsController from '../controllers/GetLeaderboardsController';

export default class GetLeaderboardsControllerFactory {
  static make(): IController {
    const repository = new GetLeaderboardsRepo();
    const service = new GetLeaderboardsService(repository);
    const controller = new GetLeaderboardsController(service);

    return controller;
  }
}
