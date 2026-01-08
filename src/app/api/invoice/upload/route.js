import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID missing" }, { status: 400 });
    }

    // SIMULATED UPLOAD (In real app, upload to AWS S3 here)
    const mockInvoiceUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    await Product.findByIdAndUpdate(productId, {
      invoiceUrl: mockInvoiceUrl
    });

    return NextResponse.json({ message: "Invoice Uploaded", url: mockInvoiceUrl }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Upload Failed" }, { status: 500 });
  }
}