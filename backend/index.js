const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const RegisterRoutes = require('./Routes/RegisterRoute'); // Import the routes
const LoginRoute = require('./Routes/LoginRoutes');
const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json()); // To parse JSON data

// MongoDB Connection
const connectToMongoDBAtlas = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas connected Successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connectToMongoDBAtlas();

// Use Routes (Make sure the path is correct)
app.use('/api/register', RegisterRoutes); // This will map to RegisterRoutes.js
app.use('/api/login', LoginRoute); // This will map to LoginRoute.js
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
