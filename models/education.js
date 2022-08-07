const mongoose = require("mongoose");

const educationSchema = mongoose.Schema(
  {
    eduDate: { type: String, required: true },
    eduTitle: { type: String, required: true },
    eduDesc: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);
// exports.Products = Products;
