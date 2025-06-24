import { Schema, model, } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  isAdmin: Boolean,
});

export const User = model('User', userSchema);