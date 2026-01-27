# JB Better Auth UI

A complete set of authentication UI components for Next.js applications using [Better Auth](https://www.better-auth.com/). Built with [shadcn/ui](https://ui.shadcn.com/) components, React Hook Form, and Zod validation.

**Live Demo & Docs:** [https://www.better-auth-ui.desishub.com](https://www.better-auth-ui.desishub.com)

## Features

- **Sign Up** - User registration with email/password and social OAuth (Google, GitHub)
- **Sign In** - Email/password login with social OAuth support
- **Email Verification** - OTP-based email verification with resend functionality
- **Forgot Password** - Password reset request flow
- **Reset Password** - Token-based password reset
- **Change Password** - Authenticated password change with session revocation
- **Profile** - User profile management with avatar
- **Logout Button** - Configurable logout component
- **Pre-built Pages** - All auth pages created automatically
- **Prisma Setup** - Database schema included

## Quick Start

### 1. Prerequisites

Make sure you have a Next.js project with shadcn/ui initialized:

```bash
npx shadcn@latest init
```

### 2. Install the Components

```bash
npx shadcn@latest add https://www.better-auth-ui.desishub.com/r/auth-components.json
```

This will install:

- 8 authentication UI components to `components/auth/`
- Auth client configuration to `lib/auth-client.ts`
- Zod validation schemas to `lib/auth-schemas.ts`
- Prisma schema and configuration
- Pre-built auth pages in `app/(auth)/auth/`
- Environment variables template `.env.example`
- Icons to `components/icons.tsx`

### 3. Configure Environment Variables

Copy the generated `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"

# Database (PostgreSQL, MySQL, or SQLite)
DATABASE_URL=""

# Email Provider (Resend)
RESEND_FROM_EMAIL=""
RESEND_API_KEY=""

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

See the [Environment Variables Guide](https://www.better-auth-ui.desishub.com/docs/environment-variables) for detailed instructions on obtaining each value.

### 4. Initialize Database

Generate the Prisma client and push the schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Configure Better Auth Server

Create `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: email,
          subject: "Your Verification Code",
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

## Components

| Component        | Description                         |
| ---------------- | ----------------------------------- |
| `SignUp`         | Registration form with social OAuth |
| `SignIn`         | Login form with social OAuth        |
| `VerifyEmail`    | 6-digit OTP verification            |
| `ForgetPassword` | Password reset request              |
| `ResetPassword`  | New password form                   |
| `ChangePassword` | Authenticated password change       |
| `Profile`        | User profile management             |
| `LogoutButton`   | Configurable logout button          |

## Pre-Built Pages

The installation creates a complete auth flow in `app/(auth)/auth/`:

| Route | Description |
|-------|-------------|
| `/auth/sign-in` | Sign in page |
| `/auth/sign-up` | Sign up page |
| `/auth/verify-email` | Email verification page |
| `/auth/forgot-password` | Forgot password page |
| `/auth/reset-password` | Reset password page |
| `/auth/change-password` | Change password page |
| `/auth/profile` | Profile management page |

## Usage Examples

### Using Components Directly

```tsx
import { SignIn, SignUp, Profile, LogoutButton } from "@/components/auth";

// In your pages
<SignIn />
<SignUp />
<Profile />
<LogoutButton />
```

### Using the Logout Button

```tsx
import { LogoutButton } from "@/components/auth";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />

      {/* With custom props */}
      <LogoutButton variant="destructive" size="sm" showIcon={false} />
    </div>
  );
}
```

### Protecting Routes

```tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <LogoutButton />
    </div>
  );
}
```

## Customization

### Styling

All components use Tailwind CSS and shadcn/ui. Customize by:

1. Modifying your `tailwind.config.js`
2. Updating CSS variables in `globals.css`
3. Editing components directly in `components/auth/`

### Logo

Replace the `AppLogoIcon` in `components/icons.tsx` with your own logo.

### Routes

Update the redirect paths in each component to match your app's routing structure.

## Dependencies

These are installed automatically:

- [better-auth](https://www.better-auth.com/) - Authentication library
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [react-hook-form](https://react-hook-form.com/) - Form management
- [zod](https://zod.dev/) - Schema validation
- [sonner](https://sonner.emilkowal.ski/) - Toast notifications
- [lucide-react](https://lucide.dev/) - Icons
- [input-otp](https://input-otp.rodz.dev/) - OTP input component
- [prisma](https://www.prisma.io/) - Database ORM
- [@prisma/adapter-pg](https://www.prisma.io/) - PostgreSQL adapter

## Links

- **Documentation**: [https://www.better-auth-ui.desishub.com](https://www.better-auth-ui.desishub.com)
- **Environment Variables Guide**: [https://www.better-auth-ui.desishub.com/docs/environment-variables](https://www.better-auth-ui.desishub.com/docs/environment-variables)
- **GitHub**: [https://github.com/MUKE-coder/auth-ui-components](https://github.com/MUKE-coder/auth-ui-components)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
