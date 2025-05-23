import dotenv from "dotenv";
import nodemailer from "nodemailer";
import randomToken from "random-token";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { userModel } from "../../schemas/user.schema.js";
// import { roleModel } from "../../schemas/role.schema.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// export const loginRouteHandler = async (req, res, email, password) => {
//   //Check If User Exists
//   let foundUser = await userModel.findOne({ email: email });
//   if (foundUser == null) {
//     return res.status(400).json({
//       errors: [
//         {
//           detail:
//             "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.",
//         },
//       ],
//     });
//   } else {
//     const validPassword = await bcrypt.compare(password, foundUser.password);
//     if (validPassword) {
//       // Generate JWT token
//       const token = jwt.sign(
//         { id: foundUser.id, email: foundUser.email },
//         "token",
//         {
//           expiresIn: "24h",
//         },
//       );
//       // 쿠키에 토큰 저장
//       res.cookie("authToken", token, {
//         httpOnly: true, // HTTP(S)를 통해서만 쿠키 접근 가능
//         secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서는 HTTPS를 통해서만 쿠키 전송
//         sameSite: "strict", // CSRF 공격 방지
//         maxAge: 24 * 60 * 60 * 1000, // 쿠키 유효 기간 (예: 24시간)
//       });
//       return res.json({
//         token_type: "Bearer",
//         expires_in: "24h",
//         access_token: token,
//         refresh_token: token,
//       });
//     } else {
//       return res.status(400).json({
//         errors: [{ detail: "Invalid password" }],
//       });
//     }
//   }
// };

// export const registerRouteHandler = async (req, res, name, email, password) => {
//   // check if user already exists
//   let foundUser = await userModel.findOne({ email: email });
//   if (foundUser) {
//     // does not get the error
//     return res.status(400).json({ message: "The email is already in use" });
//   }

//   // check password to exist and be at least 8 characters long
//   if (!password || password.length < 8) {
//     return res
//       .status(400)
//       .json({ message: "The password must be at least 8 characters long." });
//   }

//   // hash password to save in db
//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(password, salt);

//   let adminRole = await roleModel.findOne({ name: "admin" });

//   const newUser = new userModel({
//     name: name,
//     email: email,
//     password: hashPassword,
//   });
//   newUser.role = adminRole;
//   await newUser.save();

//   // Generate JWT token
//   const token = jwt.sign({ id: newUser.id, email: newUser.email }, "token", {
//     expiresIn: "24h",
//   });
//   return res.status(200).json({
//     token_type: "Bearer",
//     expires_in: "24h",
//     access_token: token,
//     refresh_token: token,
//   });
// };

// export const forgotPasswordRouteHandler = async (req, res, email) => {
//   let foundUser = await userModel.findOne({ email: email });

//   if (!foundUser) {
//     return res.status(400).json({
//       errors: { email: ["The email does not match any existing user."] },
//     });
//   } else {
//     let token = randomToken(20);
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: "admin@jsonapi.com", // sender address
//       to: email, // list of receivers
//       subject: "Reset Password", // Subject line
//       html: `<p>You requested to change your password.If this request was not made by you please contact us. Access <a href='${process.env.APP_URL_CLIENT}/auth/reset-password?token=${token}&email=${email}'>this link</a> to reste your password </p>`, // html body
//     });
//     const dataSent = {
//       data: "password-forgot",
//       attributes: {
//         redirect_url: `${process.env.APP_URL_API}/password-reset`,
//         email: email,
//       },
//     };
//     return res.status(204).json(dataSent);
//   }
// };

// export const resetPasswordRouteHandler = async (req, res) => {
//   const foundUser = await userModel.findOne({
//     email: req.body.data.attributes.email,
//   });

//   if (!foundUser) {
//     return res.status(400).json({
//       errors: { email: ["The email does not match any existing user."] },
//     });
//   } else {
//     const { password, password_confirmation } = req.body.data.attributes;
//     // validate password
//     if (password.length < 8) {
//       return res.status(400).json({
//         errors: {
//           password: ["The password should have at lest 8 characters."],
//         },
//       });
//     }

//     if (password != password_confirmation) {
//       return res.status(400).json({
//         errors: {
//           password: ["The password and password confirmation must match."],
//         },
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     await userModel.updateOne(
//       { email: foundUser.email },
//       { $set: { password: hashPassword } },
//     );
//     return res.sendStatus(204);
//   }
// };

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dataize_ai_secret",
    );
    req.user = decoded; // token payload: { id, email, ... }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};
