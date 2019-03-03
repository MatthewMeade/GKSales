const router = require("express").Router();
const passport = require("passport");

// Controller
const FileController = require("../../controllers/FileController");

// Error handler
const catchErrors = require("../catchErrors");

// Load authentication
const authenticate = passport.authenticate("jwt", { session: false });

router.get("/uploads/:fileName", authenticate, FileController.getUpload);

module.exports = router;
