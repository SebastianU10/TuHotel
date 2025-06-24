import { Router, } from 'express';
import { body, param, } from 'express-validator';

import {
  createReservation,
  cancelReservation,
  getAllReservationsByUser,
  getReservedDates,
} from '../controllers/reservation.controller.js';
import validatorMiddleware from '../middlewares/validator.middleware.js';

const reservationRouter = Router();

reservationRouter.post(
  '/',  
  [
    body('date')
      .notEmpty()
      .isISO8601()
      .toDate(),
    body('nightsQuantity')
      .notEmpty()
      .isInt()
      .toInt(),
    body('roomId')
      .notEmpty()
      .isUUID(),
  ],
  validatorMiddleware,
  createReservation
);

reservationRouter.get('/myreservations', getAllReservationsByUser);

reservationRouter.delete(
  '/:id', 
  [
    param('id')
      .notEmpty()
      .isUUID(),
  ],
  validatorMiddleware,
  cancelReservation
);

reservationRouter.get('/:roomId/', getReservedDates);

export default reservationRouter;