const router = require("express").Router();
const passport = require("passport");

// Controller
const UserController = require("../../controllers/UserController");

// Error handler
const catchErrors = require("../catchErrors");

// Load validation and authentication
const { validateRegisterInput, validateLoginInput } = require("../validation/auth");
const authenticate = passport.authenticate("jwt", { session: false });

// @route   GET api/users/test
// @desc    Tests the users route
// @access  Public
router.get("/test", (req, res) => res.json({ message: "User routes working", ...req.query }));

// @route   GET api/users/test/auth
// @desc    Tests authentication for private routes
// @access  Provate
router.get("/test/auth", authenticate, (req, res) => res.json({ message: "Private Route", user: req.user }));

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post("/register", validateRegisterInput, catchErrors(UserController.registerUser));

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post("/login", validateLoginInput, catchErrors(UserController.loginUser));

module.exports = router;
