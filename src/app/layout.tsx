import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import React from "react";
import { QueryProvider } from "@/components/query-provider";
import {Toaster} from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'


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
      <NuqsAdapter>
          <QueryProvider>
              <Toaster closeButton />
              {children}
          </QueryProvider>
      </NuqsAdapter>
      </body>
    </html>
  );
}
