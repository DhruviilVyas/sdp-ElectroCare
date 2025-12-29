import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    let body;
    try {
      body = await req.json();
    } catch (error) {
  console.error("API Error:", error);

  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}


    // Validate required fields
    if (!body?.productId || !body?.productName || !body?.issueDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
  console.error("API Error:", error);

  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}

}