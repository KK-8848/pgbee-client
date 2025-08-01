

import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

import { use } from "react";

import axios from "@/lib/axios"; // Importing the axios instance


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PgBee",
  description: "Your Perfect Stay, Just a Click Away! Find the best PGs, hostels and rooms nearby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    // Add suppressHydrationWarning here
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}
        style={{ fontFamily: "var(--font-poppins)" }}
        suppressHydrationWarning
      >
   <AuthProvider>
         
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}