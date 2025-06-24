import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

const Hotel = sequelize.define(
  'Hotel',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    bestPrice: {  
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
  {
  sequelize,
  modelName: 'Hotel',
  tableName: 'Hotel', 
  }
);

export default Hotel;

