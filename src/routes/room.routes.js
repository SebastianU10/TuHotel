import { Router, } from 'express';

import { getAllRooms, getRoomById } from '../controllers/room.controller.js';

const roomRouter = Router();

roomRouter.get('/:roomId', getRoomById);

roomRouter.get('/', getAllRooms);
export default roomRouter;