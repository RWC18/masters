import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const users = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('users', users);
