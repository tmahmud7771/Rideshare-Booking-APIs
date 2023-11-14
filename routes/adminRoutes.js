const express = require("express");
const router = express.Router();

const { Route, PopularRoute, Coupon } = require("../models/routesModel");

// Create a new regular route
router.post("/create-route", async (req, res) => {
  try {
    const routeData = req.body;
    const newRoute = new Route(routeData);
    await newRoute.save();
    res.json({ message: "Route created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a route" });
  }
});

// Create a new popular route
router.post("/create-popular-route", async (req, res) => {
  try {
    const popularRouteData = req.body;
    const newPopularRoute = new PopularRoute(popularRouteData);
    await newPopularRoute.save();
    res.json({ message: "Popular route created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a popular route" });
  }
});

// Get all regular routes
router.get("/get-all-routes", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all routes" });
  }
});

// Get all popular routes
router.get("/get-all-popular-routes", async (req, res) => {
  try {
    const routes = await PopularRoute.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all popular routes" });
  }
});

// Get all regular routes by number
router.get("/get-all-routes/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const routes = await Route.find({ routesNumber: number });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get routes by number" });
  }
});

// Get all popular routes by number
router.get("/get-all-popular-routes/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const routes = await PopularRoute.find({ routesNumber: number });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get popular routes by number" });
  }
});

// Delete all regular routes by number
router.delete("/delete-route/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const result = await Route.deleteMany({ routesNumber: number });
    res.json({ message: `${result.deletedCount} routes deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete routes by number" });
  }
});

// Delete all popular routes by number
router.delete("/delete-popular-route/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const result = await PopularRoute.deleteMany({ routesNumber: number });
    res.json({
      message: `${result.deletedCount} popular routes deleted successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete popular routes by number" });
  }
});

//copunon create

router.post("/create-coupon", async (req, res) => {
  try {
    const couponData = req.body;
    const newCoupon = new Coupon(couponData);
    await newCoupon.save();
    res.json({ message: "Coupon created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a coupon" });
  }
});

// Get all coupons
router.get("/get-all-coupons", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all coupons" });
  }
});

// Get all coupons by name
router.get("/get-all-coupons/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const coupons = await Coupon.find({ name: name });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: "Failed to get coupons by name" });
  }
});

// Delete all coupons by name

router.delete("/delete-coupon/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await Coupon.deleteMany({ name: name });
    res.json({ message: `${result.deletedCount}coupon  deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete coupon by number" });
  }
});

router.post("/route/:routeId/add-pickup", async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const pickupData = req.body; // Assuming this contains the details of the new pickup location

    // Find the route by ID
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Add the new pickup location
    route.pickup_points.push(pickupData);

    // Save the updated route
    await route.save();

    res.json({ message: "Pickup location added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add pickup location" });
  }
});

router.post("/route/:routeId/add-timeslot", async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const timeSlotData = req.body; // Assuming this contains the details of the new time slot

    // Find the route by ID
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Add the new time slot
    route.time_slots.push(timeSlotData);

    // Save the updated route
    await route.save();

    res.json({ message: "Time slot added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add time slot" });
  }
});

router.delete("/route/:routeId/time-slot/:timeSlotId", async (req, res) => {
  try {
    const { routeId, timeSlotId } = req.params;

    // Find the route by ID
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Remove the time slot
    route.time_slots.id(timeSlotId).remove();

    // Save the updated route
    await route.save();

    res.json({ message: "Time slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete time slot" });
  }
});

router.delete(
  "/route/:routeId/pickup-point/:pickupPointId",
  async (req, res) => {
    try {
      const { routeId, pickupPointId } = req.params;

      // Find the route by ID
      const route = await Route.findById(routeId);
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }

      // Remove the pickup point
      route.pickup_points.id(pickupPointId).remove();

      // Save the updated route
      await route.save();

      res.json({ message: "Pickup point deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete pickup point" });
    }
  }
);

router.put(
  "/route/:routeId/time-slot/:timeSlotId/set-seats",
  async (req, res) => {
    try {
      const { routeId, timeSlotId } = req.params;
      const { availableSeats } = req.body; // New number of available seats

      // Validate the availableSeats input
      if (availableSeats < 0) {
        return res
          .status(400)
          .json({ error: "Invalid number of available seats" });
      }

      // Find the route by ID
      const route = await Route.findById(routeId);
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }

      // Find the specific time slot and update its available seats
      const timeSlot = route.time_slots.id(timeSlotId);
      if (!timeSlot) {
        return res.status(404).json({ error: "Time slot not found" });
      }

      timeSlot.available_seats = availableSeats;

      // Save the updated route
      await route.save();

      res.json({ message: "Available seats updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update available seats" });
    }
  }
);

module.exports = router;
