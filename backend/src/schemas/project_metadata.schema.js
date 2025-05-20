import mongoose from "mongoose";

const ProjectMetaDataSchema = new mongoose.Schema({
  _id: { type: String },
  projectName: { type: String, required: true },
  userId: { type: String, required: true },
  filename: { type: String },
  fileId: { type: mongoose.Schema.Types.ObjectId },
  updatedAt: { type: Date, default: Date.now },
});

export const ProjectMetaDataModel = mongoose.model(
  "project_metadata",
  ProjectMetaDataSchema,
);
