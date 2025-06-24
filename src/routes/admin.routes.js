import { Router, } from 'express';

import {
  createHotel,
  updateHotel,
  deleteHotel,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/admin.controller.js';

const router = Router();

// Crear hoteles
router.post('/hotels', createHotel);

// Actualizar hoteles
router.put('/hotels/:id', updateHotel);

// Eliminar hoteles
router.delete('/hotels/:id', deleteHotel);

// Crear habitaciones
router.post('/rooms', createRoom);

// Actualizar habitaciones
router.put('/updateRooms/:id', updateRoom);

// Eliminar habitaciones
router.delete('/deleteRooms/:id', deleteRoom);

export default router;