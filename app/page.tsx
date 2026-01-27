'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand-logo'

export default function AuthShowcase() {
  const routes = [
    { path: '/sign-in', label: 'Sign In', description: 'User login form with email/password and social auth' },
    { path: '/sign-up', label: 'Sign Up', description: 'User registration form' },
    { path: '/forgot-password', label: 'Forgot Password', description: 'Password reset request form' },
    { path: '/reset-password', label: 'Reset Password', description: 'Set new password after reset' },
    { path: '/verify-email', label: 'Verify Email', description: 'Email verification with code' },
    { path: '/profile', label: 'Profile', description: 'User profile management' },
    { path: '/change-password', label: 'Change Password', description: 'Update current password' },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <BrandLogo />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Auth Flow Showcase</h1>
            <p className="text-muted-foreground">Complete authentication UI components for your application</p>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <div className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <h2 className="text-lg font-semibold mb-2">{route.label}</h2>
                <p className="text-sm text-muted-foreground mb-4">{route.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Component
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Built with React Hook Form for efficient state management</li>
            <li>✓ Zod validation schemas with type-safe error handling</li>
            <li>✓ Shadcn UI form components for consistency</li>
            <li>✓ Social auth buttons (Google, GitHub) ready to integrate</li>
            <li>✓ No props required - fully self-contained components</li>
            <li>✓ Brand logo on every authentication page</li>
            <li>✓ Mobile responsive design</li>
            <li>✓ Loading states and error handling built-in</li>
          </ul>
        </div>

        {/* TODO Section */}
        <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Next Steps</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>✓ Replace TODO comments with your API endpoints</li>
            <li>✓ Integrate with your backend authentication service</li>
            <li>✓ Connect social auth providers (Google, GitHub OAuth)</li>
            <li>✓ Set up session management and protected routes</li>
            <li>✓ Customize brand logo in <code>/components/brand-logo.tsx</code></li>
            <li>✓ Adjust color scheme via design tokens in <code>/app/globals.css</code></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
