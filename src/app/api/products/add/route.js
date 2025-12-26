import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 1. Validate
    if (!body.model || !body.serialNumber || !body.warrantyStatus) {
       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Check Duplicates
    const existing = await Product.findOne({ serialNumber: body.serialNumber });
    if (existing) {
      return NextResponse.json({ error: "Serial Number already registered." }, { status: 409 });
    }

    // 3. Construct Name (Fallback logic included)
    const finalName = body.name || `${body.category} - ${body.model}`;

    // 4. Create Product
    const newProduct = await Product.create({
      userId: body.userId || "guest",
      name: finalName,             // <--- CRITICAL FIX: Saving the name
      category: body.category,
      model: body.model,
      serialNumber: body.serialNumber,
      imeiNumber: body.imeiNumber,
      purchaseDate: body.purchaseDate,
      warrantyStatus: body.warrantyStatus,
      invoiceUrl: body.invoiceUrl,
      image: body.image,
      price: body.price || 20000 // Default price if missing
    });

    return NextResponse.json({ message: "Success", product: newProduct }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const warrantyStatus = searchParams.get("warrantyStatus");

    let query = {};

    // Filter by user
    if (userId) {
      query.userId = userId;
    }

    // Filter by warranty status (Active / Expired)
    if (warrantyStatus) {
      query.warrantyStatus = warrantyStatus;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
