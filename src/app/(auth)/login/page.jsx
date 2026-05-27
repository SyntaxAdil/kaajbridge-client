"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "../../../components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn, signUp } from "../../../lib/auth/auth-client";
import Logo from "../../../components/ui/logo";

export default function Login() {
  const [serverError, setServerError] = useState("");
  const [showEye, setShowEye] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { error } = await signIn.email(
        {
          email: data.email,
          password: data.password,

          callbackURL: "/",
        },
        {
          onSuccess: (ctx) => {
            router.push("/");
            toast.success("Login Successfull");
          },
          onError: (ctx) => {
            setServerError(ctx.error.message || "Something went wrong");
            toast.error("Login Failed", ctx.error);
          },
        },
      );
      if (error) {
        setServerError(error || "Something went wrong");
      }
    } catch (error) {
      toast.success("Internal Server Error!");
      console.log(error);
    } finally {
      setServerError("");
      reset();
    }

    console.log(data);
  };
  return (
    <Card className="w-full max-w-sm mx-auto my-26">
      <div className="flex items-center justify-center my-2">
        <Logo></Logo>
      </div>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          {/* sign up link */}
          <Link href={"/register"}>
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      {/* content */}
      <CardContent>
        {serverError && (
          <Alert
            variant="destructive"
            className="mx-0 rounded-md border-destructive mb-4"
          >
            <AlertCircleIcon />
            <AlertTitle>{serverError}</AlertTitle>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="adil@dev.com"
                {...register("email", { required: "Email is required!" })}
              />
              {errors.email && (
                <Alert variant="destructive" className="max-w-md border-0 p-0">
                  <AlertCircleIcon />
                  <AlertTitle>{errors.email.message}</AlertTitle>
                </Alert>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forget-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showEye ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />
                <button
                  onClick={() => setShowEye((p) => !p)}
                  type="button"
                  className="absolute top-1.5 opacity-40 right-3 "
                >
                  {showEye ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <Alert variant="destructive" className="max-w-md border-0 p-0">
                  <AlertCircleIcon />
                  <AlertTitle>{errors.password.message}</AlertTitle>
                </Alert>
              )}
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-4 px-0">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
            <Button
              disabled={isSubmitting}
              variant="outline"
              className="w-full"
              type="button"
            >
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
