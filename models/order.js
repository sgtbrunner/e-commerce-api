const mongoose = require('mongoose');

const SingleOrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  image: {
    type: String,
    required: [true, 'Please provide image'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide product'],
  },
});

const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: [true, 'Please provide tax amount'],
      default: 0,
    },
    shippingFee: {
      type: Number,
      required: [true, 'Please provide shipping fee amount'],
      default: 0,
    },
    subtotal: {
      type: Number,
      required: [true, 'Please provide subtotal amount'],
      default: 0,
    },
    total: {
      type: Number,
      required: [true, 'Please provide total amount'],
      default: 0,
    },
    items: [SingleOrderItemSchema],
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    clientSecret: {
      type: String,
      required: [true, 'Please provide client secret'],
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
