import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    username: { type: String, required: true },
    limit: { type: Number },
  },
  { timestamps: true }
);

// Create a compound index to ensure the combination of username, type, and name is unique
categoriesSchema.index({ username: 1, type: 1, name: 1 }, { unique: true });

const Categories =
  mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);

export default Categories;
