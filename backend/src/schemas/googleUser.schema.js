import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
  country: { type: String, required: true },
  company: { type: String, required: true },
  nickname: { type: String },
  studyIntroduction: { type: String },
  dataIntroduction: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const googleUserModel = mongoose.model("GoogleUser", userSchema);
