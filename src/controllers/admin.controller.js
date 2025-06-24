import { randomUUID, } from 'crypto';

import { Room, Hotel, } from '../db/models/index.js';
import {updateHotelBestPrice} from '../controllers/room.controller.js';

export const createHotel = async (req, res) => {
  const {
    name,
  } = req.body;

  try {
    const hotelByName = await Hotel.findOne({
      where: {
        name,
      },
    });
    if (hotelByName) {
      return res
      .status(400)
      .json({
        success: false,
        message: 'Ya existe un hotel con el mismo nombre',
      });
    }
    
    const uuid = randomUUID();

    await Hotel.create({
      id: uuid,
      ...req.body,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: 'Se ha creado el hotel',
      });
  } catch {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
};

export const updateHotel = async (req, res) => {
  const id = req.params['id'];

  try {
    const hotelById = await Hotel.findOne({
      where: { 
        id, 
      },
    });
    if (!hotelById) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'El hotel a actualizar no existe',
        });
    }

    const updatedHotel = {
      ...hotelById,
      ...req.body,
    };

    await Hotel.update({
      ...updatedHotel,
    }, {
      where: {
        id,
      },
    });

    return res
      .status(201)
      .json({
        success: true,
        message: `Se ha actualizado el hotel ${id}`,
        data: {
          ...updatedHotel,
        },
      });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
};

export const deleteHotel = async (req, res) => {
  const id = req.params['id'];

  try {
    const hotelById = await Hotel.findOne({
      where: { 
        id, 
      },
    });
    if (!hotelById) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'El hotel a actualizar no existe',
        });
    }

    // 1. Opcion: Borrado fisico
    // DELETE FROM Hotels WHERE id = $id;
    // await Hotel.destroy({
    //   where: {
    //     id,
    //   },
    // });

    // 2. Opcion: Borrado logico
    await Hotel.update({
      isActive: false,
    }, {
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        message: `Se ha eliminado el hotel ${id}`,
      });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
};

export const createRoom = async (req, res) => {
  const { codeName, hotelId } = req.body;

  try {
    const hotelById = await Hotel.findOne({ where: { id: hotelId } });
    if (!hotelById) {
      return res.status(400).json({
        success: false,
        message: 'No existe el hotel a cual quiere relacionar la habitacion',
      });
    }

    const roomByCodeName = await Room.findOne({ where: { codeName } });
    if (roomByCodeName) {
      return res.status(400).json({
        success: false,
        message: 'Ya hay una habitacion creada con el nombre clave',
      });
    }

    const uuid = randomUUID();
    await Room.create({
      id: uuid,
      ...req.body,
      HotelId: hotelId,
    });

    // Actualizar el bestPrice del hotel
    await updateHotelBestPrice(hotelId);

    return res.status(201).json({
      success: true,
      message: `Se ha creado la habitacion para el hotel ${hotelId}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const updateRoom = async (req, res) => {
  const id = req.params['id'];

  try {
    const roomById = await Room.findOne({ where: { id } });
    if (!roomById) {
      return res.status(404).json({
        success: false,
        message: 'La habitacion a actualizar no existe',
      });
    }

    const updatedRoom = {
      ...roomById,
      ...req.body,
    };

    await Room.update({ ...updatedRoom }, { where: { id } });

    // Actualizar el bestPrice del hotel
    await updateHotelBestPrice(roomById.hotelId);

    return res.status(201).json({
      success: true,
      message: `Se ha actualizado la habitacion ${id}`,
      data: { ...updatedRoom },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const deleteRoom = async (req, res) => {
  const id = req.params['id'];

  try {
    const roomById = await Room.findOne({ where: { id } });
    if (!roomById) {
      return res.status(404).json({
        success: false,
        message: 'La habitacion ya fue borrada previamente o no existe',
      });
    }

    await Room.destroy({ where: { id } });

    // Actualizar el bestPrice del hotel
    await updateHotelBestPrice(roomById.hotelId);

    return res.status(200).json({
      success: true,
      message: `Se ha eliminado la habitacion ${id}`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
