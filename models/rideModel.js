const mongoose = require('mongoose');

// Define the schema
const rideSchema = new mongoose.Schema({
  userId: {
    type: String, // or ObjectId if userId corresponds to a User collection
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  pickupLocation: {
    type: String, // Store the pickup location name as a string
    required: true,
  },
  destinationLocation: {
    type: String, // Store the destination location name as a string
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
