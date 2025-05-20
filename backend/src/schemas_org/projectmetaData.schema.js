import mongoose from "mongoose";

const ProjectMetaSchema = new mongoose.Schema({
  _id: { type: String },
  projectName: { type: String, required: true },
  userId: { type: String, required: true },
  filename: { type: String },
  fileId: { type: mongoose.Schema.Types.ObjectId },
  updatedAt: { type: Date, default: Date.now },
});

export const ProjectMetaModel = mongoose.model(
  "ProjectMeta",
  ProjectMetaSchema,
);
