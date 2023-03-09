/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-09
 * */
import mongoose from 'mongoose';

const Order = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    merchant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant',
      required: true,
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      required: true,
    },
    payment_method: {
      type: String,
      enum: ['card', 'paypal', 'cash'],
      required: true,
    },
    fulfillment_status: {
      type: String,
      enum: ['pending', 'fulfilled', 'failed', 'cancelled'],
      required: true,
      default: 'pending',
    },
    currency: {
      type: Object, //
      default: { code: 'ZAR', symbol: 'R' },
      required: true,
    },
    order_amount: {
      type: Object, // {raw: 150, formatted: "150.00", formatted_with_currency: "R150.00"}
      required: true,
    },
    shipping_address: {
      type: Object, // {name: '',  street: '', city: '', state: '', country: '', zip: ''}
      required: true,
    },
    order_items: {
      type: Array, // [{product_id: '', quantity: '', price: '', sku: ''}]
      required: true,
    },
    payment: {
      type: String,
      enum: ['Card'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', Order);
