const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Make sure this folder exists (create if missing)
const uploadPath = path.join(__dirname, "../public/temp");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ✅ use a proper absolute path
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
