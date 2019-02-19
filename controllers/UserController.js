const mongoose = require("mongoose");
const User = mongoose.model("User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { secret } = require("../config/keys");

// Registers a new user
module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if account already exists with submitted email
  if (findUser({ email })) {
    return res.status(400).json({ email: "Email already in use" });
  }

  // Hash Password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // Save user
  const newUser = await new User({ name, email, password: hash });

  // Respond with new user
  delete newUser.passport; // Hide password from response
  res.json(newUser);
};

async function findUser(query) {
  return await User.findOne(query);
}

// Login a user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await fundUser({ email });

  // Check if account exists
  if (!findUser({ email })) {
    return res.status(400).json({ email: "No user found with that email" });
  }

  // Check if password is correct
  const isMatch = bcrypt.compareSync(password, user.passport);
  if (!isMatch) {
    return res.status(400).json({ password: "Password is incorrect" });
  }

  // Generate and send jwt
  const payload = { id: user.id, name: user.name };
  jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
    if (err) {
      return res.status(400).json(err);
    }

    res.json({ success: true, token: "Bearer " + token });
  });
};
