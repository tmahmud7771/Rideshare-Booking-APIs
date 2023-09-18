const express = require("express");

const Ride = require("../models/rideModel");

const router = express.Router();


router.get("/", (req, res) => {
    res.send("CAARMATE API RIDE DATA");
});


router.get("/allride", async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/ride/:id", getRide, (req, res) => {
    res.json(res.ride);
});


router.post("/ride/create", async (req, res) => {
    const {userId, pickupLocation, destinationLocation, fare, vehicleNumber} = req.body;
    try {
        const ride = new Ride({
        userId,
        pickupLocation,
        destinationLocation,
        fare,
        vehicleNumber
        });
        const newRide = await ride.save();
        res.status(201).json(newRide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



module.exports = router;