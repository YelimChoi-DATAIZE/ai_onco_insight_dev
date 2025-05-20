import mongoose from "mongoose";

const UserLogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  action: {
    type: String,
    required: true,
    enum: ["submit_analysis", "view_result", "download", "delete", "edit"],
  },
  target: {
    type: String,
    required: true,
    enum: ["ttest", "anova", "regression", "descriptive", "upload"],
  },
  data_asset_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  solution_instance_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  result: {
    type: String,
    enum: ["success", "failed", "timeout"],
    default: "success",
  },
  ip_address: {
    type: String,
    default: null,
  },
  user_agent: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const UserLogModel = mongoose.model("user_log", UserLogSchema);
