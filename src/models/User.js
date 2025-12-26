import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  address: { type: String, default: null },
  registered_at: { type: Date, default: Date.now },
  loyalty_points: { type: Number, default: 0 },
}, { timestamps: true });

// ✅ FIX 1: Prevent "OverwriteModelError" in development
// ✅ FIX 2: Use "export default" so route.ts can read it
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;