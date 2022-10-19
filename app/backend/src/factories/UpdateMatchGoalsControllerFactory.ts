import IController from '../controllers/interfaces/IController';
import UpdateMatchGoalsRepo from '../external/repositories/sequelize/UpdateMatchGoalsRepository';
import GetMatchByIdRepo from '../external/repositories/sequelize/GetMatchByIdRepository';
import Service from '../services/UpdateMatchGoalsService';
import Controller from '../controllers/UpdateMatchGoalsController';

export default class UpdateMatchGoalsControllerFactory {
  static make(): IController {
    const updateMatchGoalsRepo = new UpdateMatchGoalsRepo();
    const getMatchByIdRepo = new GetMatchByIdRepo();
    const service = new Service(updateMatchGoalsRepo, getMatchByIdRepo);
    const controller = new Controller(service);

    return controller;
  }
}
