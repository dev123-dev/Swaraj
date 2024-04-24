const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//* userSchema *****************************************************

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "User email ID is required"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email ID"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (val) {
        return val ? validator.isMobilePhone(val) : true;
      },
      message: "Please provide a valid phone number",
    },
  },
  address: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "A password must have minimum of 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords don't match",
    },
  },
  passwordChangedAt: Date,
  photo: String,
  role: {
    type: String,
    enum: {
      values: ["Super Admin", "Admin", "Manager", "Clerical", "Accounts"],
      message:
        "User role can be - Super Admin, Admin, Manager, Clerical, Accounts",
    },
  },
  refreshTokens: [
    {
      token: String,
      expiresIn: {
        type: Date,
        default: Date.now() + process.env.REFRESH_EXPIRES_IN * 1,
      },
    },
  ],
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: [true, "User must belong to an institution"],
  },
  status: {
    type: String,
    default: "Active",
    enum: {
      values: ["Active", "Inactive"],
      message: "User status can be - Active or Inactive",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
