import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer";

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
    <html data-theme="dark" lang="en" className={`${manrope.className}  h-full antialiased dark`} suppressHydrationWarning >
      <body className=" min-h-full flex flex-col bg-background text-foreground" >
        {/* navbar */}
        <Navbar></Navbar>
        {/* main */}
        <main className="flex-1 mx-4 md:mx-0 ">{children}</main>
        {/* footer */}
        <Footer></Footer>
        {/* toaster */}
        <Toaster></Toaster>
      </body>
    </html>
  );
}
