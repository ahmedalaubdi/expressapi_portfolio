const mongoose = require("mongoose");

const workSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: { type: String, required: true },
    linkApp: { type: String, required: true },
    image: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Work", workSchema);
// exports.Products = Products;
