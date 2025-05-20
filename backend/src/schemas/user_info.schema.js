import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: false,
  },
  auth_provider: {
    type: String,
    enum: ["google", "dataizeai"],
    required: true,
  },
  google_id: {
    type: String,
    default: null,
  },
  password_hash: {
    type: String,
    default: null,
  },
  profile_image: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    enum: ["active", "suspended", "deleted"],
    default: "active",
  },
  role: {
    type: String,
    enum: ["researcher", "admin"],
    default: "researcher",
  },
  country: {
    type: String,
    default: null,
  },
  company: {
    type: String,
    default: null,
  },
  job: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// updated_at 자동 갱신
UserSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

export const userModel = mongoose.model("user_info", UserSchema);
