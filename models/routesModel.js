const mongoose = require("mongoose");

// Define the schema for time slots
const timeSlotSchema = new mongoose.Schema({
  slot: String,
  available_seats: Number,
});

// Define the schema for routes
const routeSchema = new mongoose.Schema({
  routesNumber: Number,
  from: String,
  to: String,
  fare: Number,
  show: Boolean,
  time_slots: [timeSlotSchema],
});

// Define the schema for popular routes
const popularRouteSchema = new mongoose.Schema({
  routesNumber: Number,
  from: String,
  to: String,
  fare: Number,
  show: Boolean,
  time_slots: [timeSlotSchema], // Embed the time slots schema
});

const couponSchema = new mongoose.Schema({
  name: String,
  discount: Number,
  validity: Date,
});

// Create Mongoose model for coupons
const Coupon = mongoose.model("Coupon", couponSchema);

// Create Mongoose models for routes and popular routes
const Route = mongoose.model("Route", routeSchema);
const PopularRoute = mongoose.model("PopularRoute", popularRouteSchema);

module.exports = { Route, PopularRoute, Coupon };
