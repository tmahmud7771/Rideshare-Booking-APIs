const mongoose = require("mongoose");

// Define the schema
const orderSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
    },

    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Route", // Assuming you have a Route model
    },

    routeDetail: {
      routeNumber: {
        type: Number,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
    timeslotDetail: {
      slot: {
        type: String,
        required: true,
      },
      available_seats: {
        type: Number,
        required: true,
      },
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TimeSlot", // Assuming you have a TimeSlot model or it's a part of Route model
    },
    pickupPointDetail: {
      name: {
        type: String,
        required: true,
      },
    },
    pickupPointId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "PickupPoint", // Assuming you have a PickupPoint model or it's a part of Route model
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
  },
  { timestamps: true }
);

// Create a model based on the schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
