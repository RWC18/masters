import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const history = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    tool_name: {
      type: String,
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const History = mongoose.model('history', history);
