import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import React from "react";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrackIo",
  description: "A project management site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, "antialiased min-h-screen")}
      >
        {children}
      </body>
    </html>
  );
}
