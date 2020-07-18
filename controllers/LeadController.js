/**
 * This is a demo version of the app and has had references to the company removed
 * API functionality replaced with hard coded JSON
 */

const mongoose = require("mongoose");
const Lead = mongoose.model("Lead");

const axios = require("axios");
const fs = require("fs");

// Updates local leads collection with data fetched from company API
// Does not delete leads or remove any properties
module.exports.refreshLeads = async (req, res) => {
  // Fetch leads from GK API
  // const { data: leads } = await axios.get("API URL");

  const leads = require("./demoLeads.json");

  // Upsert each lead
  const upsertPromises = [];
  leads.forEach((lead) => {
    upsertPromises.push(Lead.findOneAndUpdate({ _id: lead._id }, lead, { upsert: true, new: true }).exec());
  });
  const updatedLeads = await Promise.all(upsertPromises);

  res.send(updatedLeads);
};

// Returns all leads
module.exports.getLeads = async (req, res) => {
  const leads = await Lead.find();
  res.send(leads);
};

// Returns a lead by ID
module.exports.getLead = async (req, res) => {
  const lead = await Lead.findOne({ _id: req.params.id });

  if (!lead) {
    return res.status(404).send({ err: "Not found" });
  }
  res.send(lead);
};
