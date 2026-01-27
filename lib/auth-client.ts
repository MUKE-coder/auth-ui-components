import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, // e.g. http://localhost:3000
  plugins: [
    emailOTPClient(),
  ],
});
