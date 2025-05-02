import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { mCODEKG } from "../schemas/mcodekg.schema.js";

dotenv.config();

// MongoDB Atlas 연결
const uri =
  "mongodb+srv://katechoi:93smedidataize@dataizeaicluster.uxec8.mongodb.net/?retryWrites=true&w=majority&appName=DataizeAICluster";
// const uri = "mongodb+srv://katechoi:93smedidataize@dataizeai.uxec8.mongodb.net/?retryWrites=true&w=majority&appName=DataizeAI";

const uploadmCODEKG = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "dataizeai",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Atlas에 연결됨");

    // JSON 데이터 로드 (디버깅 코드 추가)
    console.log("📂 JSON 파일 읽는 중...");
    const rawData = fs.readFileSync(
      "C:/Users/yelim/Downloads/mcode_data_json_v3.json",
      "utf-8",
    );

    let mcodekgs;
    try {
      mcodekgs = JSON.parse(rawData);
      console.log("✅ JSON 파싱 성공! 데이터 개수:", mcodekgs.length);
    } catch (jsonError) {
      console.error("❌ JSON 파싱 오류 발생:", jsonError.message);
      return;
    }

    // 데이터를 작은 단위(batch)로 나누어 처리
    const batchSize = 5000; // 한 번에 업로드할 데이터 개수
    for (let i = 0; i < mcodekgs.length; i += batchSize) {
      const batch = mcodekgs.slice(i, i + batchSize);

      console.log(
        `📤 Batch ${i / batchSize + 1} 업로드 중... (${i}~${i + batch.length})`,
      );

      try {
        await mCODEKG.insertMany(batch);
        console.log(`✅ Batch ${i / batchSize + 1} 업로드 완료!`);
      } catch (mongoError) {
        console.error(
          `❌ Batch ${i / batchSize + 1} 업로드 실패:`,
          mongoError.message,
        );
        console.error("문제 발생한 데이터 샘플:", batch.slice(0, 5)); // 첫 5개 데이터 샘플 출력
        break;
      }
    }

    console.log("🎉 모든 데이터 업로드 완료!");
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ 데이터 업로드 실패:", error);
    await mongoose.connection.close();
  }
};

// 실행
uploadmCODEKG();
