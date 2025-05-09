import mongoose from 'mongoose';

const ProjectMetaSchema = new mongoose.Schema({
  projectName: { type: String },
  filename: { type: String },
  fileId: { type: mongoose.Schema.Types.ObjectId },
  updatedAt: { type: Date, default: Date.now },
});

export const ProjectMetaModel = mongoose.model('ProjectMeta', ProjectMetaSchema);
