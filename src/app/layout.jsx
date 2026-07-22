// dns
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kaajbridge.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "KaajBridge - Modern Job Portal for Diploma Engineers",
    template: "%s | KaajBridge",
  },

  description:
    "KaajBridge is a modern job hunting platform built for Diploma Engineering graduates in Bangladesh. Find verified tech jobs, internships, and fast-track hiring opportunities with top companies.",

  keywords: [
    "KaajBridge",
    "job portal Bangladesh",
    "diploma jobs",
    "internship for diploma students",
    "diploma engineer jobs",
    "Bangladesh tech jobs",
    "student job search",
    "career opportunities Bangladesh",
    "entry level tech jobs",
    "fresh graduate jobs Bangladesh",
  ],

  authors: [{ name: "KaajBridge Team", url: SITE_URL }],
  creator: "KaajBridge Team",
  publisher: "KaajBridge",

  applicationName: "KaajBridge",
  category: "Jobs & Career",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "KaajBridge - Modern Job Portal for Diploma Engineers",
    description:
      "Built for Diploma Engineering graduates in Bangladesh. Find verified tech jobs, internships, and fast-track hiring opportunities.",
    url: SITE_URL,
    siteName: "KaajBridge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KaajBridge - Job Portal for Diploma Engineers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KaajBridge - Modern Job Portal",
    description:
      "Built for Diploma Engineering graduates in Bangladesh. A smart job platform for better opportunities.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "mao8sX2_o407oWcPS57i_CHmQZzWGIv6yU8g80A9CFY",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07070d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
