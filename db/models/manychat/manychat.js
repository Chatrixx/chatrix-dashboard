import mongoose from "mongoose";

export const ManyChatMessageSchema = new mongoose.Schema(
  mongoose.Schema.Types.Mixed
);

export default mongoose.models.ManyChatMessage ||
  mongoose.model("ManyChatMessage", ManyChatMessageSchema);
