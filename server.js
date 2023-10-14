// server constants
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mongoose = require("./database/db");

require("dotenv").config();

// env variables
const myVariable = process.env.MY_VARIABLE;
const port = process.env.port;

// server setup
const app = express();

app.use(cors());
app.use(express.json()); // Parse incoming JSON data

//routes setup

app.get("/", (req, res) => {
  res.send("CAARMATE API");
});

//ride routes

app.use("/api", orderRoutes);

//admin routes

app.use("/api", adminRoutes);

//404 route setup
app.use((req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
