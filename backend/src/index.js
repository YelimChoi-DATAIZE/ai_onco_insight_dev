import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import getAllmCODEKGHandler from "../src/routes/mcodekg/index.js";
import getPubMedArticlesHandler from "../src/routes/pubmed/index.js";
import GoogleAuthHandler from "../src/routes/googleauth/index.js";
import BasicAuthHandler from "../src/routes/basicauth/index.js";
import getPubmedKeywordDataHandler from "../src/routes/cancerkeywords/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 미들웨어 설정
app.use(
  cors({
    origin: "http://localhost:3000",
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

//routers..
app.use("/mcodekg", getAllmCODEKGHandler);
app.use("/pubmed", getPubMedArticlesHandler);
app.use("/googleauth", GoogleAuthHandler);
app.use("/basicauth", BasicAuthHandler);
app.use("/cancerkeywords", getPubmedKeywordDataHandler);

app.listen(PORT, () => {
  console.log(`Server Started: http://localhost:${PORT}`);
});
