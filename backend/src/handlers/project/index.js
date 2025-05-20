import { ProjectMetaDataModel } from "../../schemas/project_metadata.schema.js";
import mongoose from "mongoose";

// ✅ CREATE: 프로젝트 생성
export const createProjectMetaHandler = async (req, res) => {
  console.log("[API] POST /projectid_create");
  const { projectId, projectName } = req.body;
  const userId = req.user?.id;

  if (!projectId || !projectName || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const newProject = new ProjectMetaDataModel({
      _id: projectId, // 수동 지정 시 문자열로 사용
      projectName,
      userId,
      updatedAt: new Date(),
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (err) {
    console.error("[Create Project Error]", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// ✅ READ: 사용자별 프로젝트 조회
export const readProjectMetaHandler = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user?.id;

  if (!projectId || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const project = await ProjectMetaDataModel.findOne({
      _id: projectId,
      userId,
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json(project);
  } catch (err) {
    console.error("[Read Project Error]", err);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// ✅ UPDATE: 프로젝트 이름 변경 등
export const updateProjectMetaHandler = async (req, res) => {
  console.log("[API] PUT /project/:projectId");
  const { projectId } = req.params;
  const { projectName } = req.body;
  const userId = req.user?.id;

  if (!projectId || !projectName || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const updated = await ProjectMetaDataModel.findOneAndUpdate(
      { _id: projectId, userId },
      { projectName, updatedAt: new Date() },
      { new: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json({ message: "Project updated successfully", updated });
  } catch (err) {
    console.error("[Update Project Error]", err);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// ✅ DELETE: 프로젝트 삭제
export const deleteProjectMetaHandler = async (req, res) => {
  console.log("[API] DELETE /project/:projectId");
  const { projectId } = req.params;
  const userId = req.user?.id;

  if (!projectId || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const deleted = await ProjectMetaDataModel.findOneAndDelete({
      _id: projectId,
      userId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("[Delete Project Error]", err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

// ✅ 사용자별 프로젝트 이름만 반환하는 API
export const readProjectMetaListHandler = async (req, res) => {
  console.log("[API] GET /project-names");
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const projectNames = await ProjectMetaDataModel.find(
      { userId },
      "projectName _id",
    ).sort({ updatedAt: -1 });

    // 반환 형태: [{ _id, projectName }]
    res.status(200).json(projectNames);
  } catch (err) {
    console.error("[Get Project Names Error]", err);
    res.status(500).json({ message: "Failed to fetch project names" });
  }
};
