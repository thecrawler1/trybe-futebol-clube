import IController from '../controllers/interfaces/IController';
import CreateMatchRepository from '../external/repositories/sequelize/CreateMatchRepository';
import GetTeamByIdRepository from '../external/repositories/sequelize/GetTeamByIdRepository';
import CreateMatchService from '../services/CreateMatchService';
import CreateMatchController from '../controllers/CreateMatchController';

export default class CreateMatchControllerFactory {
  static make(): IController {
    const createMatchRepository = new CreateMatchRepository();
    const getTeamByIdRepository = new GetTeamByIdRepository();
    const service = new CreateMatchService(createMatchRepository, getTeamByIdRepository);
    const controller = new CreateMatchController(service);

    return controller;
  }
}
