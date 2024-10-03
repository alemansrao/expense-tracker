import mongoose, { Schema } from "mongoose";

const transactionsSchema = new Schema(
  {
    username: { type: String, required: true },
    category_id: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

// Use mongoose.models instead of mongoose.model to avoid overwriting the model
const Transactions = mongoose.models.Transaction || mongoose.model("Transaction", transactionsSchema);

export default Transactions;
