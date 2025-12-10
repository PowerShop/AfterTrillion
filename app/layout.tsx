import type { Metadata } from "next";
import { Noto_Sans_Thai } from 'next/font/google';
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ตารางอ้างอิงตัวเลขเกม Idle",
  description: "ตารางอ้างอิงคำต่อท้ายตัวเลขในเกม Idle ตั้งแต่ 10³ ถึง 10³⁰³",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>{children}</body>
    </html>
  );
}
