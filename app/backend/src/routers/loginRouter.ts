import { Router } from 'express';

import RouteAdapter from '../adapters/express/RouteAdapter';
import AuthenticateUserControllerFactory from '../factories/AuthenticateUserControllerFactory';
import GetUserRoleCOntrollerFactory from '../factories/GetUserRoleControllerFactory';
import auth from '../middlewares/auth';

const router = Router();
const authenticateUserController = AuthenticateUserControllerFactory.make();
const getUserRoleController = GetUserRoleCOntrollerFactory.make();

router.post('/', RouteAdapter.adapt(authenticateUserController));
router.get('/validate', auth, RouteAdapter.adapt(getUserRoleController));

export default router;
