const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    iconService: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    titleModal: { type: String },
    descModal: [],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
// exports.Products = Products;
