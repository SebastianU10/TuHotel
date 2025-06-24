import { randomUUID } from 'crypto';
import {
  User,
  Reservation,
  Room,
} from '../db/models/index.js';

export const createReservation = async (req, res) => {
  const {
    date,
    status,
    nightsQuantity,
    total,
    roomId,
    } = req.body;

const userEmail = req.userEmail;


  try {
    const { id } = await User.findOne({
      attributes: ['id'],
      where: {
        email: userEmail,
      },
    });

    if (!id) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'User doesnt exists',
        });
    }

    if (nightsQuantity <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Nights cannot be less than 1',
        });
    }


    const room = await Room.findOne({ where: { id: roomId } });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    const existingReservation = await Reservation.findOne({
      where: {
        RoomId: roomId,
        date,
      },
    });

    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message: 'Room is already reserved for the selected date',
      });
    }
    console.log(req.body)
    console.log(id)

    await Reservation.create({
      id: randomUUID(),
      date,
      status,
      nightsQuantity,
      total,
      UserId: id,
      RoomId: roomId,
    });

    return res.status(201).json({
      success: true,
      message: 'Reservation created',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Something went wrong. Error: ${err.message}`,
    });
  }
};

export const cancelReservation = async (req, res) => {
  const { id, } = req?.params;
  if (!id) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Id is required',
      });
  }

  try {
    const now = new Date();

    const reservation = await Reservation.findOne({
      where: {
        id,
      },
    });

    if (!reservation) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Reservation doesnt exists',
        });
    }

    const reservationStartDate = new Date(reservation?.startDate);

    // Estan tratando de cancelar la reserva el mismo dia
    if (now.getDate() === reservationStartDate.getDate() || now.getTime() > reservationStartDate.getTime()) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Cannot cancel reservation at the same day',
        });
    }

    await Reservation.update({ 
      status: 'cancel'
    }, {
      where: {
        id,
      },
    });

    return res
      .status(201)
      .json({
        success: true,
        message: 'Reservation was canceled',
      });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: `Something went wrong. Error: ${err.message}`,
      });
  }
};

export const getAllReservationsByUser = async (req, res) => {
  const userEmail = req?.userEmail;

  try {
    const user = await User.findOne({
      attributes: ['id'],
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'User doesnt exists',
        });
    }

    const reservationsByUser = await Reservation.findAll({
      where: {
        UserId: user?.id,
      },
    });

    if (!reservationsByUser) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'There are not reservations',
        });
    }

    return res
      .status(200)
      .json({
        success: true,
        data: reservationsByUser,
      });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: `Something went wrong. Error: ${err.message}`,
      });
  }
};


export const getReservedDates = async (req, res) => {
  const { roomId } = req.params;

  try {
    const reservations = await Reservation.findAll({
      where: {
        RoomId: roomId,
        status: 'active',
      },
      attributes: ['date', 'nightsQuantity'],
    });

    const reservedDates = reservations.map((reservation) => {
      const startDate = new Date(reservation.date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + reservation.nightsQuantity);

      const dates = [];
      for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    }).flat();

    return res.status(200).json({
      success: true,
      data: reservedDates,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Something went wrong. Error: ${err.message}`,
    });
  }
};
