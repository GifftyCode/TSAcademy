const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a user
exports.createUser = async (req, res) => {
  try {
    // Check if all required field are provided
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.gender ||
      !req.body.phone ||
      !req.body.role
    )
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });

    // Email check
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Phone Number check
    const existingPhoneNo = await User.findOne({ phone: req.body.phone });
    if (existingPhoneNo) {
      return res.status(400).json({ message: "Phone Number already exists" });
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      phone: req.body.phone,
      role: req.body.role || "user", // Default role is user if not provided
      hasAdminAccess: req.body.hasAdminAccess || false,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" }, user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Log in User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password)
      return res.status(400).json({ message: "Provide all required fields" });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
