const express = require("express");

const Order = require("../models/orderModel");
const { Route, PopularRoute, Coupon } = require("../models/routesModel");

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

    // Assuming order_data contains routeId and timeSlotId
    const routeId = order_data.routeId;
    const timeSlotId = order_data.timeSlotId;

    // Find the route
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Find the specific time slot
    const timeSlot = route.time_slots.id(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }

    // Check if there are enough available seats
    if (timeSlot.available_seats < order_data.seats_booked) {
      return res.status(400).json({ error: "Not enough available seats" });
    }

    // Decrement the available seats
    timeSlot.available_seats -= order_data.seats_booked;

    // Save the updated route
    await route.save();

    // Create the order
    const newOrder = new Order(order_data);
    await newOrder.save();

    res.json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create an order" });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.find({ _id: id });
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

router.put("/cancel-order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the associated route
    const route = await Route.findById(order.routeId);
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Find the associated time slot
    const timeSlot = route.time_slots.id(order.timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }

    // Update the available seats
    timeSlot.available_seats += order.seats_booked;

    // Save the updated route
    await route.save();

    // Update the order status to 'Cancelled'
    order.status = "Cancelled";

    // Save the updated order
    await order.save();

    res.json({ message: `Order ${order._id} cancelled successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});
router.delete("/delete-order/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Find the order
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Delete the order
    await Order.deleteOne({ _id: id });

    res.json({ message: `${order._id} order deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order by id" });
  }
});

router.put("/payment-order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = "Paid";
    await order.save();

    res.json({ message: `Order ${order._id} paid successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to pay order by id" });
  }
});

module.exports = router;
