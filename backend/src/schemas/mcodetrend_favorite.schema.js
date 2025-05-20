import mongoose from "mongoose";

const mCODETrendFavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  pmid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

mCODETrendFavoriteSchema.index({ userId: 1, pmid: 1 }, { unique: true });

export const mCODETrendFavoritesModel = mongoose.model(
  "mcodetrend_favorites",
  mCODETrendFavoriteSchema,
);
