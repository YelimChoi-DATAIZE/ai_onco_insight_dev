import express from "express";
import { getPubmedKeywordDataHandler } from "../../handlers/cancerkeywords/index.js";

const router = express.Router();

// 📌 mCODEKG 데이터 조회
router.get("/", getPubmedKeywordDataHandler);

export default router;
