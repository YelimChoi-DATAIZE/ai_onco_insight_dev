import mongoose from "mongoose";

const mCODETrendmCODEKGSchema = new mongoose.Schema({
  ProfileName: { type: String, required: true },
  VSname: { type: String, required: true },
  Code: { type: String, required: true },
  System: { type: String, required: true },
  Display: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, required: true },
});

export const mCODETrendmCODEKGModel = mongoose.model(
  "mcodetrend_mcodekg",
  mCODETrendmCODEKGSchema,
);
