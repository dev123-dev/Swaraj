const User = require("../models/userModel");
const { createTokensAndCookies } = require("../utils/tokensAndCookies");

//* Create and send tokens *****************************************

exports.sendTokensAndCookies = async (req, res, user, statusCode) => {
  const refreshToken = req.cookies?.refresh || req.headers.refreshtoken;
  if (refreshToken) {
    // If any cookie => remove it from DB
    user.refreshTokens = user.refreshTokens.filter(
      (rt) => rt.token !== refreshToken
    );

    // Reuse detection
    const foundToken = await User.findOne({
      "refreshTokens.token": refreshToken,
    });
    if (!foundToken) user.refreshTokens = [];
  }

  const { accessToken, refreshToken: rT } = await createTokensAndCookies(
    user,
    res
  );

  res.status(statusCode).json({
    status: "SUCCESS",
    accessToken,
    refreshToken: rT,
  });
};

//* Delete expired refresh tokens **********************************

exports.deleteExpiredTokens = async (user) => {
  user.refreshTokens = user.refreshTokens.filter(
    (rt) => rt.expiresIn.getTime() > Date.now()
  );
};

//* filter req.body ************************************************

exports.filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

//* Get formatted date *********************************************
exports.formattedDate = (date) => {
  const dateStr = new Date(date).toLocaleDateString("en-UK").split("/");
  const dateFormat = [dateStr[2], dateStr[1], dateStr[0]].join("-");
  return dateFormat;
};
