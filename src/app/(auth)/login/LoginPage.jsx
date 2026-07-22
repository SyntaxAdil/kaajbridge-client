"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AlertCircleIcon, Eye, EyeOff, Loader2, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "../../../components/ui/alert";
import Logo from "../../../components/ui/Logo";
import { googleSignIn, signIn } from "../../../lib/auth/auth-client";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const [showEye, setShowEye] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const fillCredentials = (email, password) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
    toast.success("Demo credentials loaded!");
  };

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const { error } = await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
            toast.success("Login Successful");
          },
          onError: (ctx) => {
            const message = ctx.error.message || "Something went wrong";
            setServerError(message);
            toast.error("Login Failed");
          },
        }
      );
      if (error) {
        setServerError(error.message || "Something went wrong");
      }
    } catch (err) {
      setServerError("Internal Server Error!");
      toast.error("Internal Server Error!");
      console.log(err);
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-zinc-50 via-indigo-50/20 to-zinc-100 dark:from-[#0a0a0f] dark:via-zinc-950 dark:to-[#12121a] px-4 py-12 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Card className="w-full max-w-md mx-auto shadow-2xl border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl rounded-3xl p-2 sm:p-6">
        
        <div className="flex items-center justify-center pt-2 pb-1">
          <Logo />
        </div>

        <CardHeader className="text-center space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to access your dashboard and career portal
          </CardDescription>
         
        </CardHeader>

        <CardContent className="space-y-4">
          {serverError && (
            <Alert variant="destructive" className="rounded-2xl border-destructive/50 bg-destructive/10 text-destructive dark:text-red-400">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle className="text-sm font-medium">{serverError}</AlertTitle>
            </Alert>
          )}

          <div className="rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/70 p-3.5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2 shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <KeyRound className="h-3.5 w-3.5 text-indigo-500" />
              <span>Quick Demo Accounts</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-9 rounded-xl bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all shadow-sm"
                onClick={() => fillCredentials("seeker@kaajbridge.com", "seeker@001")}
              >
                Seeker
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-9 rounded-xl bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all shadow-sm"
                onClick={() => fillCredentials("recruiter@kaajbridge.com", "recruiter@123")}
              >
                Recruiter
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-9 rounded-xl bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all shadow-sm"
                onClick={() => fillCredentials("admin@kaajbridge.com", "admin@001")}
              >
                Admin
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="rounded-xl h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500 shadow-sm"
                {...register("email", { required: "Email is required!" })}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircleIcon className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                  Password
                </Label>
                <Link
                  href="/forget-password"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showEye ? "text" : "password"}
                  placeholder="••••••••"
                  className="rounded-xl h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 pr-10 focus-visible:ring-indigo-500 shadow-sm"
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowEye((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  {showEye ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircleIcon className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <CardFooter className="flex flex-col gap-2.5 pt-2 px-0">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-600/20 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium shadow-sm transition-all" 
                onClick={googleSignIn}
              >
              <FaGoogle></FaGoogle>   Continue with Google
              </Button>
               <div className="pt-1">
            <Link href="/register">
              <Button variant="link" className="text-indigo-600 dark:text-indigo-400 p-0 h-auto font-medium hover:underline">
                Don&apos;t have an account? Sign Up
              </Button>
            </Link>
          </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}