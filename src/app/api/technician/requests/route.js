import { connectDB } from "@/lib/db";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    // Fetch all requests
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    return NextResponse.json(requests, { status: 200 });
  }catch (error) {
  console.error("API Error:", error);

  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}

}