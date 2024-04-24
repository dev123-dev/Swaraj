const mongoose = require("mongoose");
const validator = require("validator");

//* institutionSchema **********************************************
const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Institute name is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Institute phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Institute email ID is required"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email ID"],
  },
  address: String,
  logo: String,
  description: String,
  gst_no: {
    type: String,
    validate: {
      validator: function (val) {
        const regex =
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return val ? regex.test(val) : true;
      },
      message: "Invalid GSTin number",
    },
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: [true, "Institute must belong to a template"],
  },
  invoice: {
    year: Number,
    counter: Number,
  },
  grc: {
    year: Number,
    counter: Number,
  },
  receipt: {
    year: Number,
    counter: Number,
  },
  channelIntegration: {
    type: Boolean,
    default: false,
  },
  showUser: {
    type: Boolean,
    default: false,
  },
  showOccupancy: {
    type: Boolean,
    default: false,
  },
  showGrc: {
    type: Boolean,
    default: false,
  },
  showReceipt: {
    type: Boolean,
    default: false,
  },
  hotelCode: String,
  status: {
    type: String,
    default: "Active",
    enum: {
      values: ["Active", "Inactive"],
      message: "Institute status can be - Active or Inactive",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//* institutionModel **********************************************
const Institution = mongoose.model("Institution", institutionSchema);
module.exports = Institution;
