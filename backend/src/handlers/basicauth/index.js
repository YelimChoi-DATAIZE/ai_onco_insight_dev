import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../schemas/basicUser.schema.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dataize_ai_secret";

// basic signup
export const SignUpHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      country,
      company,
      studyIntroduction,
      dataIntroduction,
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "이미 등록된 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      country,
      company,
      studyIntroduction,
      dataIntroduction,
    });

    await newUser.save();

    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error("SignUp Error: ", error.message);
    res.status(500).json({ message: "회원가입 중 오류가 발생했습니다." });
  }
};

// basic signin
export const SignInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "6h" },
    );

    res.status(200).json({
      message: "로그인 성공",
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
    res.status(500).json({ message: "로그인 중 오류가 발생했습니다." });
  }
};
