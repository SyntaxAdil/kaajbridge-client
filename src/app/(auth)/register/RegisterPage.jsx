"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { AlertCircleIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

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
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import Logo from "../../../components/ui/Logo";
import { signUp } from "../../../lib/auth/auth-client";

export default function RegisterPage() {
  const [serverError, setServerError] = useState("");
  const [showEye, setShowEye] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    defaultValues: {
      role: "seeker",
    },
  });

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const { error } = await signUp.email(
        {
          email: data.email,
          password: data.password,
          name: `${data.fname} ${data.lname}`,
          role: data.role,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
            toast.success("Register Successful");
          },
          onError: (ctx) => {
            const message = ctx.error.message || "Something went wrong";
            setServerError(message);
            toast.error("Registration Failed");
          },
        }
      );
      if (error) {
        setServerError(error.message || error || "Something went wrong");
      }
    } catch (err) {
      setServerError("Internal Server Error!");
      toast.error("Internal Server Error!");
      console.log(err);
    } finally {
      reset();
    }
  };

  const ROLES = [
    { label: "Seeker", value: "seeker" },
    { label: "Recruiter", value: "recruiter" },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-zinc-50 via-indigo-50/20 to-zinc-100 dark:from-[#0a0a0f] dark:via-zinc-950 dark:to-[#12121a] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Card className="w-full max-w-md mx-auto shadow-2xl border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl rounded-3xl p-2 sm:p-6">
        <div className="flex items-center justify-center pt-2 pb-1">
          <Logo />
        </div>

        <CardHeader className="text-center space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Create an Account
          </CardTitle>
          <CardDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your details below to set up your profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {serverError && (
            <Alert variant="destructive" className="rounded-2xl border-destructive/50 bg-destructive/10 text-destructive dark:text-red-400">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle className="text-sm font-medium">{serverError}</AlertTitle>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="fname" className="text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                  First Name
                </Label>
                <Input
                  id="fname"
                  type="text"
                  placeholder="Adil"
                  className="rounded-xl h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500 shadow-sm"
                  {...register("fname", {
                    required: "First name is required!",
                  })}
                />
                {errors.fname && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircleIcon className="h-3 w-3" />
                    {errors.fname.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lname" className="text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                  Last Name
                </Label>
                <Input
                  id="lname"
                  type="text"
                  placeholder="Rahman"
                  className="rounded-xl h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500 shadow-sm"
                  {...register("lname", { required: "Last name is required!" })}
                />
                {errors.lname && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircleIcon className="h-3 w-3" />
                    {errors.lname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="adil@dev.com"
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
              <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                Password
              </Label>
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

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="space-y-2 pt-1">
                  <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                    Select Your Role
                  </Label>
                  <RadioGroup
                    className="grid grid-cols-2 gap-3"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {ROLES.map((r) => (
                      <div
                        key={r.value}
                        className={`flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all ${
                          field.value === r.value
                            ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 dark:border-indigo-500"
                            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50"
                        }`}
                        onClick={() => field.onChange(r.value)}
                      >
                        <RadioGroupItem value={r.value} id={r.value} />
                        <Label htmlFor={r.value} className="cursor-pointer text-sm font-medium">
                          {r.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            />

            <CardFooter className="flex flex-col gap-2.5 pt-4 px-0">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-600/20 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <FaGoogle className="h-4 w-4" /> Continue with Google
              </Button>
              <div className="pt-1 text-center w-full">
                <Link href="/login">
                  <Button variant="link" className="text-indigo-600 dark:text-indigo-400 p-0 h-auto font-medium hover:underline">
                    Already have an account? Sign In
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