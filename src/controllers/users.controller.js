import { User, } from '../db/models/index.js';

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  if (!users || users.length <= 0) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No se encontraron usuarios',
      });
  }

  return res
    .status(200)
    .json({
      success: true,
      message: "Todos los usuarios",
      // data: [
      //   ...users,
      // ],
      data: users,
    });
};

export const isUserAdmin = async (req, res) => {
  const userId = req?.userId;

  const userById = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (userById?.isAdmin) {
    return res
      .status(200)
      .json({
        success: true,
        message: 'El usuario es administrador',
      });
  }

  return res
    .status(200)
    .json({
      success: false,
      message: 'El usuario no es administrador',
    });
};

export const getUsersById = async (req, res) => {
  const userId = req?.userId;

  const userById = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (userById?.isAdmin) {
    return res
      .status(200)
      .json({
        success: true,
        message: 'El usuario es administrador',
      });
  }

  return res
    .status(200)
    .json({
      success: false,
      message: 'El usuario no es administrador',
    });
};