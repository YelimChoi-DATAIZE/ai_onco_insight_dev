import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  userAuthRoutes,
  userLogRoutes,
  dataRoutes,
  projectRoutes,
  mcodeTrendRoutes,
} from "./routes/index.js";
import { swaggerUi, swaggerSpec } from './swagger/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 미들웨어 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
// const uri = `${process.env.DB_LINK}`;
const uri = `mongodb+srv://katechoi:93smedidataize@dataizeaicluster.uxec8.mongodb.net/?retryWrites=true&w=majority&appName=DataizeAICluster`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "dataizeai",
  })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => console.error("MongoDB Atlas connection failured:", error));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/user-auth", userAuthRoutes);
app.use("/api/user-log", userLogRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/mcodetrend", mcodeTrendRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server Started: http://localhost:${PORT}`);
});
