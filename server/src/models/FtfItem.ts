import mongoose from "mongoose";

const FtfItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["alpine", "bicycle", "camping"],
    required: true,
  },
  type: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String }],
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number },
      comment: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  availability: { type: Boolean, default: true },
  ageRating: { type: String, required: true },
  ageRequirements: {
    minimum: { type: Number },
    maximum: { type: Number },
  },
  specs: { type: mongoose.Schema.Types.Mixed },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  logs: { type: mongoose.Schema.Types.Mixed },
  status: {
    type: String,
    enum: ["active", "inactive", "maintenance"],
    default: "active",
  },
  currentUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FtfItem", FtfItemSchema);
