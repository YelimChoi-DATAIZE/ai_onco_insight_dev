import express from "express";
import {
  createMetaDataHandler,
  readMetaDataHandler,
  updateMetaDataHandler,
  deleteMetaDataHandler,
  createDataFileHandler,
  readDataFileHandler,
} from "../../handlers/data/index.js";
import { authenticateToken } from "../../handlers/user_auth/index.js";

const router = express.Router();

router.post("/metadata/create", authenticateToken, createMetaDataHandler);
router.get("/metadata/read/:asset_id", authenticateToken, readMetaDataHandler);
router.put(
  "/metadata/update/:asset_id",
  authenticateToken,
  updateMetaDataHandler,
);
router.delete(
  "/metadata/delete/:asset_id",
  authenticateToken,
  deleteMetaDataHandler,
);
router.post("/dataasset/create", authenticateToken, createDataFileHandler);
router.get("/dataasset/read/:asset_id", authenticateToken, readDataFileHandler);

export default router;
