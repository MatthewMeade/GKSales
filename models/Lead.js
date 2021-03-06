const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LeadSchema = Schema({
  name: String,
  email: String,
  phone: String,
  zip: String,
  source: String,
  date: { type: Date, default: Date.now },
  notes: String,
});

module.exports = model("Lead", LeadSchema);
