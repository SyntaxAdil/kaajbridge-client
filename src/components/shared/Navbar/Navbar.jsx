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
  LayoutDashboard,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import NavLink from "./NavLink";
import {
  authClient,
  useSession,
} from "../../../lib/auth/auth-client";

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
import { GrDashboard } from "react-icons/gr";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  // { label: "Pricing", href: "/pricing" },
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const userInitial = userClient?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");

    const handleSignout = async () => {
      await authClient.signOut();
      refetch();
      toast.success("Logout successfull");
      router.push("/");
    };
  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] container "
      >
        <nav
          className={cn(
            "relative mx-auto flex h-16 items-center justify-between px-6 lg:px-8",
            "rounded-2xl transition-all duration-300",
            "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl",
            "border border-white/20 dark:border-zinc-800/50",
            "shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
            scrolled && "bg-white/80 dark:bg-zinc-950/80 shadow-lg"
          )}
        >
          {/* Glassmorphism glow effect */}
          <div className="absolute inset-0 rounded-2xl  pointer-events-none" />
          <div className="absolute -inset-px rounded-2xl blur-sm pointer-events-none" />

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="relative z-10"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-[1.35rem] font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              <Logo />
              {/* <span className="hidden sm:inline-block text-xs font-medium text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-200/30 dark:border-indigo-500/20">
                Beta
              </span> */}
            </Link>
          </motion.div>

          {/* Nav Links */}
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center gap-1 relative z-10"
          >
            {NAV_LINKS.map((l) => (
              <motion.li key={l.href} variants={itemVariants}>
                <NavLink
                  href={l.href}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 rounded-xl transition-all duration-200"
                >
                  {l.label}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right Side Actions */}
          <motion.div
            className="hidden md:flex items-center gap-2 relative z-10"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatedThemeToggler className="h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all duration-200" />

            {userClient ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm px-2 py-1.5 pr-3 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-200"
                  >
                    <Avatar className="size-8">
                      <AvatarImage src={userClient?.image} alt={userClient?.name} />
                      <AvatarFallback className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 max-w-[100px] truncate hidden lg:block">
                      {userClient?.name}
                    </span>
                    <ChevronDown className="size-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 transition-colors" />
                  </motion.button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 rounded-2xl border border-white/20 dark:border-zinc-800/50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/30"
                >
                  <DropdownMenuLabel className="font-normal px-4 py-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                      {userClient?.name}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                      {userClient?.email}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-800/50" />

                  <Link href="/dashboard/profile">
                    <DropdownMenuItem className="gap-3 py-2.5 px-4 cursor-pointer rounded-xl dark:focus:bg-zinc-800/50">
                      <UserIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/dashboard">
                    <DropdownMenuItem className="gap-3 py-2.5 px-4 cursor-pointer rounded-xl dark:focus:bg-zinc-800/50">
                      <LayoutDashboard className="size-4 text-zinc-500 dark:text-zinc-400" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-800/50" />

                  <DropdownMenuItem
                    variant="destructive"
                    className="gap-3 py-2.5 px-4 cursor-pointer rounded-xl"
                    onClick={handleSignout}
                  >
                    <LogOutIcon className="size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 rounded-xl font-medium transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button
                    size="sm"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-5 font-semibold shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/15 transition-all duration-200"
                  >
                    <Sparkles className="size-3.5 mr-1.5" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-colors relative z-10"
            onClick={() => setMenuOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <XIcon className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <MenuIcon className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu Panel */}
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
              className="fixed top-[72px] left-1/2 -translate-x-1/2 z-40 w-[95%] md:hidden bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex flex-col p-5 gap-1 max-h-[80vh] overflow-y-auto">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.28 }}
                  >
                    <NavLink
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 rounded-xl px-4 transition-all duration-200"
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}

                <div className="pt-4 pb-2 mt-2 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-2">
                  <AnimatedThemeToggler className="h-10 w-full rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-colors flex items-center justify-center" />

                  {userClient ? (
                    <>
                      <div className="flex items-center gap-3 py-3">
                        <Avatar className="size-10">
                          <AvatarImage src={userClient?.image} alt={userClient?.name} />
                          <AvatarFallback className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                            {userInitial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                            {userClient?.name}
                          </p>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                            {userClient?.email}
                          </p>
                        </div>
                      </div>

                      <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 rounded-xl dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50"
                        >
                          <UserIcon className="size-4" />
                          Profile
                        </Button>
                      </Link>
                      <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 rounded-xl dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50"
                        >
                          <LayoutDashboard className="size-4" />
                          Dashboard
                        </Button>
                      </Link>

                      <Button
                        variant="destructive"
                        className="w-full justify-start gap-3 rounded-xl"
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
                          className="w-full rounded-xl font-medium dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50"
                        >
                          Sign In
                        </Button>
                      </Link>

                      <Link href="/register" onClick={() => setMenuOpen(false)}>
                        <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg shadow-indigo-500/25">
                          <Sparkles className="size-3.5 mr-1.5" />
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
    <div className="h-18 w-full"></div>
    </>
  );
};

export default Navbar;