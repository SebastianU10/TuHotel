import { Router, } from 'express';

import { 
  getAllUsers, 
  isUserAdmin,
} from '../controllers/users.controller.js';

import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const usersRouter = Router();

// Forma 3. Pasarle el middleware a la ruta especifica que queremos proteger.
// usersRouter.get('/', authenticationMiddleware, getAllUsers);
usersRouter.get('/', authenticationMiddleware, getAllUsers);

usersRouter.post(
  '/admin', 
  authenticationMiddleware,
  isUserAdmin,
);

export default usersRouter;