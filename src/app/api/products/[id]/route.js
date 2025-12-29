import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Warranty from "@/models/Warranty"; 
import ServiceRequest from "@/models/ServiceRequest"; // Import this
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // 1. Get Product
    const product = await Product.findById(id).lean();
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // 2. Check Warranty
    const activeWarranty = await Warranty.findOne({ 
      productId: id, 
      status: 'active',
      endDate: { $gte: new Date() } 
    }).lean();

    // 3. NEW: Check for Active Service Request
    // We look for requests that are NOT completed or cancelled
    const activeService = await ServiceRequest.findOne({
      productId: id,
      status: { $in: ['pending', 'upcoming', 'technician_assigned', 'in_progress'] }
    }).sort({ createdAt: -1 }).lean();

    // 4. Return merged data
    return NextResponse.json({ 
      ...product, 
      hasExtendedWarranty: !!activeWarranty,
      extendedWarrantyDetails: activeWarranty || null,
      
      // New Field for Frontend
      hasActiveService: !!activeService, 
      activeServiceDetails: activeService || null
    }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}