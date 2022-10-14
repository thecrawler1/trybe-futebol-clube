import { Router } from 'express';

import RouteAdapter from '../adapters/express/RouteAdapter';
import GetAllMatchesControllerFactory from '../factories/GetAllMatchesControllerFactory';
import CreateMatchControllerFactory from '../factories/CreateMatchControllerFactory';
import auth from '../middlewares/auth';

const router = Router();
const getAllMatchesController = GetAllMatchesControllerFactory.make();
const createMatchController = CreateMatchControllerFactory.make();

router.get('/', RouteAdapter.adapt(getAllMatchesController));
router.post('/', auth, RouteAdapter.adapt(createMatchController));

export default router;
