'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy, Github, Package, Zap, Shield, Palette, Code2, ArrowRight, ExternalLink } from 'lucide-react'

type PackageManager = 'npx' | 'pnpm'

export default function DocsPage() {
  const [copied, setCopied] = useState(false)
  const [packageManager, setPackageManager] = useState<PackageManager>('npx')

  const commands = {
    npx: {
      install: 'npx shadcn@latest add https://auth-ui-components.vercel.app/r/auth-components.json',
      init: 'npx shadcn@latest init',
    },
    pnpm: {
      install: 'pnpm dlx shadcn@latest add https://auth-ui-components.vercel.app/r/auth-components.json',
      init: 'pnpm dlx shadcn@latest init',
    },
  }

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const components = [
    { name: 'SignIn', path: '/auth/sign-in', description: 'Email/password login with Google & GitHub OAuth' },
    { name: 'SignUp', path: '/auth/sign-up', description: 'User registration with email verification' },
    { name: 'VerifyEmail', path: '/auth/verify-email', description: '6-digit OTP verification with resend' },
    { name: 'ForgetPassword', path: '/auth/forgot-password', description: 'Password reset request form' },
    { name: 'ResetPassword', path: '/auth/reset-password', description: 'Set new password with token' },
    { name: 'ChangePassword', path: '/auth/change-password', description: 'Update password when logged in' },
    { name: 'Profile', path: '/auth/profile', description: 'User profile management' },
    { name: 'LogoutButton', path: '/dashboard', description: 'Configurable logout button' },
  ]

  const features = [
    { icon: Zap, title: 'One Command Install', description: 'Install all auth components with a single shadcn CLI command' },
    { icon: Shield, title: 'Better Auth Integration', description: 'Pre-configured for Better Auth with email OTP and social providers' },
    { icon: Palette, title: 'Fully Customizable', description: 'Built with shadcn/ui - easily customize to match your brand' },
    { icon: Code2, title: 'Type Safe', description: 'Written in TypeScript with Zod validation schemas' },
  ]

  const PackageManagerTabs = () => (
    <div className="inline-flex items-center rounded-lg bg-muted p-1 mb-4">
      <button
        onClick={() => setPackageManager('npx')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          packageManager === 'npx'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        npm
      </button>
      <button
        onClick={() => setPackageManager('pnpm')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          packageManager === 'pnpm'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        pnpm
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="font-bold text-lg">JB Better Auth UI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/MUKE-coder/auth-ui-components" target="_blank">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Demo</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Package className="h-4 w-4" />
            shadcn/ui Registry
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Beautiful Auth Components
            <br />
            <span className="text-primary">for Better Auth</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A complete set of authentication UI components for Next.js. Built with shadcn/ui,
            React Hook Form, and Zod. Ready to use with Better Auth.
          </p>

          {/* Package Manager Toggle */}
          <PackageManagerTabs />

          {/* Install Command */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="relative w-full max-w-2xl">
              <div className="flex items-center gap-2 bg-muted rounded-lg p-2 pl-4 font-mono text-sm">
                <code className="flex-1 text-left truncate">{commands[packageManager].install}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(commands[packageManager].install)}
                  className="shrink-0"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link href="#installation">
              <Button size="lg">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="#components">
              <Button variant="outline" size="lg">View Components</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Why JB Better Auth UI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-background rounded-lg p-6 border">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section id="components" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Components Included</h2>
          <p className="text-center text-muted-foreground mb-12">
            8 production-ready components for complete authentication flows
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {components.map((component) => (
              <Link key={component.name} href={component.path}>
                <div className="group p-4 border rounded-lg hover:border-primary hover:bg-muted/50 transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-semibold text-primary">{`<${component.name} />`}</code>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="py-16 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Installation</h2>
          <div className="flex justify-center mb-8">
            <PackageManagerTabs />
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="font-semibold">Prerequisites</h3>
              </div>
              <p className="text-muted-foreground mb-4">Make sure you have a Next.js project with shadcn/ui initialized:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm flex items-center justify-between">
                <code>{commands[packageManager].init}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(commands[packageManager].init)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="font-semibold">Install Components</h3>
              </div>
              <p className="text-muted-foreground mb-4">Run the following command to install all auth components:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto flex items-center justify-between gap-2">
                <code className="truncate">{commands[packageManager].install}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(commands[packageManager].install)}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="font-semibold">Configure Better Auth</h3>
              </div>
              <p className="text-muted-foreground mb-4">Create your Better Auth server configuration:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// lib/auth.ts
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        // Send email with OTP
      },
    }),
  ],
});`}</pre>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</div>
                <h3 className="font-semibold">Create Auth Pages</h3>
              </div>
              <p className="text-muted-foreground mb-4">Use the components in your pages:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// app/auth/sign-in/page.tsx
import { SignIn } from "@/components/auth";

export default function SignInPage() {
  return <SignIn />;
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Components</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> SignIn with social OAuth</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> SignUp with email verification</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> VerifyEmail with OTP input</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Password reset flow</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Profile management</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> LogoutButton component</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Utilities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Auth client configuration</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Zod validation schemas</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> TypeScript types</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Icon components</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Toast notifications</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Loading states</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Dependencies</h2>
          <p className="text-center text-muted-foreground mb-8">
            The following packages will be installed automatically:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['better-auth', 'zod', 'react-hook-form', '@hookform/resolvers', 'sonner', 'lucide-react', 'input-otp'].map((dep) => (
              <code key={dep} className="px-3 py-1 bg-background border rounded-full text-sm">{dep}</code>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Add production-ready auth components to your Next.js app in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => copyToClipboard(commands[packageManager].install)}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy Install Command
            </Button>
            <Link href="https://github.com/MUKE-coder/auth-ui-components" target="_blank">
              <Button variant="outline" size="lg">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span className="font-semibold">JB Better Auth UI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built by{' '}
            <Link href="https://github.com/MUKE-coder" className="text-primary hover:underline" target="_blank">
              MUKE-coder
            </Link>
            {' '}with Better Auth and shadcn/ui
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/MUKE-coder/auth-ui-components" target="_blank" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
