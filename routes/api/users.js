const router = require("express").Router();
const passport = require("passport");

// Controller
const UserController = require("../../controllers/UserController");

// Error handler
const catchErrors = require("../catchErrors");

// Load validation and authentication
const { validateRegisterInput, validateLoginInput } = require("../validation/auth");
const authenticate = passport.authenticate("jwt", { session: false });

// @route   GET api/users/me
// @desc    Returns the current user
// @access  Private
router.get("/me", authenticate, (req, res) => res.json(req.user));

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post("/register", validateRegisterInput, catchErrors(UserController.registerUser));

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post("/login", validateLoginInput, catchErrors(UserController.loginUser));

// @route   POST api/users/
// @desc    Returns a list of all users containing only the name and email fields
// @access  Public
router.get("/", authenticate, catchErrors(UserController.getUsers));

module.exports = router;
