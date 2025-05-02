import express from "express";
import {
  GoogleVerifyHandler,
  GoogleSignUpHandler,
  GoogleSignInHandler,
} from "../../handlers/googleauth/index.js";

const router = express.Router();

// google social login endpoint
router.post("/verify", async (req, res) => {
  await GoogleVerifyHandler(req, res);
});

router.post("/signup", async (req, res) => {
  await GoogleSignUpHandler(req, res);
});

router.post("/signin", async (req, res) => {
  await GoogleSignInHandler(req, res);
});

export default router;
