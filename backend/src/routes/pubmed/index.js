import express from "express";
import { getPubMedArticlesHandler } from "../../handlers/pubmed/index.js";

const router = express.Router();

router.get("/", getPubMedArticlesHandler);

export default router;
