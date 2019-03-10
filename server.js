const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ encoded: false }));
app.use(bodyParser.json());

// DB Config
const { mongoURI } = require("./config/keys");
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    require("./controllers/FileController").initDB(mongoose.connection);
  })
  .catch(err => console.log(err));

mongoose.set("useFindAndModify", false);

// Load DB Models
require("./models/Lead");
require("./models/Quote");
require("./models/User");

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Use Routes
const userRoutes = require("./routes/api/users");
const leadRoutes = require("./routes/api/leads");
const quoteRoutes = require("./routes/api/quotes");
const uploadRoutes = require("./routes/api/uploads");
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/uploads", uploadRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  const root = require("path").join(__dirname, "client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
