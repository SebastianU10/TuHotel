import { DataTypes, } from 'sequelize';

import { sequelize } from '../connection.js';

const Room = sequelize.define(
  'Room',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    photos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codeName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pricePerNight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

export default Room;