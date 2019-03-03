const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");

// TODO: File Validation
// TODO: Move file storage to mongodb

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `./uploads/${req.user._id}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`;
    console.log(fileName);
    req.body.file = fileName;
    cb(null, fileName);
  },
});

exports.upload = multer({ storage }).any();

exports.getUpload = (req, res) => {
  const path = resolve(`./uploads/${req.user._id}/${req.params.fileName}`);
  res.sendFile(path);
};
