import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idle Game Number Reference",
  description: "Complete reference table for idle game number suffixes from 10^3 to 10^303",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
