const mongoose = require("mongoose");
const Quote = mongoose.model("Quote");
const { Schema, model } = mongoose;

const LeadSchema = Schema({
  name: String,
  email: String,
  phone: String,
  zip: String,
  source: String,
  Date: { type: Date, default: Date.now },
  notes: String,
});

module.exports = model("Lead", LeadSchema);
