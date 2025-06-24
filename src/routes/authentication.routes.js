import { Router, } from 'express';
import { body, } from 'express-validator';

import { 
  login, 
  signup, 
} from '../controllers/authentication.controller.js';

import validatorMiddleware from '../middlewares/validator.middleware.js';

// Paso 1. Crear el router
const authenticationRouter = Router();

// Paso 2. Definir rutas
authenticationRouter.post(
  '/login',
  [
    body('email')
      .isString()
      .notEmpty(), 
    body('password')
      .isString()
      .notEmpty(),
  ],
  validatorMiddleware,
  login,
);

authenticationRouter.post(
  '/signup', 
  [
    body('email')
      .notEmpty()
      .isString()
      .isEmail(),
    body('password')
      .notEmpty()
      .isString()
      .isStrongPassword(),
    body('name')
      .isString()
      .notEmpty(),
  ],
  validatorMiddleware,
  signup
);

// Paso 3. Exportar el Router.
export default authenticationRouter;