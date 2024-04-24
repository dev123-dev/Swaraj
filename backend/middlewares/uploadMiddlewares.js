const multer = require("multer");
const path = require("path");

const AppError = require("../utils/appError");

// Multer
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    cb(null, `user-${Date.now()}-${file.originalname}`);
  },
});

const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/logos");
  },
  filename: (req, file, cb) => {
    cb(null, `logo-${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Please upload images of format - jpg, jpeg & png only",
        400
      ),
      false
    );
  }
};

const userUpload = multer({ storage: userStorage, fileFilter: multerFilter });
const logoUpload = multer({ storage: logoStorage, fileFilter: multerFilter });

// Upload user photo ***********************************************
exports.uploadUserPhoto = userUpload.single("photo");

// Upload logo  ****************************************************
exports.uploadLogo = logoUpload.single("logo");
