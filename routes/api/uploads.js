const router = require("express").Router();
const passport = require("passport");

// Controller
const FileController = require("../../controllers/FileController");

// Error handler
const catchErrors = require("../catchErrors");

// Load authentication
const authenticate = passport.authenticate("jwt", { session: false });

// @route   POST api/uploads/export
// @desc    Returns a zip of requested files
// @access  Private
router.post("/export", FileController.exportUploads);

// @route   POST api/uploads/:filename
// @desc    Returns an uploaded file
// @access  Private
router.get("/:fileName", FileController.getUpload);

module.exports = router;
