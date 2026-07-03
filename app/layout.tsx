import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silver Princess K. | Portfolio",
  description:
    "Full-Stack Developer & Designer — Building at the intersection of structure & storytelling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">{children}</body>
    </html>
  );
}
