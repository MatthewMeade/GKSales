const mongoose = require("mongoose");

const Quote = mongoose.model("Quote");

module.exports.getQuotes = async (req, res) => {
  return res.send(await Quote.find());
};

module.exports.getQuoteById = async (req, res) => {
  const quote = await Quote.findOne({ _id: req.params.id });

  if (!quote) {
    return res.status(404).send({ err: "Not found" });
  }

  return res.send(quote);
};

module.exports.getQuotesByLead = async (req, res) => {
  const quotes = await Quote.find({ lead: req.params.lead_id });

  return res.send(quotes);
};

module.exports.createQuote = async (req, res) => {
  // TODO: Validation

  const newQuote = await new Quote(req.body).save();

  return res.send(newQuote);
};

module.exports.editQuote = async (req, res) => {
  // TODO: Validation

  const quote = await Quote.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  });

  if (!quote) {
    return res.status(404).send({ err: "Not found" });
  }

  return res.send(quote);
};

module.exports.addPhoto = async (req, res) => {
  const file = req.files[0].filename;

  const quote = await Quote.findById(req.params.id);

  if (!quote.photos) quote.photos = [];

  quote.photos.push(file);

  const newQuote = await quote.save({ new: true });

  res.send(newQuote);
};

module.exports.deletePhoto = async (req, res) => {
  const delFileName = req.body.fileName;

  const quote = await Quote.findById(req.params.id);

  if (!quote.photos) quote.photos = [];

  if (quote.photos.indexOf(delFileName) < 0)
    return res.status(404).send({ err: "That file does not exist" });

  quote.photos = quote.photos.filter(fileName => fileName !== delFileName);

  const newQuote = await quote.save({ new: true });

  res.send(newQuote);
};

module.exports.deleteQuote = async (req, res) => {
  const quote = await Quote.findOneAndDelete({ _id: req.params.id }).exec();

  if (!quote) {
    return res.status(404).send({ err: "Not found" });
  }

  return res.send(quote);
};
