import express from "express";
import {
  SignUpHandler,
  SignInHandler,
  GoogleSignUpHandler,
  GoogleSignInHandler,
  readUserProfileHandler,
  updateUserProfileHandler,
} from "../../handlers/user_auth/index.js";
import { authenticateToken } from "../../handlers/user_auth/index.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  await SignUpHandler(req, res);
});

router.post("/signin", async (req, res) => {
  await SignInHandler(req, res);
});

router.post("/google-signup", async (req, res) => {
  await GoogleSignUpHandler(req, res);
});

router.post("/google-signin", async (req, res) => {
  await GoogleSignInHandler(req, res);
});

router.get("/read/profile", authenticateToken, readUserProfileHandler);

router.put("/update/profile", authenticateToken, updateUserProfileHandler);

export default router;
