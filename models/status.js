import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.model("Status", statusSchema);

export default Status;
