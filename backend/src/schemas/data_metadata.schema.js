import mongoose from "mongoose";

const DataMetaDataSchema = new mongoose.Schema({
  asset_id: {
    type: String,
    required: true,
    index: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  project_id: {
    type: String,
    default: null,
  },
  file_name: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
    default: "v1",
  },
  version_description: {
    type: String,
    default: "",
  },
  parent_version_id: {
    type: String,
    default: null,
  },
  is_latest: {
    type: Boolean,
    default: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },

  data_source_type: {
    type: String,
    enum: ["file", "api", "manual"],
    default: "file",
  },
  data_storage_type: {
    type: String,
    enum: ["s3"],
    default: "s3",
  },
  data_storage_config: {
    type: Object, // ex: { bucket: "survey-data", path: "user123/survey_v1.csv" }
    required: true,
  },
  uri: {
    type: String,
    required: true, // S3 URI or presigned URL
  },

  file_size: {
    type: Number,
    default: 0,
  },
  row_count: {
    type: Number,
    default: 0,
  },
  column_count: {
    type: Number,
    default: 0,
  },
  executed: {
    type: Boolean,
    default: false,
  },
  issued: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
});

DataMetaDataSchema.pre("save", function (next) {
  this.modified = new Date();
  next();
});

export const DataMetaDataModel = mongoose.model(
  "data_metadata",
  DataMetaDataSchema,
);
