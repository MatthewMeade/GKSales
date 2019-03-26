const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuoteSchema = new Schema({
  // General
  address: String,
  consultationDate: Date,
  notes: String,
  photos: [String],
  photoCount: {
    type: Number,
    default: 0,
  },
  Operation: String,
  lead: {
    type: Schema.Types.ObjectId,
    ref: "Lead",
    required: true,
  },
  salesperson: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Job Info
  job: {
    squareFootage: {
      type: Number,
      default: 0,
    },
    concreteHardness: {
      type: Number,
      default: 0,
    },
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
    depositPaid: {
      type: Boolean,
      default: false,
    },

    jobPaid: {
      type: Boolean,
      default: false,
    },
    pricePerSqft: {
      type: Number,
      default: 0,
    },
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
  this.populate("salesperson", "name email");
  next();
};

QuoteSchema.pre("find", autoPopulate).pre("findOne", autoPopulate);

module.exports = model("Quote", QuoteSchema);
