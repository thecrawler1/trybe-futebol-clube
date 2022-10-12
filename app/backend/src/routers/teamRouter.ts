import { Router } from 'express';

import RouteAdapter from '../adapters/express/RouteAdapter';
import GetAllTeamsControllerFactory from '../factories/GetAllTeamsControllerFactory';

const router = Router();
const getAllTeamsController = GetAllTeamsControllerFactory.make();

router.get('/', RouteAdapter.adapt(getAllTeamsController));

export default router;
