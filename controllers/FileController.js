const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const archiver = require("archiver");

const mongoose = require("mongoose");
const connection = mongoose.connection;
const Quote = mongoose.model("Quote");

const GridFSStorage = require("multer-gridfs-storage");
let Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

const gridfs = require("mongoose-gridfs");

let Attachment;
// Initialize DB with connection (library can't use promise from mongoose.connection)
exports.initDB = connection => {
  const { model } = gridfs({
    collection: "uploads",
    model: "Attachment",
    mongooseConnection: connection,
  });

  Attachment = model;
};

// DEV ONLY
// Configures multer to store photos locally
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `./uploads/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`;
    req.body.file = fileName;
    cb(null, fileName);
  },
});

// Configures multer to store files on DB
storage = new GridFSStorage({
  db: connection,
  file: async (req, file) => {
    const { photoCount } = await Quote.findById(req.body.quote);
    const extension = file.originalname.split(".").pop();

    const filename = `${Date.now()}_Photo ${photoCount + 1}.${extension}`;

    req.body.file = filename;

    return { filename, bucketName: "uploads" };
  },
});

exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => cb(null, file.mimetype.indexOf("image") >= 0),
}).single("photo");

// Read a file from the DB
exports.getUpload = async (req, res) => {
  const readStream = Attachment.readByFileName(req.params.fileName);
  readStream.pipe(res);
};

// Read and zip a list of photos
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
