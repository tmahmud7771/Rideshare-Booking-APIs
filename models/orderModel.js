const mongoose = require("mongoose");

// Define the schema
const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  route: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  time_slot: {
    slot: {
      type: String,
      required: true,
    },
    available_seats: {
      type: Number,
      required: true,
    },
  },
  seats_booked: {
    type: Number,
    required: true,
  },
  total_fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  coupon_code: {
    type: String,
    required: false,
  },
  discount_price: {
    type: Number,
    required: false,
  },
});

// Create a model based on the schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
