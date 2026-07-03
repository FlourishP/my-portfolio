import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/hooks/useTheme";
import "./globals.css";

export const dynamic = "force-dynamic";

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
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
