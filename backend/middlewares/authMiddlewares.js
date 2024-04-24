const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

//* Middlewares ****************************************************
//* Protected route ************************************************

exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check its existance
  let accessToken;
  if (req.cookies?.access) {
    accessToken = req.cookies.access;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  if (!accessToken) {
    return next(new AppError("Please login to proceed!", 401));
  }

  // Verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Please login to proceed!", 401));
    }
    return next(new AppError("Invalid Token!", 401));
  }

  // Check if user still exists
  const user = await User.findById(decodedToken?.id);
  if (!user) {
    return next(new AppError("User not found!", 401));
  }

  // Grant access to protected route
  req.user = user;
  next();
});

//* Restricted route ***********************************************

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action!", 403)
      );
    }

    next();
  };
