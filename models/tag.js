const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    totalNum: { type: String },
    titleTag: { type: String },
    descTag: { type: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
// exports.Products = Products;
