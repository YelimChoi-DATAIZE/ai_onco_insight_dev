import mongoose from "mongoose";

const mcodekgschema = new mongoose.Schema({
  ProfileName: { type: String, required: true },
  VSname: { type: String, required: true },
  Code: { type: String, required: true },
  System: { type: String, required: true },
  Display: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, required: true }, // path
});

export const mCODEKG = mongoose.model("mCODESearch", mcodekgschema);
