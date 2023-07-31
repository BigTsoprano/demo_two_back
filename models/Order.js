const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    // userId: { type: String, require: true },
    product: [
      {
        productID: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, require: true },
    // address: { type: Object, require: true },

    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    birthday: { type: String, require: true },
    email: { type: String, require: true },
    medicalCardNumber: { type: String },
    state: { type: String },
    medicalCardExpiration: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// const OrderSchema = mongoose.Schema(
//   {
//     // userId: { type: String, require: true },
//     product: [
//       {
//         productID: { type: String },
//         quantity: { type: Number, default: 1 },
//       },
//     ],
//     amount: { type: Number, require: true },
//     address: { type: Object, require: true },
//     status: { type: String, default: "pending" },
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Order", OrderSchema);
