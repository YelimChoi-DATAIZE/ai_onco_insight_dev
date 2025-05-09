import express from "express";
import { getPubmedKeywordDataHandler } from "../../handlers/cancerkeywords/index.js";

const router = express.Router();

router.get("/", getPubmedKeywordDataHandler);

export default router;
