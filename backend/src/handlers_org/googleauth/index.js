import jwt from "jsonwebtoken";
import { googleUserModel } from "../../schemas/googleUser.schema.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "dataize_ai_secret";

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

    let user = await googleUserModel.findOne({ email });

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
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const { email, name, picture } = googleResponse.data;

    let user = await googleUserModel.findOne({ email });

    if (!user) {
      user = new googleUserModel({
        email,
        name,
        picture,
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

    const { email, name, picture } = response.data;
    let user = await googleUserModel.findOne({ email });

    const jwtToken = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "6h" },
    );

    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
      user: { email, name, picture, id: user._id },
    });
  } catch (error) {
    console.error("[Verification Error]:", error);
    res.status(500).send("Login Error Occurred.");
  }
};
