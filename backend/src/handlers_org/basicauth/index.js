import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../schemas/basicUser.schema.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dataize_ai_secret";

// basic signup
export const SignUpHandler = async (req, res) => {
  try {
    const { name, email, password, country, company, job } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "This email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      country,
      company,
      job,
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
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
        name: user.name,
        email: user.email,
        country: user.country,
        picture: null,
      },
    });
  } catch (error) {
    console.error("SignIn Error: ", error.message);
    res.status(500).json({ message: "An error occurred during login." });
  }
};
