"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaGithubSquare, FaLinkedin, FaFacebook } from "react-icons/fa";

import Logo from "../ui/Logo";

const LINKS = {
  platform: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
  ],
  support: [
    { label: "Contact", href: "/contact",id:1 },
    { label: "Help", href: "/contact" ,id:2 },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
      <div className="container mx-auto px-5 lg:px-8 py-14">
        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <Logo />
            <p className="mt-3 text-sm leading-6">
              A platform proudly built by a diploma engineer, specifically tailored for diploma engineers to discover career growth.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-5">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.facebook.com/profile.php?id=61591819415724&sk=followers"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <FaFacebook size={18} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/kaajbridgesupport-hue"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <FaGithubSquare size={18} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/kaajbridge-support-924677422/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <FaLinkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* PLATFORM */}
          <div className="md:ms-20">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Platform
            </h3>

            <ul className="space-y-2 text-sm">
              {LINKS.platform.map((item) => (
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

          {/* SUPPORT */}
          <div className="md:ms-20">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Support
            </h3>

            <ul className="space-y-2 text-sm">
              {LINKS.support.map((item) => (
                <li key={item.id}>
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

          {/* LEGAL */}
          <div className="md:ms-20">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Legal
            </h3>

            <ul className="space-y-2 text-sm">
              {LINKS.legal.map((item) => (
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
        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-center md:text-left">
            Copyright © {new Date().getFullYear()} KaajBridge — Developed by{" "}
            <a
              href="https://github.com/SyntaxAdil"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 transition"
            >
              @SyntaxAdil (Abdur Rahman Adil)
            </a>
          </p>

          <p className="font-medium text-zinc-500 dark:text-zinc-400 text-center">
            A platform made by a diploma engineer for other diploma engineers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;