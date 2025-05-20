import express from "express";
import {
  createProjectMetaHandler,
  readProjectMetaHandler,
  updateProjectMetaHandler,
  deleteProjectMetaHandler,
  readProjectMetaListHandler,
} from "../../handlers/project/index.js";
import { authenticateToken } from "../../handlers/user_auth/index.js";

const router = express.Router();

router.post("/create", authenticateToken, createProjectMetaHandler);
router.get("/read/:projectId", authenticateToken, readProjectMetaHandler);
router.put("/update/:projectId", authenticateToken, updateProjectMetaHandler);
router.delete(
  "/delete/:projectId",
  authenticateToken,
  deleteProjectMetaHandler,
);
router.get("/list/read", authenticateToken, readProjectMetaListHandler);

export default router;
