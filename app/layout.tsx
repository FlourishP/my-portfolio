import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/lib/hooks/useTheme";
import "./globals.css";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
    { media: "(prefers-color-scheme: light)", color: "#F5F5F0" },
  ],
};

export const metadata: Metadata = {
  title: "Silver Princess K. | Portfolio",
  description:
    "Full-Stack Developer & Designer — Building at the intersection of structure & storytelling.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Princess",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-auto">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
