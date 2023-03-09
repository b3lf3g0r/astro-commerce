/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-09
 * */
import mongoose from 'mongoose';

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    price: {
      type: Object, // {raw: 150, formatted: "150.00", formatted_with_currency: "R150.00"}
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', Product);
