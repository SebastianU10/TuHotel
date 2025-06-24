import { Hotel, } from '../db/models/index.js';
import { Room, } from '../db/models/index.js';

export const getAllHotels = async (req, res) => {
  const hotels = await Hotel.findAll({
    where: {
      isActive: true,
    },
    order: [['name', 'ASC']] // A-Z
  });

  return res
    .status(200)
    .json({
      success: true,
      length: hotels?.length,
      data: hotels ?? [],
    });
};

export const getHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({
      where: { id, isActive: true },
      include: [{
        model: Room,
        
        
      }],
      order: [[{ model: Room }, 'codeName', 'ASC']], // Ordenar las habitaciones por codeName
    });

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel no encontrado' });
    }

    return res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error('Error fetching hotel by ID:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};