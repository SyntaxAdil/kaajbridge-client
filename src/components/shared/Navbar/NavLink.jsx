"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const NavLink = ({ href, className, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center py-1 text-sm font-medium transition-colors duration-200 outline-none",
        isActive
          ? "text-indigo-600"
          : "text-zinc-500 hover:text-foreground",
        className
      )}
    >
      {children}

      {/* Sliding underline — shared layoutId so it glides between links */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-indigo-500"
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.4 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
};

export default NavLink;