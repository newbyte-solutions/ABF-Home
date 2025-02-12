import mongoose, { Schema, Document, Int32 } from "mongoose";

interface ISession extends Document {
  mongoUrl: string;
  ttl: Int32;
  createdAt: Date;
}

const SessionSchema: Schema = new Schema({
  mongoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  ttl: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Session = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
