/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-09
 * */
import mongoose from 'mongoose';

const Cart = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      unique: true,
    },
    items_count: {
      type: Number,
      required: true,
    },
    total_items: {
      type: Array,
      required: true,
    },
    unique_items: {
      type: Number,
      required: true,
    },
    sub_total: {
      type: Object, // {raw: 150, formatted: "150.00", formatted_with_currency: "R150.00"}
      required: true,
    },
    currency: {
      type: Object, // { code: 'ZAR', symbol: 'R'}
      default: { code: 'ZAR', symbol: 'R' },
      required: true,
    },
    expires: {
      type: String, // jwt token 24hr
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Cart', Cart);
