const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { validateUser } = require('../model-validation/userValidation');

exports.register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate user data
  const { error } = validateUser({ email, password });
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  res.status(201).json({ _id: user._id, email: user.email });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, email: user.email });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});