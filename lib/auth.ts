import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { emailOTP } from "better-auth/plugins";
import { sendVerificationEmail, sendResetPasswordEmail } from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(data, request) {
        // data has .user, .url, .token
        try {
            await sendResetPasswordEmail(data.user.email, data.url);
        } catch (error) {
             console.error("Error sending reset password email:", error);
        }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          await sendVerificationEmail(email, otp);
        } catch (e) {
          console.error("Error in sendVerificationOTP plugin wrapper:", e);
          // Fallback logging is critical here if the email service fails completely
          console.log(`[DEV FALLBACK] OTP for ${email}: ${otp}`);
        }
      },
    }),
  ],
  user: {
    // Rely on Prisma defaults for role
  },
});
