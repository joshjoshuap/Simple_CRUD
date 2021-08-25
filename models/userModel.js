const mongoose = require("mongoose");
const { Schema } = mongoose;

// Creating Models
const userInfo = {
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  contact: {
    type: Number,
  },
};

// Creating Schema
const dataSchema = new Schema(userInfo, { collection: "userData" });

const UserData = mongoose.model("userData", dataSchema);

module.exports = UserData; // to export UserData variable of userModel.js
