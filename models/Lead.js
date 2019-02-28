const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LeadSchema = Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  zip: String,
  source: String,
  Date: { type: Date, default: Date.now },
  notes: String,
});

module.exports = model("Lead", LeadSchema);
