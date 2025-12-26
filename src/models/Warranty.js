import mongoose from "mongoose";

const WarrantySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true }, 
  planName: { type: String, required: true },
  planDurationYears: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  policyNumber: { type: String, unique: true, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired', 'void'], default: 'active' },
}, { timestamps: true });

// Check existing models to prevent Next.js hot-reload errors
export default mongoose.models.Warranty || mongoose.model("Warranty", WarrantySchema);