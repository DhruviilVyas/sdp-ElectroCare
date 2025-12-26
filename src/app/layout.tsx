import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
// 👇 Import the wrapper you just created
import SessionWrapper from "@/components/SessionWrapper"; 

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        {/* 👇 Wrap the children here */}
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}