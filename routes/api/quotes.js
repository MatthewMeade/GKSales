const router = require("express").Router();
const passport = require("passport");

// Controllers
const QuoteController = require("../../controllers/QuoteController");
const UploadController = require("../../controllers/FileController");

// Error handler
const catchErrors = require("../catchErrors");

// Load authentication
const authenticate = passport.authenticate("jwt", { session: false });

// @route   GET api/quotes
// @desc    Return a list of all quotes
// @access  Private
router.get("/", authenticate, catchErrors(QuoteController.getQuotes));

// @route   GET api/quotes/:id
// @desc    Return quote by its ID
// @access  Private
router.get("/:id", authenticate, catchErrors(QuoteController.getQuoteById));

// @route   GET api/quotes/lead/:lead_id
// @desc    Return a list of quotes by lead ID
// @access  Private
router.get(
  "/lead/:lead_id",
  authenticate,
  catchErrors(QuoteController.getQuotesByLead)
);

// @route   POST api/quotes
// @desc    Create a new quote
// @access  Private
router.post(
  "/",
  authenticate,
  UploadController.upload,
  catchErrors(QuoteController.createQuote)
);

// @route   POST api/quotes/:id
// @desc    Edit a quote
// @access  Private
router.post(
  "/:id",
  authenticate,
  UploadController.upload,
  catchErrors(QuoteController.editQuote)
);

// @route   POST api/quotes/:id/addPhoto
// @desc    Add a photo to a quote
// @access  Private
router.post(
  "/:id/addPhoto",
  authenticate,
  UploadController.upload,
  catchErrors(QuoteController.addPhoto)
);

// @route   POST api/quotes/:id/deletePhoto
// @desc    Remove a photo from a quote
// @access  Private
router.post(
  "/:id/deletePhoto",
  authenticate,
  UploadController.upload,
  catchErrors(QuoteController.deletePhoto)
);

// @route   DELETE api/quotes/:id
// @desc    Delete a quote
// @access  Private
router.delete("/:id", authenticate, catchErrors(QuoteController.deleteQuote));

module.exports = router;
