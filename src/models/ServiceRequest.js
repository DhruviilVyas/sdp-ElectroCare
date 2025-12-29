import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  productModel: { type: String, required: true },
  
  issueDescription: { type: String, required: true },
  preferredSlot: { type: String, required: true },
  
  contactAddress: { type: String, required: true },
  contactPhone: { type: String, required: true },

  // ✅ Yahan 'upcoming' add hona zaroori hai
  status: { 
    type: String, 
    enum: ['pending', 'upcoming', 'accepted', 'on_way', 'in_progress', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  
  technicianName: { type: String, default: "Assigning..." },
  technicianPhone: { type: String, default: "" },
  
  isDepositPaid: { type: Boolean, default: false },
  depositAmount: { type: Number, default: 2000 },

}, { timestamps: true });

// --- IMPORTANT FIX FOR NEXT.JS ---
// Agar model pehle se exist karta hai, to usse delete kar do taaki naya enum update ho jaye
if (mongoose.models.ServiceRequest) {
  delete mongoose.models.ServiceRequest;
}

export default mongoose.model("ServiceRequest", ServiceRequestSchema);