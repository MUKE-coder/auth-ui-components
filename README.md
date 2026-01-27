# JB Better Auth UI Updated

A complete set of authentication UI components for Next.js applications using [Better Auth](https://www.better-auth.com/). Built with [shadcn/ui](https://ui.shadcn.com/) components, React Hook Form, and Zod validation.

## Features

- **Sign Up** - User registration with email/password and social OAuth (Google, GitHub)
- **Sign In** - Email/password login with social OAuth support
- **Email Verification** - OTP-based email verification with resend functionality
- **Forgot Password** - Password reset request flow
- **Reset Password** - Token-based password reset
- **Change Password** - Authenticated password change with session revocation
- **Profile** - User profile management
- **Logout Button** - Configurable logout component

## Installation

### Prerequisites

Make sure you have a Next.js project with shadcn/ui initialized:

```bash
npx shadcn@latest init
```

### Install the Components

```bash
# Replace YOUR_DOMAIN with your deployed URL (e.g., jb-better-auth-ui.vercel.app)
npx shadcn@latest add https://YOUR_DOMAIN/r/auth-components.json
```

> **Note:** You need to deploy this registry project first. See [Deployment](#deployment) section.

This will install:

- All authentication UI components to `components/auth/`
- Auth client configuration to `lib/auth-client.ts`
- Zod validation schemas to `lib/auth-schemas.ts`
- Icons to `components/icons.tsx`

### Install Additional Dependencies

The following dependencies will be installed automatically:

```bash
npm install better-auth zod react-hook-form @hookform/resolvers sonner lucide-react input-otp
```

## Setup

### 1. Configure Better Auth Server

Create `lib/auth.ts` for your server-side auth configuration:

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite"
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
        // Implement your email sending logic here
        // Example with Resend:
        // await resend.emails.send({
        //   from: "noreply@yourdomain.com",
        //   to: email,
        //   subject: "Your Verification Code",
        //   html: `<p>Your code is: <strong>${otp}</strong></p>`,
        // });
        console.log(`OTP for ${email}: ${otp}`);
      },
    }),
  ],
});
```

### 2. Create API Route

Create `app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";
export const { GET, POST } = toNextJsHandler(auth.handler);
```

### 3. Environment Variables

Add the following to your `.env.local`:

```env
# Better Auth
BETTER_AUTH_SECRET="your-secret-key-min-32-characters"
BETTER_AUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="your-database-connection-string"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (optional - for Resend)
RESEND_API_KEY="your-resend-api-key"
```

### 4. Database Schema

If using Prisma, add these models to your `schema.prisma`:

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id           String  @id @default(cuid())
  userId       String
  providerId   String
  accountId    String
  accessToken  String?
  refreshToken String?
  user         User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
}
```

## Usage

### Create Auth Pages

**Sign Up Page** - `app/auth/sign-up/page.tsx`:

```tsx
import { SignUp } from "@/components/auth";

export default function SignUpPage() {
  return <SignUp />;
}
```

**Sign In Page** - `app/auth/sign-in/page.tsx`:

```tsx
import { SignIn } from "@/components/auth";

export default function SignInPage() {
  return <SignIn />;
}
```

**Verify Email Page** - `app/auth/verify-email/page.tsx`:

```tsx
import { VerifyEmail } from "@/components/auth";

export default function VerifyEmailPage() {
  return <VerifyEmail />;
}
```

**Forgot Password Page** - `app/auth/forgot-password/page.tsx`:

```tsx
import { ForgetPassword } from "@/components/auth";

export default function ForgotPasswordPage() {
  return <ForgetPassword />;
}
```

**Reset Password Page** - `app/auth/reset-password/page.tsx`:

```tsx
import { ResetPassword } from "@/components/auth";

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
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

Create a protected dashboard page:

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

- [better-auth](https://www.better-auth.com/) - Authentication library
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [react-hook-form](https://react-hook-form.com/) - Form management
- [zod](https://zod.dev/) - Schema validation
- [sonner](https://sonner.emilkowal.ski/) - Toast notifications
- [lucide-react](https://lucide.dev/) - Icons
- [input-otp](https://input-otp.rodz.dev/) - OTP input component

## Deployment

To make this registry available to others, deploy it to a hosting platform:

### Deploy to Vercel (Recommended)

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Deploy - Vercel will automatically detect Next.js
4. Your registry will be available at:
   ```
   https://your-project-name.vercel.app/r/auth-components.json
   ```

### After Deployment

Share the installation command with your team/users:

```bash
npx shadcn@latest add https://your-project-name.vercel.app/r/auth-components.json
```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
