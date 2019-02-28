const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuoteSchema = new Schema({
  // General
  Address: String,
  consultationDate: Date,
  Notes: String,
  Photos: [String],
  Operation: String,

  // Job Info
  job: {
    squareFootage: Number,
    concreteHardness: Number,
    hardnessComments: String,
    cracking: Boolean,
    crackingComments: String,
    verticalSurface: Boolean,
    VerticalSurfaceComments: String,
    conditions: String,
  },

  // Floor Options
  floor: {
    floorType: String,
    baseColor: String,
    colorsFlake: String,
    collorComment: String,
  },
});

module.exports = model("Quote", QuoteSchema);
