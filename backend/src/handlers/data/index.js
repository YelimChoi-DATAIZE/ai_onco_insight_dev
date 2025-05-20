import mongoose from "mongoose";
import { DataMetaDataModel } from "../../schemas/data_metadata.schema.js";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const s3 = new AWS.S3();

// ✅ CREATE - 메타데이터 저장
export const createMetaDataHandler = async (req, res) => {
  try {
    const {
      asset_id,
      user_id,
      project_id,
      file_name,
      version,
      version_description,
      parent_version_id,
      is_latest,
      is_deleted,
      data_source_type,
      data_storage_type,
      data_storage_config,
      uri,
      file_size,
      row_count,
      column_count,
      executed,
    } = req.body;

    if (!asset_id || !user_id || !file_name || !uri || !data_storage_config) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMeta = new DataMetaDataModel({
      asset_id,
      user_id,
      project_id,
      file_name,
      version,
      version_description,
      parent_version_id,
      is_latest,
      is_deleted,
      data_source_type,
      data_storage_type,
      data_storage_config,
      uri,
      file_size,
      row_count,
      column_count,
      executed,
    });

    const saved = await newMeta.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("[Create Metadata Error]", err);
    res.status(500).json({ message: "Server error while saving metadata" });
  }
};

// ✅ READ - 특정 asset_id 혹은 user_id로 조회
export const readMetaDataHandler = async (req, res) => {
  try {
    const asset_id = req.params.asset_id;

    if (!asset_id) {
      return res.status(400).json({ message: "asset_id is required" });
    }

    const result = await DataMetaDataModel.findOne({
      asset_id,
      user_id: req.user.id,
      is_deleted: false,
    }).sort({ issued: -1 });

    if (!result) return res.status(404).json({ message: "Metadata not found" });

    res.status(200).json(result);
  } catch (err) {
    console.error("[Read Metadata Error]", err);
    res.status(500).json({ message: "Failed to retrieve metadata" });
  }
};

// ✅ UPDATE - 특정 asset_id에 대해 메타데이터 갱신
export const updateMetaDataHandler = async (req, res) => {
  try {
    const { asset_id } = req.params;
    const updateFields = req.body;

    const updated = await DataMetaDataModel.findOneAndUpdate(
      { asset_id },
      { ...updateFields, modified: new Date() },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Metadata not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("[Update Metadata Error]", err);
    res.status(500).json({ message: "Failed to update metadata" });
  }
};

// ✅ DELETE - soft delete (is_deleted = true)
export const deleteMetaDataHandler = async (req, res) => {
  try {
    const { asset_id } = req.params;

    const deleted = await DataMetaDataModel.findOneAndUpdate(
      { asset_id },
      { is_deleted: true, modified: new Date() },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({ message: "Metadata not found" });
    }

    res.status(200).json({ message: "Metadata marked as deleted", deleted });
  } catch (err) {
    console.error("[Delete Metadata Error]", err);
    res.status(500).json({ message: "Failed to delete metadata" });
  }
};

// 멀터 메모리 스토리지 (버퍼로 받음)
const upload = multer({ storage: multer.memoryStorage() });

export const createDataFileHandler = [
  upload.single("file"),
  async (req, res) => {
    try {
      const {
        project_id,
        version = "v1",
        version_description = "",
        row_count = 0,
        column_count = 0,
      } = req.body;

      const user_id = req.user?.id;
      const file = req.file;

      if (!file || !user_id) {
        return res.status(400).json({ message: "Missing file or user ID" });
      }

      const bucket = "your-s3-bucket-name"; // replace with your bucket
      const asset_id = new mongoose.Types.ObjectId(); // 새 asset_id
      const key = `user-${user_id}/${asset_id.toString()}/${version}/${file.originalname}`;

      // 1. S3에 파일 업로드
      const uploadResult = await s3
        .upload({
          Bucket: bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      // 2. 메타데이터 저장
      const metadata = new DataMetaDataModel({
        asset_id,
        user_id,
        project_id: project_id || null,
        file_name: file.originalname,
        version,
        version_description,
        parent_version_id: null,
        is_latest: true,
        is_deleted: false,
        data_source_type: "file",
        data_storage_type: "s3",
        data_storage_config: {
          bucket,
          path: key,
        },
        uri: uploadResult.Location,
        file_size: file.size,
        row_count: parseInt(row_count),
        column_count: parseInt(column_count),
        executed: false,
      });
      const saved = await metadata.save();

      res.status(201).json({
        message: "File uploaded and metadata saved",
        asset_id,
        metadata: saved,
      });
    } catch (err) {
      console.error("[Upload + Metadata Error]", err);
      res
        .status(500)
        .json({ message: "Failed to upload file or save metadata" });
    }
  },
];

// S3에서 파일 내용 조회
export const readDataFileHandler = async (req, res) => {
  try {
    const { asset_id } = req.params;

    // 1. MongoDB에서 metadata 조회
    const metadata = await DataMetaDataModel.findOne({
      asset_id,
      user_id: req.user.id,
      is_deleted: false,
    });
    if (!metadata) {
      return res.status(404).json({ message: "Metadata not found" });
    }

    const { bucket, path } = metadata.data_storage_config;
    if (!bucket || !path) {
      return res.status(400).json({ message: "Invalid S3 path in metadata" });
    }

    // 2. S3에서 파일 가져오기
    const s3Object = await s3
      .getObject({
        Bucket: bucket,
        Key: path,
      })
      .promise();

    const contentType = metadata.uri.includes(".json")
      ? "application/json"
      : "text/csv";
    const fileContent = s3Object.Body.toString("utf-8");

    // 3. JSON 파싱 (선택적)
    if (contentType === "application/json") {
      return res.status(200).json(JSON.parse(fileContent));
    }

    // CSV 등 텍스트 반환
    res.status(200).send(fileContent);
  } catch (err) {
    console.error("[Read S3 File Error]", err);
    res.status(500).json({ message: "Failed to read file from S3" });
  }
};
