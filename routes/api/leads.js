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
router.get("/refresh", catchErrors(LeadController.refreshLeads));

module.exports = router;
