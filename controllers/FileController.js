const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const archiver = require("archiver");

const mongoose = require("mongoose");
const connection = mongoose.connection;

const GridFSStorage = require("multer-gridfs-storage");
let Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

// TODO: File Validation
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `./uploads/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    req.body.file = fileName;
    cb(null, fileName);
  },
});

storage = new GridFSStorage({
  db: connection,
  file: (req, file) => {
    console.log(file);
    const fileName = `${Date.now()}_${file.originalname}`;
    req.body.file = fileName;

    return { fileName, bucketName: "uploads" };
  },
});

exports.upload = multer({ storage }).any();

exports.getUpload = (req, res) => {
  const filePath = resolve(`./uploads/${req.params.fileName}`);
  res.sendFile(filePath);

  // gfs.collection("uploads");
};

exports.exportUploads = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/zip",
    "Content-disposition": "attachment; filename=myFile.zip",
  });

  var zip = archiver("zip");
  zip.pipe(res);

  req.body.photos.forEach(f => {
    const filePath = resolve(`./uploads/${f}`);
    zip.file(filePath, { name: f });
  });

  zip.finalize();
};
