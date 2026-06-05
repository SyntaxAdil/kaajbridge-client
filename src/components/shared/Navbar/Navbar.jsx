"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOutIcon,
  UserIcon,
  BriefcaseIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import NavLink from "./NavLink";
import { handleSignout, useSession } from "../../../lib/auth/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import { AnimatedThemeToggler } from "../../ui/animated-theme-toggler";
import Logo from "../../ui/Logo";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -6,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Navbar = () => {
  const { data: session, refetch } = useSession();

  const userClient = session?.user;

  console.log("user client",userClient)
  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", fn, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // initilas
  const userInitial = userClient?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");

  return (
    <>
      <motion.header
        initial={{
          y: -72,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <nav
          data-scrolled={scrolled}
          className={cn(
            "mx-auto flex h-16 container items-center justify-between px-5 lg:px-8",
            "transition-all duration-300 bg-background",
            scrolled
              ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800 shadow-sm shadow-zinc-100 dark:shadow-black/20"
              : "bg-transparent",
          )}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 22,
            }}
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[1.35rem] font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              
              <Logo />
            </Link>
          </motion.div>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((l) => (
              <motion.li key={l.href} variants={itemVariants}>
                <NavLink href={l.href}>{l.label}</NavLink>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{
              opacity: 0,
              x: 18,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatedThemeToggler
              
              
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            />

            {userClient ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="rounded-full ring-2 ring-transparent hover:ring-indigo-400 transition-all duration-200 outline-none"
                  >
                    <Avatar className="size-9 cursor-pointer">
                      <AvatarImage
                        src={userClient?.image}
                        alt={userClient?.name}
                      />

                      <AvatarFallback className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 mt-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg"
                >
                  <DropdownMenuLabel className="font-normal px-3 py-2">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Signed in as
                    </p>

                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                      {userClient?.name}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

                  <Link href="/profile">
                    <DropdownMenuItem className="gap-2 cursor-pointer dark:focus:bg-zinc-800">
                      <UserIcon className="size-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

                  <DropdownMenuItem
                    variant="destructive"
                    className="gap-2 cursor-pointer"
                    onClick={() => handleSignout(refetch)}
                  >
                    <LogOutIcon className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg font-medium"
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button
                    size="sm"
                    className="rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white px-5 font-semibold transition-all duration-200"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          <motion.button
            className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                >
                  <XIcon className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                >
                  <MenuIcon className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="panel"
              className="fixed top-16 inset-x-0 z-40 md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-100/50 dark:shadow-black/30"
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex flex-col px-5 py-4 gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.28,
                    }}
                  >
                    <NavLink
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-base border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:text-foreground"
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}

                <div className="pt-4 pb-2 flex flex-col gap-2">
                  <div className="pb-2">
                    <AnimatedThemeToggler className="h-10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center" />
                  </div>

                  {userClient ? (
                    <>
                      <div className="flex items-center gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                        <Avatar className="size-9">
                          <AvatarImage
                            src={userClient?.image}
                            alt={userClient?.name}
                          />

                          <AvatarFallback className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                            {userInitial}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                            {userClient?.name}
                          </p>

                          <p className="text-xs text-zinc-400 dark:text-zinc-500">
                            {userClient?.email}
                          </p>
                        </div>
                      </div>

                      <Link href="/profile" onClick={() => setMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 rounded-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        >
                          <UserIcon className="size-4" />
                          Profile
                        </Button>
                      </Link>

                      <Button
                        variant="destructive"
                        className="w-full justify-start gap-2 rounded-lg"
                        onClick={() => {
                          setMenuOpen(false);

                          handleSignout(refetch);
                        }}
                      >
                        <LogOutIcon className="size-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full rounded-lg font-medium dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        >
                          Sign In
                        </Button>
                      </Link>

                      <Link href="/register" onClick={() => setMenuOpen(false)}>
                        <Button className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* <div className="h-16"></div> */}
    </>
  );
};

export default Navbar;
