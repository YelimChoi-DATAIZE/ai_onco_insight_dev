import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // bcrypt hashed
  country: String,
  company: String,
  job: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModel = mongoose.model("User", userSchema);
