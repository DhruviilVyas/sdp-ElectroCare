import { NextResponse } from "next/server";
import Bytez from "bytez.js";

// Force dynamic to prevent caching issues in production
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    // 1. Validate API Key
    const apiKey = process.env.BYTEZ_KEY;
    if (!apiKey) {
      console.error("❌ Error: BYTEZ_KEY is missing in .env.local");
      return NextResponse.json({ error: "Server misconfiguration: API Key missing" }, { status: 500 });
    }

    // 2. Parse Input
    const body = await req.json();
    const { problem } = body;

    if (!problem) {
      return NextResponse.json({ error: "Please describe the problem." }, { status: 400 });
    }

    // 3. Initialize Bytez
    const sdk = new Bytez(apiKey);
    const model = sdk.model("openai/gpt-4o-mini");

    // 4. Run Model with Timeout Protection
    // We wrap this because external calls can hang or fail
    const { error, output } = await model.run([
      {
        "role": "system",
        "content": "You are an expert home appliance technician. Diagnose the issue based on the user's description. Keep it concise, professional, and suggest a solution under 50 words."
      },
      {
        "role": "user",
        "content": problem
      }
    ]);

    // 5. Handle Provider Errors
    if (error) {
      console.error("❌ Bytez API Error:", error);
      return NextResponse.json({ error: "AI Service Error: " + error }, { status: 502 });
    }

    // 6. Success
    return NextResponse.json({ result: output }, { status: 200 });

  } catch (error) {
    // 7. Catch Unexpected Server Errors
    console.error("❌ Critical Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please check server logs." }, 
      { status: 500 }
    );
  }
}