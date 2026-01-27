# Introducing JB Better Auth UI - Production-Ready Auth Components for Next.js

We're excited to announce **JB Better Auth UI**, a complete set of beautiful, production-ready authentication components for Next.js applications. Built with [shadcn/ui](https://ui.shadcn.com) and designed to work seamlessly with [Better Auth](https://www.better-auth.com), these components make adding authentication to your app incredibly simple.

## One Command Installation

Install everything you need with a single command:

```bash
npx shadcn@latest add https://www.better-auth-ui.desishub.com/r/auth-components.json
```

That's it! This command installs:
- 8 authentication components
- Pre-configured auth client
- Zod validation schemas
- Prisma schema and configuration
- Ready-to-use auth pages
- Environment variables template

## What's Included

### Authentication Components

| Component | Description |
|-----------|-------------|
| `<SignIn />` | Email/password login with Google & GitHub OAuth |
| `<SignUp />` | User registration with automatic email verification |
| `<VerifyEmail />` | 6-digit OTP verification with resend functionality |
| `<ForgetPassword />` | Password reset request form |
| `<ResetPassword />` | Set new password with secure token |
| `<ChangePassword />` | Update password for logged-in users |
| `<Profile />` | User profile management with avatar |
| `<LogoutButton />` | Configurable logout button component |

### Pre-Built Auth Pages

The installation creates a complete auth flow in `app/(auth)/auth/`:
- `/auth/sign-in` - Sign in page
- `/auth/sign-up` - Sign up page
- `/auth/verify-email` - Email verification page
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password` - Reset password page
- `/auth/change-password` - Change password page
- `/auth/profile` - Profile management page

### Database Setup

Includes a complete Prisma schema with:
- User model with email verification
- Session management
- OAuth account linking
- Verification tokens

## Getting Started

### 1. Prerequisites

Make sure you have a Next.js project with shadcn/ui initialized:

```bash
npx shadcn@latest init
```

### 2. Install Components

```bash
npx shadcn@latest add https://www.better-auth-ui.desishub.com/r/auth-components.json
```

### 3. Configure Environment Variables

Copy the generated `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-at-least-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Email (Resend)
RESEND_FROM_EMAIL="noreply@yourdomain.com"
RESEND_API_KEY="re_your_api_key"

# OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### 4. Initialize Database

Generate the Prisma client and push the schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Create Better Auth Server Configuration

Create `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: email,
          subject: "Your verification code",
          html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
        });
      },
    }),
  ],
});
```

### 6. Create API Route

Create `app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### 7. Start Using!

Navigate to `/auth/sign-in` and your auth flow is ready!

## Features

- **Beautiful UI** - Built with shadcn/ui for a modern, accessible design
- **Type Safe** - Written in TypeScript with Zod validation
- **Email OTP** - Secure email verification with 6-digit codes
- **Social Login** - Google and GitHub OAuth pre-configured
- **Fully Customizable** - All components are yours to modify
- **Dark Mode** - Automatic dark mode support
- **Mobile Responsive** - Works great on all devices

## Tech Stack

- [Next.js 15](https://nextjs.org) - React Framework
- [Better Auth](https://www.better-auth.com) - Authentication Library
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Prisma](https://www.prisma.io) - Database ORM
- [Resend](https://resend.com) - Email Service
- [React Hook Form](https://react-hook-form.com) - Form Handling
- [Zod](https://zod.dev) - Schema Validation

## Links

- **Documentation**: [https://www.better-auth-ui.desishub.com](https://www.better-auth-ui.desishub.com)
- **Environment Variables Guide**: [https://www.better-auth-ui.desishub.com/docs/environment-variables](https://www.better-auth-ui.desishub.com/docs/environment-variables)
- **GitHub**: [https://github.com/MUKE-coder/auth-ui-components](https://github.com/MUKE-coder/auth-ui-components)
- **Demo**: [https://www.better-auth-ui.desishub.com/dashboard](https://www.better-auth-ui.desishub.com/dashboard)

## Contributing

Contributions are welcome! Feel free to open issues and pull requests on GitHub.

## License

MIT License - feel free to use in personal and commercial projects.

---

Built with love by [MUKE-coder](https://github.com/MUKE-coder)
