import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import nodemailer from "nodemailer";
import randomToken from "random-token";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../../schemas/user_info.schema.js";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "dataize_ai_secret";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dataize_ai_secret",
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

// basic signup
export const SignUpHandler = async (req, res) => {
  try {
    const { name, email, password, country, company, job } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await userModel.findOne({
      email,
      auth_provider: "dataizeai",
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "This email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username: name,
      email,
      password_hash: hashedPassword,
      auth_provider: "dataizeai",
      country,
      company,
      job,
      profile_image: null,
      state: "active",
      role: "researcher",
    });

    await newUser.save();

    res.status(201).json({ message: "Registration completed successfully." });
  } catch (error) {
    console.error("SignUp Error: ", error.message);

    // 💡 Mongoose validation 에러 포맷 처리
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Input validation error",
        errors: messages, // ex: ["Path `company` is required."]
      });
    }

    res.status(500).json({ message: "An error occurred during registration." });
  }
};

// basic signin
export const SignInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "6h" },
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username || "",
        profile_image: user.profile_image || null,
        country: user.country || "",
        company: user.company || "",
        job: user.job || "",
        role: user.role || "researcher",
        state: user.state || "active",
      },
    });
  } catch (error) {
    console.error("SignIn Error: ", error.message);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

export const GoogleVerifyHandler = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send("Access token is required.");
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const { email, name, picture } = response.data;

    const user = await userModel.findOne({ email, auth_provider: "google" });

    if (user) {
      // already registered user
      return res.status(200).json({
        message: "이미 가입된 회원입니다. 로그인을 해주세요.",
        user,
      });
    }

    // new user
    return res.status(200).json({ isNewUser: true });
  } catch (error) {
    console.error("SignUp Error: ", error.message);
    res.status(500).send("SignUp Error Occurred.");
  }
};

// google sign up handler
export const GoogleSignUpHandler = async (req, res) => {
  const { country, company, job } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    // get google user info using the token
    const googleResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const { email, name, picture, id: googleId } = googleResponse.data;

    let user = await userModel.findOne({ email, auth_provider: "google" });

    if (!user) {
      user = new userModel({
        email,
        username: name,
        profile_image: picture,
        auth_provider: "google",
        google_id: googleId,
        country,
        company,
        job,
      });

      await user.save();
    } else {
      user.country = country;
      user.company = company;
      user.job = job;
      await user.save();
    }

    res.status(200).json({
      message: "User registration completed successfully.",
    });
  } catch (error) {
    console.error("Registration Error: ", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
        errors: error.errors,
      });
    }

    res.status(500).json({ message: "An error occurred during registration." });
  }
};

// google login handler
export const GoogleSignInHandler = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send("Access token is required.");
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const { email, name, picture, id: googleId } = response.data;

    let user = await userModel.findOne({ email, auth_provider: "google" });

    // 구글 로그인 후 첫 방문이면 DB에 사용자 추가
    if (!user) {
      user = new userModel({
        email,
        username: name,
        profile_image: picture,
        auth_provider: "google",
        google_id: googleId,
        state: "active",
        role: "researcher",
      });

      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "6h" },
    );

    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profile_image: user.profile_image,
        role: user.role,
        state: user.state,
      },
    });
  } catch (error) {
    console.error("[Verification Error]:", error);
    res.status(500).send("Login Error Occurred.");
  }
};

// GET /api/user/profile
export const readUserProfileHandler = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const user = await userModel
      .findById(userId)
      .select(
        "username email profile_image country company job auth_provider role state created_at updated_at",
      );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ profile: user });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ message: "Failed to retrieve profile." });
  }
};

// PUT /api/user/profile
export const updateUserProfileHandler = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { username, profile_image, country, company, job } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const user = await userModel.findById({ userId, auth_provider: "google" });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (username) user.username = username;
    if (profile_image) user.profile_image = profile_image;
    if (country) user.country = country;
    if (company) user.company = company;
    if (job) user.job = job;

    user.updated_at = new Date();
    await user.save();

    res
      .status(200)
      .json({ message: "Profile updated successfully.", profile: user });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ message: "Failed to update profile." });
  }
};
