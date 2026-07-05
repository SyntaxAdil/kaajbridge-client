import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { Resend } from "resend";
import { resetPasswordTemplate } from "../emails/reset-password-email";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "KaajBridge <onboarding@resend.dev>",
        // from: process.env.AUTH_EMAIL_FROM,
        to: user.email,
        subject: "Reset your KaajBridge account password ",
        html: resetPasswordTemplate({
          url,
          userName: user.name,
        }),
      });
    },
    resetPasswordTokenExpiresIn: 3600,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
 session: {
  cookieCache: {
    enabled: true,
    maxAge: 60 * 5,
    strategy: "jwt",
  },
},
  plugins: [jwt()],
  user:{
    additionalFields:{
      role:{
        default:"seeker"
      },
    

    }
  }
});

// const { data: session, error } = await authClient.getSession()
// export const userInfoServer= session?.user;
