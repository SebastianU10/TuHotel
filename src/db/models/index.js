import User from './user.js';
import Room from './room.js';
import Hotel from './hotel.js';
import Reservation from './reservation.js';

// Definición de asociaciones
Hotel.hasMany(Room);
Room.belongsTo(Hotel);

User.hasMany(Reservation);
Reservation.belongsTo(User);

User.belongsToMany(Room, { 
   through: { 
    model: Reservation, 
    unique: false,
   }  
});
Room.belongsToMany(User, { 
   through: { 
    model: Reservation, 
    unique: false,
   }  
});

// Sincronización de tablas en orden
(async () => {
  // Primero crea la tabla Hotel
  await Hotel.sync({ 
   //force: true 
});

  // Luego crea la tabla Room, que depende de Hotel
  await Room.sync({ 
   //force: true 
});

  // Luego crea la tabla User
  await User.sync({ 
   //force: true 
});

  // Finalmente crea la tabla Reservation, que depende de User y Room
  await Reservation.sync({ 
   //force: true 
});
})();

export { User, Room, Hotel, Reservation };
