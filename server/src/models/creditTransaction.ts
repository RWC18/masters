import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const creditTransaction = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balance_after: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ['purchase', 'spend', 'refund'],
    },
    tool_name: {
      type: String,
      required: false,
    },
    reason: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

export const CreditTransaction = mongoose.model('credit_transactions', creditTransaction);

