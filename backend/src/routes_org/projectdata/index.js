import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import {
  createProjectHandler,
  saveToGridFsHandler,
} from "../../handlers/projectdata/index.js";
import { authenticateToken } from "../../handlers/auth/index.js";

const router = express.Router();

// GridFS storage 설정
const storage = new GridFsStorage({
  url: "mongodb+srv://katechoi:93smedidataize@dataizeaicluster.uxec8.mongodb.net/?retryWrites=true&w=majority&appName=DataizeAICluster",
  file: (req, file) => ({
    filename: `projectdata-${Date.now()}`,
    bucketName: "uploads",
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 파일 크기 제한
    fieldSize: 50 * 1024 * 1024, // 텍스트 데이터 크기 제한
  },
});

router.post("/projectid_create", authenticateToken, createProjectHandler);
router.post("/save", upload.single("file"), saveToGridFsHandler);

export default router;
