import mongoose from "mongoose";

const cancerPubmedKeywordSchema = new mongoose.Schema(
  {
    PMID: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    PubDate: {
      type: String, // 또는 Date, 아래 설명 참고
      required: true,
    },
    Keywords: {
      type: String, // "keyword1; keyword2; keyword3" 형식
      required: true,
    },
  },
  {
    collection: "cancer_pubmed_keywords", // 실제 MongoDB 컬렉션명
    timestamps: true, // createdAt, updatedAt 자동 추가
  },
);

// 모델 등록
export const cancer_pubmed_keywords = mongoose.model(
  "cancer_pubmed_keywords",
  cancerPubmedKeywordSchema,
);
