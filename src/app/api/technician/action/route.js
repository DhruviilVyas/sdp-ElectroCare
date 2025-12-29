import { connectDB } from "@/lib/db";
import ServiceRequest from "@/models/ServiceRequest";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { requestId, action } = await req.json(); 

    const request = await ServiceRequest.findById(requestId);
    if (!request) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (action === 'accept') {
      request.status = 'upcoming'; // ✅ Ab ye kaam karega kyunki Model update ho gaya
      // Optional: Technician ka naam bhi assign kar do
      request.technicianName = "Rohan Sharma"; 
      request.technicianPhone = "+91 98765 43210";
      await request.save();
    } 
    else if (action === 'reject') {
      request.status = 'cancelled';
      await request.save();
    }
    else if (action === 'complete') {
      request.status = 'completed';
      await request.save();

      // --- LOYALTY POINTS LOGIC ---
      const user = await User.findOne({ email: request.userId });
      if (user) {
        user.loyalty_points = (user.loyalty_points || 0) + 100;
        await user.save();
      }
    }

    return NextResponse.json({ message: "Status updated" }, { status: 200 });

  } catch (error) {
    console.error("Technician Action Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}