const express = require("express");

const Order = require("../models/orderModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("CAARMATE API Order DATA");
});

router.get("/allOrder", async (req, res) => {
  try {
    const Orders = await Order.find();
    res.json(Orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/order/create", async (req, res) => {
  try {
    const order_data = req.body;
    const newOrder = new Order(order_data);
    await newOrder.save();
    res.json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a order" });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.find({ order_id: id });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order by id" });
  }
});

router.get("/order/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const order = await Order.find({ user_email: email });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order by email" });
  }
});

router.delete("/delete-order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Order.deleteMany({ order_id: id });
    res.json({ message: `${result.deletedCount} routes deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete routes by number" });
  }
});

module.exports = router;
