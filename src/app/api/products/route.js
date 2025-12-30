import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Warranty from "@/models/Warranty";
import ServiceRequest from "@/models/ServiceRequest"; // Import
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query = {};
    if (userId) query.userId = userId;

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    const productIds = products.map(p => p._id);

    // 1. Get Warranties
    const activeWarranties = await Warranty.find({
      productId: { $in: productIds },
      status: 'active',
      endDate: { $gte: new Date() }
    }).lean();

    // 2. NEW: Get Active Service Requests (Not completed/cancelled)
    const activeServices = await ServiceRequest.find({
      productId: { $in: productIds },
      status: { $in: ['pending', 'accepted', 'on_way', 'in_progress'] }
    }).lean();

    // 3. Merge
    const productsWithStatus = products.map(product => {
      const warranty = activeWarranties.find(w => w.productId.toString() === product._id.toString());
      const service = activeServices.find(s => s.productId.toString() === product._id.toString());

      return {
        ...product,
        hasActiveWarranty: !!warranty,
        warrantyDetails: warranty || null,
        // New Fields
        hasActiveService: !!service,
        serviceStatus: service ? service.status : null
      };
    });
    
    return NextResponse.json(productsWithStatus, { status: 200 });

  } catch (error) {
  console.error(" requests API error:", error);
  return NextResponse.json(
    { error: "Failed to fetch technician requests" },
    { status: 500 }
  );
}

}