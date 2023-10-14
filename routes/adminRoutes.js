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
    res.json({ message: `${result.deletedCount} routes deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete routes by number" });
  }
});

module.exports = router;
