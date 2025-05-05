import express from "express";
import { getPubMedArticlesHandler } from "../../handlers/pubmed/index.js";
import { addFavoriteHandler } from "../../handlers/pubmed/index.js";
import { authenticateToken } from "../../handlers/auth/index.js";

const router = express.Router();

router.get("/", getPubMedArticlesHandler);
router.post("/favorites", authenticateToken, addFavoriteHandler);

export default router;