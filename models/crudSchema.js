const mongoose = require("mongoose");
const crudSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "must provide product name"],
      trim: true,
      maxlength: [100, "Product name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "must provide price"],
      trim: true,
      min: [1, " minimum price is 1 "],
      max: [1000, "max price is 1000"],
    },
    desc: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("crudSchema", crudSchema);
