import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silver Princess K. | Portfolio",
  description:
    "Full-Stack Developer & Designer — Building at the intersection of structure & storytelling. Explore projects, tech stack, and get in touch.",
  openGraph: {
    title: "Silver Princess K. | Portfolio",
    description: "Full-Stack Developer & Designer — Building at the intersection of structure & storytelling.",
    type: "website",
    locale: "en_US",
    siteName: "Silver Princess K. Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Princess K. | Portfolio",
    description: "Full-Stack Developer & Designer — Building at the intersection of structure & storytelling.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="h-screen overflow-hidden">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
