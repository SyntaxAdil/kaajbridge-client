import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import toast from "react-hot-toast";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

// google
export const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  return data;
};

export const handleSignout = async (refetch) => {
  await authClient.signOut();
  toast.success("Logout successfull");
  await refetch()
};
// export const {
//   data: session,
//   isPending,
//   error,
//   refetch,
// } = authClient.useSession();
// export const userInfoClient = session?.user;
export const { signIn, signUp, useSession } = createAuthClient();
