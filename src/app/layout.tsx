import type { Metadata } from "next";
// 1. Google fonts import ko hatao ya comment karo
// import { Inter, Roboto_Mono } from "next/font/google"; 
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper"; 

// 2. Ye configurations bhi hata do
/*
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
*/

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
      {/* 3. ClassName se variables hata do */}
      <body className="antialiased">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}