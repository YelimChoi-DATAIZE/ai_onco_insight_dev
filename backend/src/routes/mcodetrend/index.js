import express from "express";
import {
  readmCODEKGHandler,
  readPubmedKeywordHandler,
  readPubmedArticleHandler,
  createmCODETrendFavoriteHandler,
} from "../../handlers/mcodetrend/index.js";
import { authenticateToken } from "../../handlers/user_auth/index.js";

const router = express.Router();

router.get("/mcodekg/read", readmCODEKGHandler);
router.get("/pubmed/article/read", readPubmedArticleHandler);
router.get("/pubmed/keyword/read", readPubmedKeywordHandler);
router.post(
  "/favorite/create",
  authenticateToken,
  createmCODETrendFavoriteHandler,
);

export default router;
