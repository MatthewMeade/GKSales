const mongoose = require("mongoose");

const Validator = require("validator");
const isEmpty = require("./is-empty");

const Lead = mongoose.model("Lead");

module.exports.validateQuoteInfoInput = async req => {
  let data = req.body;
  let errors = {};

  data.lead = !isEmpty(data.lead) ? data.lead : "";
  data.consultationDate = !isEmpty(data.consultationDate)
    ? data.consultationDate
    : "";

  if (Validator.isEmpty(data.lead)) {
    errors.lead = "Lead is required";
  } else {
    const lead = await Lead.findById(data.lead);
    if (!lead) {
      errors.lead = "Lead does not exist";
    }
  }

  if (Validator.isEmpty(data.consultationDate)) {
    errors.consultationDate = "Consultation date is required";
  }

  if (!Validator.isISO8601(data.consultationDate)) {
    errors.consultationDate = "Consulation date must be a valid date";
  }

  return errors;
};

module.exports.validateJobInformationInput = req => {
  let data = req.body.job;
  let errors = {};

  data.squareFootage = !isEmpty(data.squareFootage) ? data.squareFootage : "";
  data.cracking = !isEmpty(data.cracking) ? data.cracking : "";
  data.verticalSurface = !isEmpty(data.verticalSurface)
    ? data.verticalSurface
    : "";

  if (!Validator.isNumeric(data.squareFootage) || data.squareFootage < 0) {
    errors.squareFootage = "Square footage must be a positive number.";
  }

  console.log(JSON.stringify(req.body, null, 2));

  return errors;
};
