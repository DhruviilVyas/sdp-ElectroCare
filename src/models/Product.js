import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  
  // ADD THIS: The name is essential for display (e.g., "Smartphone - Samsung S23")
  name: { type: String, required: true }, 
  
  category: { type: String, required: true },
  model: { type: String, required: true },
  serialNumber: { type: String, required: true },
  imeiNumber: { type: String },
  purchaseDate: { type: Date, required: true },
  warrantyStatus: { type: String, required: true },
  price: { type: Number, default: 20000 },
  invoiceUrl: { type: String },
  image: { type: String },
}, { timestamps: true });

// Delete cache to prevent schema conflicts
if (mongoose.models.Product) delete mongoose.models.Product;

export default mongoose.model("Product", ProductSchema);