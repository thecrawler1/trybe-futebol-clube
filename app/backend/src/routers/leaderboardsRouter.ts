import { Router } from 'express';

import RouteAdapter from '../adapters/express/RouteAdapter';
import GetLeaderboardsControllerFactory from '../factories/GetLeaderboardsControllerFactory';

const router = Router();
const getLeaderboardsController = GetLeaderboardsControllerFactory.make();

router.get('/', RouteAdapter.adapt(getLeaderboardsController));
router.get('/:homeOrAwayTeam', RouteAdapter.adapt(getLeaderboardsController));

export default router;
