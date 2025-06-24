import { hash, genSalt, compare, } from 'bcrypt';

// plain = 12345678
export async function encryptPassword(plain) {
  // genSalt genera la cantidad de bytes para el algoritmo
  // de encriptacion de la contrasena.
  const salt = await genSalt(16);

  // se genera el hash o la contrasena encriptada
  const encryptedPassword = await hash(plain, salt);

  // 12345678 -> $2b$16$W4VWnmnyvQTX44XD3AOvd..ZoM6XZ0k1.9rFhWDP7uprLZ9wJjtse 
  return encryptedPassword;
}

export async function isValidPassword(plain, password) {
  return await compare(plain, password);
}
