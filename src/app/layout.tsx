import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/common/theme-provider";
import { SkipLink } from "@/components/common/skip-link";
import { CursorGlow } from "@/components/common/cursor-glow";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/constants/site";
import { buildStructuredData } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  applicationName: SITE.name,
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "Mateen Ud Din",
    "Software Engineer",
    "AI Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: SITE.name, url: `https://${SITE.domain}` }],
  creator: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${SITE.domain}`,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
  category: "technology",
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
      className={`${GeistSans.variable} ${GeistMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          // Static JSON built from typed constants, not user input — the
          // standard Next.js pattern for injecting JSON-LD.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">
            <SkipLink />
            <CursorGlow />
            <Navbar />
            {children}
            <Footer />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
