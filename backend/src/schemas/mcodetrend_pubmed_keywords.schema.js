import mongoose from "mongoose";

const mcodeTrendPubmedKeywordSchema = new mongoose.Schema(
  {
    PMID: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    PubDate: {
      type: String,
      required: true,
    },
    Keywords: {
      type: String, // "keyword1; keyword2; keyword3"
      required: true,
    },
  },
  {
    collection: "mcodetrend_pubmed_keywords",
    timestamps: true,
  },
);

export const mcodeTrendPubmedKeywordModel = mongoose.model(
  "mcodetrend_pubmed_keywords",
  mcodeTrendPubmedKeywordSchema,
);
