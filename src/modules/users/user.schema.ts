import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  qq: {
    type: Number,
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
  nickName: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    default: [],
  },
});
