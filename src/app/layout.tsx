import type { Metadata } from "next";
// ✅ NOTE: Google Fonts import hata diya hai taaki build fail na ho
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper"; 

export const metadata: Metadata = {
  title: "ElectroCare",
  description: "Your one-stop solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ✅ Removed variable classes to prevent font errors */}
      <body className="antialiased">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}