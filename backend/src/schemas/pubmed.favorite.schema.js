import mongoose from "mongoose";

const pubmedFavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  pmid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

pubmedFavoriteSchema.index({ userId: 1, pmid: 1 }, { unique: true });

export const PubMedFavoriteModel = mongoose.model("pubmedfavorites", pubmedFavoriteSchema);