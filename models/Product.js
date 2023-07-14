const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    desc: { type: String, require: true },
    img: { type: String, require: true },
    weight: { type: Number, require: true },
    type: { type: String, require: true },
    thc: { type: Number, require: true },
    cbd: { type: Number, require: true },
    price: { type: Number },
    effect: { type: Array, default: [] },
    categories: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
