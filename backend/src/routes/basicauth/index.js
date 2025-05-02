import express from "express";
import {
  SignUpHandler,
  SignInHandler,
} from "../../handlers/basicauth/index.js";

const router = express.Router();

// basic login endpoint
router.post("/signup", async (req, res) => {
  await SignUpHandler(req, res);
});

router.post("/signin", async (req, res) => {
  await SignInHandler(req, res);
});

export default router;
