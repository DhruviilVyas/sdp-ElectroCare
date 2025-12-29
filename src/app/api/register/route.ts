import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // 1. Get phone along with other fields
    let body;
    try {
      body = await req.json();
    }catch (error) {
  console.error("API Error:", error);

  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}

    
    const { name, email, phone, password } = body || {};

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User (Including your custom fields)
    await User.create({
      name,
      email,
      phone, 
      password: hashedPassword,
      loyalty_points: 0, // Default start
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
 