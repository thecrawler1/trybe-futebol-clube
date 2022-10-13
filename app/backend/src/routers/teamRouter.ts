import { Router } from 'express';

import RouteAdapter from '../adapters/express/RouteAdapter';
import GetAllTeamsControllerFactory from '../factories/GetAllTeamsControllerFactory';
import GetTeamByIdControllerFactory from '../factories/GetTeamByIdControllerFactory';

const router = Router();
const getAllTeamsController = GetAllTeamsControllerFactory.make();
const getTeamByIdController = GetTeamByIdControllerFactory.make();

router.get('/', RouteAdapter.adapt(getAllTeamsController));
router.get('/:id', RouteAdapter.adapt(getTeamByIdController));

export default router;
