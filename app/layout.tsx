import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import "katex/dist/katex.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kin Chong's O Level Physics Interactive Textbook",
  description:
    "You can find O level Physics content and relevant simulations here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Prevent body scrolling */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        {/* Full viewport height */}
        <div className="flex h-screen">
          {/* Sidebar stays fixed visually */}
          <Sidebar />

          {/* Only this scrolls */}
          <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
