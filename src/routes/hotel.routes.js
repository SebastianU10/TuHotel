import { Router, } from 'express';

import { getAllHotels, getHotelById } from '../controllers/hotel.controller.js';

const hotelRouter = Router();

hotelRouter.get('/', getAllHotels);

hotelRouter.get('/:id', getHotelById);

export default hotelRouter;