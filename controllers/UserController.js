const mongoose = require("mongoose");
const User = mongoose.model("User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { secret } = require("../config/keys");

// Registers a new user
module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if account already exists with submitted email
  if (await findUser({ email })) {
    return res.status(400).json({ email: "Email already in use" });
  }

  // Hash Password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // Save user
  await new User({ name, email, password: hash }).save();

  // Respond with success
  res.json({ message: "Success" });
};

function findUser(query) {
  return User.findOne(query);
}

// Return all users
module.exports.getUsers = async (req, res) => {
  // Fetch users, only include name, id, and email
  const users = await User.find().select("name email");
  res.send(users);
};

// Login a user
module.exports.loginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await findUser({ email });

  // Check if account exists
  if (!user) {
    return res.status(400).json({ email: "No user found with that email" });
  }

  // Check if password is correct
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ password: "Password is incorrect" });
  }

  // Generate and send jwt
  const payload = { id: user.id, name: user.name };
  jwt.sign(
    payload,
    secret,
    // Set expiry based on if remember me is checked
    { expiresIn: 1000 * 60 * 60 * 24 * (rememberMe ? 30 : 1) }, // 30 days : 1 day
    (err, token) => {
      if (err) {
        return res.status(400).json(err);
      }

      res.json({ success: true, token: "Bearer " + token });
    }
  );
};
