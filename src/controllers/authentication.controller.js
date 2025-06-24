import { randomUUID, } from 'crypto';

import { User, } from '../db/models/index.js';

import { encode, } from '../services/authentication.service.js';
import { encryptPassword, isValidPassword, } from '../services/password.service.js';

const ONE_MS = 1000;

export const login = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const existentedUser = await User.findOne({ where: { email, }, });
  if (!existentedUser) {
    return res
      .status(401)
      .json({
        success: false,
        message: "El usuario no ha sido encontrado o no esta registrado",
      });
  }
  
  const validPassword = await isValidPassword(password, existentedUser.password);

  if (!validPassword) {
    return res
      .status(401)
      .json({
        success: false,
        message: "La contraseña es incorrecta",
      });
  }

  const now = Date.now();

  // Generando/Codificando el token
  const { 
    token, 
  } = await encode({
    id: existentedUser.id,
    sub: existentedUser.email,
    name: existentedUser.name,
    iat: now,
    exp: now + (ONE_MS * 60 * 60), // 1h 
    // exp: now + 1000,
  });

  return res
    .status(200)
    .json({
      success: true,
      data: { 
        token, isAdmin: existentedUser.isAdmin
      },
    });
};

/**
 * Estos datos vendran desde la Request:
 * - Name
 * - Email
 * - Password
 * 
 */
export const signup = async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  // SELECT * FROM USERS WHERE EMAIL = 'brian@mail.com' TOP 1;
  const existentedUser = await User.findOne({ where: { email }, });
  if (existentedUser) {
    return res
      .status(400)
      .json({
        success: false,
        message: "El usuario ya se encuentra registrado",
      });
  }

  const encryptedPassword = await encryptPassword(password);

  // INSERT INTO User(id, name, email, password) VALUES('iasjdklasjdklasjd', 'Brian', 'example@mail.com', '12345678');
  const uuid = randomUUID();
  await User.create({
    id: uuid,
    name,
    email,
    password: encryptedPassword,
    phoneNumber: null,
    address: null,
    isAdmin: false,
  });

  return res
    .status(201)
    .json({
      success: true,
      message: "El usuario ha sido registrado",
    });
};