import { Router } from 'express';

import RouteAdapter from '../adapters/express/RouteAdapter';
import GetAllMatchesControllerFactory from '../factories/GetAllMatchesControllerFactory';

const router = Router();
const getAllMatchesController = GetAllMatchesControllerFactory.make();

router.get('/', RouteAdapter.adapt(getAllMatchesController));

export default router;
