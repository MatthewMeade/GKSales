const mongoose = require("mongoose");

const Quote = mongoose.model("Quote");

module.exports.getQuotes = async (req, res) => {
  return res.send(await Quote.find());
};

module.exports.getQuoteById = async (req, res) => {
  const quote = Quote.findOne({ _id: req.params.id });

  if (!quote) {
    return res.status(404).send({ err: "Not found" });
  }

  return res.send({ quote });
};

module.exports.getQuotesByLead = async (req, res) => {
  const quotes = Quote.find({ lead: req.params.lead_id });

  if (!quotes) {
    return res.status(404).send({ err: "Not found" });
  }

  return res.send({ quote });
};

module.exports.createQuote = async (req, res) => {
  // TODO: Validation

  const newQuote = await new Quote(req.body).save();

  return res.send({ newQuote });
};

module.exports.editQuote = async (req, res) => {
  // TODO: Validation

  const quote = await Quote.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  if (!quote) {
    return res.status(404).send({ err: "Not found" });
  }

  return res.send({ quote });
};

module.exports.deleteQuote = async (req, res) => {
  const quote = await Quote.findOneAndDelete({ _id: req.params.id }).exec();

  if (!quote) {
    return res.status(404).send({ err: "Not found" });
  }

  return res.send({ quote });
};
