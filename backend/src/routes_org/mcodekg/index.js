import express from "express";
import { getAllmCODEKGHandler } from "../../handlers/mcodekg/index.js";

const router = express.Router();

// 📌 mCODEKG 데이터 조회
router.get("/", getAllmCODEKGHandler);

export default router;
