const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    // Validate required fields
    const { email, firstName, lastName, password, contactNumber, type } = req.body;

    if (!email || !firstName || !lastName || !password || !contactNumber || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create new user
    const user = new User(req.body);
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const userData = user.toObject();
    delete userData.password;

    res.json({ 
      success: true,
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};