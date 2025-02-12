import mongoose, { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "student"] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

type IUser = {
  username: string;
  email: string;
  password: string;
  role: "admin" | "student";
  id?: string; // Add id as an optional property
  _id?: mongoose.Types.ObjectId; // Add _id for Mongoose documents
  createdAt?: Date;
  updatedAt?: Date;
};

// Enable the `id` virtual getter
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export default model<IUser>("User", UserSchema);
export { IUser };
