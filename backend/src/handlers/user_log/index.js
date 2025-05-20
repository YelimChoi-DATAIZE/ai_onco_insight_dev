import { UserLogModel } from "../../schemas/user_log.schema.js";
import mongoose from "mongoose";

// ✅ CREATE: 사용자 로그 저장
export const createUserLogHandler = async (req, res) => {
  try {
    const {
      project_id,
      action,
      target,
      data_asset_id,
      solution_instance_id,
      payload,
      result,
    } = req.body;

    const user_id = req.user?.id;
    const ip_address = req.ip || req.headers["x-forwarded-for"] || null;
    const user_agent = req.headers["user-agent"] || null;

    if (!user_id || !project_id || !action || !target) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const log = new UserLogModel({
      user_id,
      project_id,
      action,
      target,
      data_asset_id,
      solution_instance_id,
      payload,
      result,
      ip_address,
      user_agent,
      timestamp: new Date(),
    });

    await log.save();
    res.status(201).json({ message: "User log created successfully", log });
  } catch (err) {
    console.error("[Create User Log Error]", err);
    res.status(500).json({ message: "Failed to create user log" });
  }
};

// ✅ READ: 특정 user_id 또는 project_id 기반 로그 조회
export const readUserLogHandler = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { project_id } = req.query;

    const query = { user_id };
    if (project_id) query.project_id = project_id;

    const logs = await UserLogModel.find(query)
      .sort({ timestamp: -1 })
      .limit(100);
    res.status(200).json(logs);
  } catch (err) {
    console.error("[Read User Logs Error]", err);
    res.status(500).json({ message: "Failed to fetch user logs" });
  }
};

// ✅ DELETE: 로그 삭제 (보통 사용하지 않지만 예시로 제공)
export const deleteUserLogHandler = async (req, res) => {
  try {
    const { log_id } = req.params;

    const deleted = await UserLogModel.findByIdAndDelete(log_id);
    if (!deleted) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.status(200).json({ message: "User log deleted successfully" });
  } catch (err) {
    console.error("[Delete User Log Error]", err);
    res.status(500).json({ message: "Failed to delete user log" });
  }
};
