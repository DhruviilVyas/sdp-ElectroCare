import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import QueryProvider from "@/components/QueryProvider"; // Import this

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
      <body className="antialiased">
        <SessionWrapper>
          <QueryProvider> {/* Wrap here */}
            {children}
          </QueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}