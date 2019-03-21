const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuoteSchema = new Schema({
  // General
  address: String,
  consultationDate: Date,
  notes: String,
  photos: [String],
  Operation: String,
  lead: {
    type: Schema.Types.ObjectId,
    ref: "Lead",
  },

  // Job Info
  job: {
    squareFootage: Number,
    concreteHardness: Number,
    hardnessComments: String,
    cracking: Boolean,
    crackingComments: String,
    verticalSurface: Boolean,
    verticalSurfaceComments: String,
    conditions: String,
  },

  // Floor Options
  floor: {
    floorType: String,
    baseColor: String,
    colorsFlake: String,
    colorComment: String,
  },

  pricing: {
    pricePerSqft: Number,
    additionalCosts: [
      {
        id: String,
        name: String,
        price: Number,
        isPerSqft: Boolean,
      },
    ],
    comments: String,
  },
});

const autoPopulate = function(next) {
  this.populate("lead");
  next();
};

QuoteSchema.pre("find", autoPopulate).pre("findOne", autoPopulate);

module.exports = model("Quote", QuoteSchema);
