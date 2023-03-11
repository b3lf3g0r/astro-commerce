/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-10
 * */
import mongoose from 'mongoose';

const Authentication = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    otp: {
      type: Object, // {code: 1234, expires: jwt-access-token }
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Authentication', Authentication);
