import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getSiteUrl } from "@/lib/site";
import { anniversaryContent } from "@/src/data/anniversary";

import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const scriptFont = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: anniversaryContent.seo.title,
    template: `%s | ${anniversaryContent.profile.yourName} & ${anniversaryContent.profile.herName}`,
  },
  description: anniversaryContent.seo.description,
  openGraph: {
    title: anniversaryContent.seo.title,
    description: anniversaryContent.seo.description,
    type: "website",
    url: getSiteUrl(),
    images: [
      {
        url: anniversaryContent.seo.socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Anniversary celebration preview",
      },
    ],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }, { url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: anniversaryContent.seo.noindex
    ? {
        index: false,
        follow: false,
        nocache: true,
      }
    : {
        index: true,
        follow: true,
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable} ${scriptFont.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
