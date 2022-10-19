import { Router } from 'express';

import RouteAdapter from '../adapters/express/RouteAdapter';
import GetAllMatchesControllerFactory from '../factories/GetAllMatchesControllerFactory';
import CreateMatchControllerFactory from '../factories/CreateMatchControllerFactory';
import FinishMatchControllerFactory from '../factories/FinishMatchControllerFactory';
import UpdateMatchGoalsControllerFactory from '../factories/UpdateMatchGoalsControllerFactory';
import auth from '../middlewares/auth';

const router = Router();
const getAllMatchesController = GetAllMatchesControllerFactory.make();
const createMatchController = CreateMatchControllerFactory.make();
const finishMatchController = FinishMatchControllerFactory.make();
const updateMatchGoalsController = UpdateMatchGoalsControllerFactory.make();

router.get('/', RouteAdapter.adapt(getAllMatchesController));
router.post('/', auth, RouteAdapter.adapt(createMatchController));
router.patch('/:id/finish', auth, RouteAdapter.adapt(finishMatchController));
router.patch('/:id/', auth, RouteAdapter.adapt(updateMatchGoalsController));

export default router;
