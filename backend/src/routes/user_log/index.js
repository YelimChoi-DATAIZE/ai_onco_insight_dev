import express from "express";
import {
  createUserLogHandler,
  readUserLogHandler,
  deleteUserLogHandler,
} from "../../handlers/user_log/index.js";
import { authenticateToken } from "../../handlers/user_auth/index.js";

const router = express.Router();

router.post("/create", authenticateToken, createUserLogHandler);
router.get("/read", authenticateToken, readUserLogHandler);
router.delete("/delete/:log_id", authenticateToken, deleteUserLogHandler);

export default router;
