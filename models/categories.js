import mongoose, { Schema } from "mongoose";


const categoriesSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        username: { type: String, required: true },
    },
    { timestamps: true }
);

const Categories = mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);

export default Categories;