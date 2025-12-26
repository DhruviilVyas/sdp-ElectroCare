import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    // In a real app, you would filter by session.user.id here
    // const products = await Product.find({ userId: session.user.id });
    
    // For now, fetching all to ensure the UI populates
    const products = await Product.find().sort({ createdAt: -1 });
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const product = await Product.create(body);
  return Response.json(product, { status: 201 });
}
