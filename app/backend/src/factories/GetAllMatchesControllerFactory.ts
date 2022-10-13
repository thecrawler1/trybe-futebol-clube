import IController from '../controllers/interfaces/IController';
import GetAllMatchesRepository from '../external/repositories/sequelize/GetAllMatchesRepository';
import GetAllMatchesService from '../services/GetAllMatchesService';
import GetAllMatchesController from '../controllers/GetAllMatchesController';

export default class GetAllMathesControllerFactory {
  static make(): IController {
    const repository = new GetAllMatchesRepository();
    const service = new GetAllMatchesService(repository);
    const controller = new GetAllMatchesController(service);

    return controller;
  }
}
