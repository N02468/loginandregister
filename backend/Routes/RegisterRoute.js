const express = require('express');
const bcrypt = require('bcrypt');
const RegisterModel = require('../Models/RegisterModel'); // Import the model

const router = express.Router();

// Registration Route
router.post('/', async (req, res) => { // Route path is now just '/', because 'api/register' is already defined in server.js
  const { fullName, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await RegisterModel.findOne({ email }); // Use RegisterModel instead of User
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new RegisterModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router; // Ensure to export the router
