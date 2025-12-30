import { connectDB } from "@/lib/db";
import ServiceRequest from "@/models/ServiceRequest"; // ✅ Import Model
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();

    // Validate required fields
    if (!body?.productId || !body?.productName || !body?.issueDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ CREATE DB ENTRY (Ye line missing thi)
    const newRequest = await ServiceRequest.create({
      userId: session.user.email,
      userName: session.user.name,
      productId: body.productId,
      productName: body.productName,
      productModel: body.productModel,
      issueDescription: body.issueDescription,
      preferredSlot: body.preferredSlot,
      contactName: body.contactName,
      contactPhone: body.contactPhone,
      contactAddress: body.contactAddress,
      isDepositPaid: body.isDepositPaid,
      depositAmount: body.depositAmount,
      status: 'pending'
    });
    
    return NextResponse.json({ message: "Success", id: newRequest._id }, { status: 201 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}