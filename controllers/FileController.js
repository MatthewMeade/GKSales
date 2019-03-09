const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const archiver = require("archiver");

// TODO: File Validation
// TODO: Move file storage to mongodb

const storage = multer.diskStorage({
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

exports.upload = multer({ storage }).any();

exports.getUpload = (req, res) => {
  const filePath = resolve(`./uploads/${req.params.fileName}`);
  res.sendFile(filePath);
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
