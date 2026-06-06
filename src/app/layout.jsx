import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

// font manrope
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// metadata
export const metadata = {
  title: "KaajBridge - Modern Job Portal for Diploma Engineers",
  description:
    "KaajBridge is a modern job hunting platform developed by a diploma student for diploma students. Find jobs, internships, and career opportunities easily and efficiently.",

  keywords: [
    "KaajBridge",
    "job portal",
    "diploma jobs",
    "internship for diploma students",
    "Bangladesh job platform",
    "student job search",
    "career opportunities",
    "entry level jobs",
  ],

  authors: [{ name: "KaajBridge Team" }],

  openGraph: {
    title: "KaajBridge - Modern Job Portal",
    description:
      "Developed by a diploma student for diploma students. Find jobs, internships, and opportunities easily with KaajBridge.",
    // url: "https://kaajbridge.com",
    siteName: "KaajBridge",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "KaajBridge - Modern Job Portal",
    description:
      "Developed by a diploma student for diploma students. A smart job platform for better opportunities.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}