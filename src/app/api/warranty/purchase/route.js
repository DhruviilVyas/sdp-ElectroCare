import { connectDB } from "@/lib/db";
import Warranty from "@/models/Warranty";
import Product from "@/models/Product"; 
import { NextResponse } from "next/server";
import { addYears } from "date-fns";
import mongoose from "mongoose";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { productId, planName, planDuration, amount } = body;

    // 1. Validate ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
    }

    const existingWarranty = await Warranty.findOne({
      productId: productId,
      status: 'active',
      endDate: { $gte: new Date() }
    });

    if (existingWarranty) {
      return NextResponse.json({ error: "This product is already protected." }, { status: 409 });
    }
    // 2. Find Product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 3. Generate Policy Details
    const policyNumber = `EC-${Math.floor(100000 + Math.random() * 900000)}`;
    const endDate = addYears(new Date(), planDuration);

    // 4. Fail-Safe Name Logic
    // If product.name is missing in DB, construct it from Category + Model
    const warrantyProductName = product.name || `${product.category} - ${product.model}`;

    // 5. Create Warranty
    const newWarranty = await Warranty.create({
      productId: product._id,
      productName: warrantyProductName, // <--- Now guaranteed to exist
      planName,
      planDurationYears: planDuration,
      amountPaid: amount,
      policyNumber,
      endDate,
      status: 'active'
    });

    return NextResponse.json(newWarranty, { status: 201 });
  } catch (error) {
    console.error("SERVER CRASH ERROR:", error);
    return NextResponse.json({ error: error.message || "Purchase Failed" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    let query = {};

    // If productId is provided → filter
    if (productId) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return NextResponse.json(
          { error: "Invalid Product ID" },
          { status: 400 }
        );
      }
      query.productId = productId;
    }

    // Fetch warranties
    const warranties = await Warranty.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(warranties, { status: 200 });
  } catch (error) {
    console.error("GET WARRANTY ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch warranties" },
      { status: 500 }
    );
  }
}
