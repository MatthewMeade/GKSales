const router = require("express").Router();
const passport = require("passport");

// Controller
const LeadController = require("../../controllers/LeadController");

// Error handler
const catchErrors = require("../catchErrors");

// Load authentication
const authenticate = passport.authenticate("jwt", { session: false });

// @route   GET api/leads/refresh
// @desc    Loads leads from GK API
// @access  Private
router.get("/refresh", authenticate, catchErrors(LeadController.refreshLeads));

// @route   GET api/leads/
// @desc    Loads leads from the sales app DB
// @access  Private
router.get("/", authenticate, catchErrors(LeadController.getLeads));

module.exports = router;
