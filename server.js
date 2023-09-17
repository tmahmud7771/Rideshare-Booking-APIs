// server constants
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('./database/db');

require('dotenv').config();

// env variables
const myVariable = process.env.MY_VARIABLE;
const port = process.env.port;


// server setup
const app = express();

app.use(cors());
app.use(express.json()); // Parse incoming JSON data


//routes setup

app.get('/',(req,res) =>{
    res.send("CAARMATE API")
})






//404 route setup
app.use((req, res) => {
    res.status(404).json({ error: 'Not found.' });
  });



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});