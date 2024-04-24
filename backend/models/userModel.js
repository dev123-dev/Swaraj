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

//* Indexes ********************************************************

userSchema.index({ email: 1, institution: 1 }, { unique: true });

//* Pre Middlewares ************************************************

// Encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Update passwordChangedAt property on password update
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // 1sec delay - passwordChangedAt timestamp is always before jwtTimeStamp
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//* Instance Methods ***********************************************

// Compare password
userSchema.methods.comparePassword = async function (
  givenPassword,
  hashedPassword
) {
  return await bcrypt.compare(givenPassword, hashedPassword);
};

// Check if password was changed after token was issued
userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return changedTimeStamp > jwtTimeStamp;
  }
  return false;
};

//* userModel ******************************************************

const User = mongoose.model("User", userSchema);
module.exports = User;
