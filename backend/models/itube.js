const mongoose = require("mongoose");
const ITubeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("ITube", ITubeSchema);