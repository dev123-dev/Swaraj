const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handleFactory");
require("../models/institutionModel");

const {
  sendTokensAndCookies,
  deleteExpiredTokens,
} = require("./helperFunctions");
const { removeCookies } = require("../utils/tokensAndCookies");

//* Helping Middlewares ********************************************

// add user id in params
exports.getUserId = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

// add photo to req.body
exports.addPhotoToBody = (req, res, next) => {
  if (req.file?.fieldname === "photo") req.body.photo = req.file.filename;
  next();
};

//* Error message for password update ******************************
exports.errorPasswordUpdate = (req, res, next) => {
  // Create an error if user tries to change password in this route
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /update-password",
        400
      )
    );
  }

  next();
};

//* Controllers ****************************************************
//* Log in *********************************************************

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide both email and password.", 400));
  }

  const user = await User.findOne({ email, status: "Active" }).populate({
    path: "institution",
    select: "status",
  });

  if (
    !user ||
    user.institution?.status === "Inactive" ||
    !(await user.comparePassword(password, user.password))
  ) {
    return next(new AppError("Invalid Credentials!", 401));
  }

  deleteExpiredTokens(user);
  sendTokensAndCookies(req, res, user, 200);
});

//* Log out ********************************************************

exports.logout = catchAsync(async (req, res) => {
  const refreshToken = req.cookies?.refresh || req.headers.refreshtoken;
  if (refreshToken) {
    const user = await User.findOne({
      "refreshTokens.token": refreshToken,
    });
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        (rt) => rt.token !== refreshToken
      );
      await user.save({ validateBeforeSave: false });
    }
  }

  removeCookies(res);
  res.status(200).json({ status: "SUCCESS" });
});

//* Update user Password *******************************************

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError(`No user found with the provided ID`, 404));
  }

  // Update new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({ status: "SUCCESS" });
});

//* Using Factory Handler ******************************************

exports.getAllUsers = factory.getAll(User, { path: "institution" });
exports.createUser = factory.create(User);
exports.getUserById = factory.getById(User);
exports.updateUserById = factory.updateById(User);
