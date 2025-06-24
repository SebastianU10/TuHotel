import { Hotel, Room } from '../db/models/index.js';

export const getAllRooms = async (req, res) => {
  const rooms = await Room.findAll({
  });

  return res
    .status(200)
    .json({
      success: true,
      length: rooms?.length,
      data: rooms ?? [],
    });
};
// Función para actualizar el precio más bajo del hotel
export const updateHotelBestPrice = async (hotelId) => {
  try {
    // Obtener todas las habitaciones del hotel
    const rooms = await Room.findAll({
      where: { hotelId },
    });

    // Obtener el precio más bajo entre las habitaciones
    const bestPrice = rooms.reduce((minPrice, room) => {
      return room.pricePerNight < minPrice ? room.pricePerNight : minPrice;
    }, Infinity);

    // Si no hay habitaciones, establecer bestPrice como null
    const bestPriceValue = rooms.length > 0 ? bestPrice : null;

    // Actualizar el campo bestPrice del hotel
    await Hotel.update(
      { bestPrice: bestPriceValue },
      { where: { id: hotelId } }
    );
  } catch (error) {
    console.error('Error updating bestPrice for hotel:', error);
  }
};

export const getRoomById = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ success: false, message: 'Habitacion no encontrada' });
    }

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};