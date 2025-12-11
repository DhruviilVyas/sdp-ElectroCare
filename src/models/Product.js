import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  category: { type: String, required: true },
  modelId: { type: String, required: true },
  serialNumber: { type: String, required: true },

  imeiNumber: { type: String },

  purchaseDate: { type: String, required: true },
  warrantyPeriod: { type: String, required: true },

  invoiceUrl: { type: String },  // uploaded file
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
