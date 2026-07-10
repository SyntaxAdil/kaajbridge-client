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

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "seeker",
        input: false,
      },
      gender: { type: "string", required: false, defaultValue: "" },
      phoneNumber: { type: "string", required: false, defaultValue: "" },
      address: { type: "string", required: false, defaultValue: "" },
      city: { type: "string", required: false, defaultValue: "" },
      country: { type: "string", required: false, defaultValue: "" },
      github: { type: "string", required: false, defaultValue: "" },
      linkedin: { type: "string", required: false, defaultValue: "" },
      portfolio: { type: "string", required: false, defaultValue: "" },
      resumeUrl: { type: "string", required: false, defaultValue: "" },
      institutionName: { type: "string", required: false, defaultValue: "" },
      degree: { type: "string", required: false, defaultValue: "Diploma" },
      department: { type: "string", required: false, defaultValue: "" },
      cgpa: { type: "string", required: false, defaultValue: "" },
      passingYear: { type: "string", required: false, defaultValue: "" },
      academicCertificate: { type: "string", required: false, defaultValue: "" },
      skills: { type: "string", required: false, defaultValue: "" },
      experience: { type: "string", required: false, defaultValue: "" },
      recruiterPosition: { type: "string", required: false, defaultValue: "" },
      plan: { type: "string", required: false, defaultValue: "free" },
      isStudentVerified: { type: "boolean", required: false, defaultValue: false },
    },
  },
});