const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const archiver = require("archiver");

const mongoose = require("mongoose");
const connection = mongoose.connection;

const GridFSStorage = require("multer-gridfs-storage");
let Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

const gridfs = require("mongoose-gridfs");

let Attachment;
exports.initDB = connection => {
  const { model } = gridfs({
    collection: "uploads",
    model: "Attachment",
    mongooseConnection: connection,
  });

  Attachment = model;
};

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
    const filename = `${Date.now()}_${file.originalname}`;
    req.body.file = filename;

    return { filename, bucketName: "uploads" };
  },
});

exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => cb(null, file.mimetype.indexOf("image") >= 0),
}).single("photo");

exports.getUpload = async (req, res) => {
  const readStream = Attachment.readByFileName(req.params.fileName);
  readStream.pipe(res);
};

exports.exportUploads = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/zip",
    "Content-disposition": "attachment; filename=myFile.zip",
  });

  var zip = archiver("zip");
  zip.pipe(res);

  req.body.photos.forEach(fName => {
    const readStream = Attachment.readByFileName(fName);
    zip.append(readStream, { name: fName });
  });

  zip.finalize();
};
