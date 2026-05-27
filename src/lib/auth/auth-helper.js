"use client";
import { authClient } from "./auth";

export const useUser = () => {
  const { data: session, isPending } = authClient.useSession();

  return {
    user: session?.user,
    isPending,
    session,
  };
};