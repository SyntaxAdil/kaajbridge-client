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
import { Controller, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "../../../components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signUp } from "../../../lib/auth/auth-client";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import Logo from "../../../components/ui/logo";

export default function Login() {
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
      const { error } = await signUp.email(
        {
          email: data.email,
          password: data.password,
          name: `${data.fname} ${data.lname}`,
          role: data.role,
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

    
  };

  const ROLES = [
    { label: "Seeker", value: "seeker" },
    { label: "Recruiter", value: "recruiter" },
  ];
  return (
    <Card className="w-full max-w-md mx-auto my-26">
        <div className="flex items-center justify-center my-2">
          <Logo></Logo>
        </div>
      <CardHeader>
        <CardTitle>Create new account at</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          {/* sign up link */}
          <Link href={"/login"}>
            <Button variant="link">Sign In</Button>
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
            {/* name */}
            <div className="grid grid-cols-2 gap-2">
              {/* first name */}
              <div className="grid gap-2">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  type="text"
                  placeholder="Adil"
                  {...register("fname", {
                    required: "First name is required!",
                  })}
                />
                {errors.fname && (
                  <Alert
                    variant="destructive"
                    className="max-w-md border-0 p-0"
                  >
                    <AlertCircleIcon />
                    <AlertTitle>{errors.fname.message}</AlertTitle>
                  </Alert>
                )}
              </div>
              {/* last name */}
              <div className="grid gap-2">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  type="text"
                  placeholder="Rahman"
                  {...register("lname", { required: "Last name is required!" })}
                />
                {errors.lname && (
                  <Alert
                    variant="destructive"
                    className="max-w-md border-0 p-0"
                  >
                    <AlertCircleIcon />
                    <AlertTitle>{errors.lname.message}</AlertTitle>
                  </Alert>
                )}
              </div>
            </div>
            {/* email */}
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
            {/* pass */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
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

          

            {/* role */}

            <Controller
              name="role"
              control={control}
              defaultValue="seeker"
              render={({ field }) => (
                <div className="grid gap-2">
                  <Label>Role</Label>

                  <RadioGroup
                    className="grid grid-cols-3"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {ROLES.map((r) => (
                      <div key={r.value} className="flex items-center gap-2">
                        <RadioGroupItem value={r.value} id={r.value} />
                        <Label htmlFor={r.value}>{r.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            />
          </div>
          {/* buttons */}
          <CardFooter className="flex-col gap-2 mt-4 px-0">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              variant="outline"
              className="w-full"
            >
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
