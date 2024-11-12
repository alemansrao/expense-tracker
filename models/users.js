import mongoose, { Schema } from "mongoose";

const appUsersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

appUsersSchema.index({ email: 1 }, { unique: true });

// Safely retrieve or define the model
const AppUsers = mongoose.models.Appusers || mongoose.model("Appusers", appUsersSchema);

export default AppUsers;
