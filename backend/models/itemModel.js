import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Item", itemSchema);
