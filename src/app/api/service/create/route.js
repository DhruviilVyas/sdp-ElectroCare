import { connectDB } from "@/lib/db";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();

    const newRequest = await ServiceRequest.create({
      userId: session.user.email,
      userName: session.user.name,
      ...body,
      status: 'pending' // Initial status
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}