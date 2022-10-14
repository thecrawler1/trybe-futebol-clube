import IController from '../controllers/interfaces/IController';
import FinishMatchRepository from '../external/repositories/sequelize/FinishMatchRepository';
import GetMatchByIdRepository from '../external/repositories/sequelize/GetMatchByIdRepository';
import FinishMatchService from '../services/FinishMatchService';
import FinishMatchController from '../controllers/FinishMatchController';

export default class FinishMatchControllerFactory {
  static make(): IController {
    const finishMatchRepository = new FinishMatchRepository();
    const getMatchByIdRepository = new GetMatchByIdRepository();
    const service = new FinishMatchService(finishMatchRepository, getMatchByIdRepository);
    const controller = new FinishMatchController(service);

    return controller;
  }
}
