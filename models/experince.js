const mongoose = require("mongoose");

const experinceSchema = mongoose.Schema(
  {
    expDate: { type: String, required: true },
    expTitle: { type: String, required: true },
    expDesc: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Experince", experinceSchema);
// exports.Products = Products;
