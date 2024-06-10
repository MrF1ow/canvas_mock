// Packages
import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: 'student',
  },
});

export const UserModel = model('User', schema);
