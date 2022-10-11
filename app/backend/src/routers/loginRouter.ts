import { Router } from 'express';

import AuthenticateUserControllerFactory from '../factories/AuthenticateUserControllerFactory';
import RouteAdapter from '../adapters/express/RouteAdapter';

const router = Router();
const authenticateUserController = AuthenticateUserControllerFactory.make();

router.post('/', RouteAdapter.adapt(authenticateUserController));

export default router;
