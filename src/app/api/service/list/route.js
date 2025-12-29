import { connectDB } from "@/lib/db";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json([], { status: 200 });

    // Sirf wahi requests lao jo abhi chal rahi hain (Pending, Upcoming, On Way)
    // Completed ya Cancelled ko History me dikhayenge, yahan nahi
    const requests = await ServiceRequest.find({
      userId: userId,
      status: { $in: ['pending', 'upcoming', 'on_way', 'in_progress', 'accepted'] }
    }).sort({ createdAt: -1 });

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}