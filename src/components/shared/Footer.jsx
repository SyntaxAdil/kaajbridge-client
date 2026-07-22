"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaGithubSquare, FaLinkedin, FaFacebook } from "react-icons/fa";

import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";


const LINKS = {
  product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/ai" },
    { label: "Companies", href: "/company" },
    { label: "Salary data", href: "/salary" },
  ],
  navigation: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/career" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/news" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 ">
      <div className="container mx-auto px-5 lg:px-8 py-14">
        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <Logo />
            <p className="mt-3 text-sm leading-6">
              Modern job hunting platform developed by a diploma student for
              diploma students. Find jobs, internships, and career opportunities
              easily and efficiently.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-5">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <FaFacebook size={18} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://FaGithubSquare.com"
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <FaGithubSquare size={18} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://FaLinkedin.com"
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <FaLinkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* PRODUCT */}
          <div className="md:ms-20">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Product
            </h3>

            <ul className="space-y-2 text-sm">
              {LINKS.product.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-indigo-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION */}
          <div className="md:ms-20">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Navigation
            </h3>

            <ul className="space-y-2 text-sm">
              {LINKS.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-indigo-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="md:ms-20">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Resources
            </h3>

            <ul className="space-y-2 text-sm">
              {LINKS.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-indigo-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm">
          <p>Copyright © {new Date().getFullYear()} — KaajBridge</p>

          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-indigo-500">
              Terms & Policy
            </Link>
            <Link href="/privacy" className="hover:text-indigo-500">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
