# JB Better Auth UI - Stop Wasting Hours on Authentication Setup

## The Problem

Every time you start a new project, there's one thing that always slows you down: **authentication**.

I've seen this pattern repeatedly with my team members. Someone starts a new project, and they spend **6 to 8 hours** just trying to get auth working. Setting up sign-in, sign-up, email verification, password reset, OAuth providers... it's always the same repetitive work that eats into productive development time.

That's why I created **JB Better Auth UI** - a complete set of production-ready authentication components that you can install with a single command.

## Get Started

Visit the documentation site to get started:

**[https://better-auth-ui.desishub.com](https://better-auth-ui.desishub.com)**

## One Command Installation

Install everything you need with a single command:

```bash
pnpm dlx shadcn@latest add https://better-auth-ui.desishub.com/r/auth-components.json
```

That's it! This single command installs:
- 8 authentication components
- Pre-configured auth client
- Zod validation schemas
- Prisma schema and configuration
- Ready-to-use auth pages
- Email templates for OTP verification
- API route handler
- Dashboard page
- Environment variables template

## What's Included

### Authentication Components

| Component | Description |
|-----------|-------------|
| `<SignIn />` | Email/password login with Google & GitHub OAuth |
| `<SignUp />` | User registration with automatic email verification |
| `<VerifyEmail />` | 6-digit OTP verification with resend functionality |
| `<ForgetPassword />` | Password reset request - sends OTP to email |
| `<ResetPassword />` | Enter OTP and set new password |
| `<ChangePassword />` | Update password for logged-in users |
| `<Profile />` | User profile management with avatar |
| `<LogoutButton />` | Configurable logout button component |

### Pre-Built Auth Pages

The installation creates a complete auth flow:

```
app/
├── (auth)/
│   └── auth/
│       ├── sign-in/page.tsx
│       ├── sign-up/page.tsx
│       ├── verify-email/page.tsx
│       ├── forgot-password/page.tsx
│       ├── reset-password/page.tsx
│       ├── change-password/page.tsx
│       └── profile/page.tsx
├── api/
│   └── auth/
│       └── [...all]/route.ts
├── dashboard/page.tsx
└── layout.tsx (with Toaster)
```

### Database Setup

Includes a complete Prisma schema with:
- User model with email verification
- Session management
- OAuth account linking
- Verification tokens

---

## Step-by-Step Setup Guide

### Step 1: Create a New Next.js Project

```bash
pnpm create next-app@latest my-app
cd my-app
```

### Step 2: Initialize shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

Select your preferences when prompted (recommended: New York style, Zinc color).

### Step 3: Install JB Better Auth UI Components

```bash
pnpm dlx shadcn@latest add https://better-auth-ui.desishub.com/r/auth-components.json
```

This will install all the authentication components, pages, and configurations.

### Step 4: Set Up Environment Variables

Copy the generated `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Now fill in your environment variables:

```env
# Better Auth Configuration
# Generate with: openssl rand -base64 32
BETTER_AUTH_SECRET="your-generated-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Email Provider (Resend)
# Get your API key at: https://resend.com
RESEND_FROM_EMAIL="onboarding@resend.dev"
RESEND_API_KEY="re_your_api_key"

# OAuth Providers (Optional)
# Google: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub: https://github.com/settings/developers
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

**How to get each variable:**

1. **BETTER_AUTH_SECRET**: Run `openssl rand -base64 32` in your terminal
2. **DATABASE_URL**: Create a PostgreSQL database (try [Neon](https://neon.tech) or [Supabase](https://supabase.com) for free)
3. **RESEND_API_KEY**: Sign up at [resend.com](https://resend.com) and create an API key
4. **OAuth credentials**: Follow the links in the comments above

For detailed instructions, visit: [https://better-auth-ui.desishub.com/docs/environment-variables](https://better-auth-ui.desishub.com/docs/environment-variables)

### Step 5: Initialize the Database

Generate the Prisma client and run migrations:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

### Step 6: Start the Development Server

```bash
pnpm dev
```

### Step 7: Test Your Auth Flow

Navigate to [http://localhost:3000/auth/sign-up](http://localhost:3000/auth/sign-up) and create an account!

The complete flow works like this:

1. **Sign Up** → Enter email and password
2. **Verify Email** → Check your email for the 6-digit OTP code
3. **Sign In** → Log in with your verified account
4. **Dashboard** → You're in! Protected dashboard page
5. **Forgot Password** → Request password reset (sends OTP)
6. **Reset Password** → Enter OTP and new password

---

## Authentication Flows Explained

### Email Verification Flow
```
Sign Up → OTP sent to email → Enter OTP → Account verified → Redirect to Sign In
```

### Password Reset Flow (OTP-based)
```
Forgot Password → Enter email → OTP sent → Enter OTP + new password → Password reset → Sign In
```

### OAuth Flow
```
Click Google/GitHub → Authorize → Account created/linked → Redirect to Dashboard
```

---

## Features

- **Beautiful UI** - Built with shadcn/ui for a modern, accessible design
- **Type Safe** - Written in TypeScript with Zod validation
- **Email OTP** - Secure 6-digit code verification for both email and password reset
- **Social Login** - Google and GitHub OAuth pre-configured
- **Fully Customizable** - All components are yours to modify
- **Dark Mode** - Automatic dark mode support
- **Mobile Responsive** - Works great on all devices
- **Session Management** - Secure session handling with Better Auth
- **Protected Routes** - Dashboard with authentication check

---

## Tech Stack

- [Next.js 15](https://nextjs.org) - React Framework
- [Better Auth](https://www.better-auth.com) - Authentication Library
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Prisma](https://www.prisma.io) - Database ORM
- [Resend](https://resend.com) - Email Service
- [React Hook Form](https://react-hook-form.com) - Form Handling
- [Zod](https://zod.dev) - Schema Validation

---

## Links

- **Documentation**: [https://better-auth-ui.desishub.com](https://better-auth-ui.desishub.com)
- **Environment Variables Guide**: [https://better-auth-ui.desishub.com/docs/environment-variables](https://better-auth-ui.desishub.com/docs/environment-variables)
- **GitHub**: [https://github.com/MUKE-coder/auth-ui-components](https://github.com/MUKE-coder/auth-ui-components)
- **Demo**: [https://better-auth-ui.desishub.com/dashboard](https://better-auth-ui.desishub.com/dashboard)

---

## Contributing

Contributions are welcome! Feel free to open issues and pull requests on GitHub.

## License

MIT License - feel free to use in personal and commercial projects.

---

**Stop wasting hours on authentication. Install JB Better Auth UI and start building what matters.**

Built with love by [MUKE-coder](https://github.com/MUKE-coder)
