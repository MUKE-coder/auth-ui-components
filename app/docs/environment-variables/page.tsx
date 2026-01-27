'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy, ArrowLeft, Package, Key, Database, Mail, Github, ExternalLink } from 'lucide-react'
import { GoogleIcon } from '@/components/icons'

export default function EnvironmentVariablesPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const envVariables = [
    {
      category: 'Better Auth',
      icon: Key,
      vars: [
        {
          name: 'BETTER_AUTH_SECRET',
          description: 'A secret key used to encrypt sessions and tokens. Must be at least 32 characters.',
          howToGet: 'Generate a secure random string using: openssl rand -base64 32',
          example: 'your-super-secret-key-at-least-32-chars',
          required: true,
        },
        {
          name: 'BETTER_AUTH_URL',
          description: 'The base URL of your application where Better Auth is hosted.',
          howToGet: 'Use your deployed URL in production or localhost for development.',
          example: 'http://localhost:3000',
          required: true,
        },
      ],
    },
    {
      category: 'Database',
      icon: Database,
      vars: [
        {
          name: 'DATABASE_URL',
          description: 'Connection string for your database. Supports PostgreSQL, MySQL, or SQLite.',
          howToGet: (
            <div className="space-y-3">
              <p><strong>PostgreSQL (Recommended):</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Create a database at <a href="https://neon.tech" target="_blank" className="text-primary hover:underline">Neon</a>, <a href="https://supabase.com" target="_blank" className="text-primary hover:underline">Supabase</a>, or <a href="https://railway.app" target="_blank" className="text-primary hover:underline">Railway</a></li>
                <li>Copy the connection string from your dashboard</li>
              </ul>
              <p><strong>MySQL:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Create a database at <a href="https://planetscale.com" target="_blank" className="text-primary hover:underline">PlanetScale</a></li>
              </ul>
              <p><strong>SQLite (Development only):</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Use a file path like: file:./dev.db</li>
              </ul>
            </div>
          ),
          example: 'postgresql://user:password@host:5432/dbname',
          required: true,
        },
      ],
    },
    {
      category: 'Email Provider (Resend)',
      icon: Mail,
      vars: [
        {
          name: 'RESEND_API_KEY',
          description: 'API key for sending emails through Resend.',
          howToGet: (
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://resend.com" target="_blank" className="text-primary hover:underline">resend.com</a> and create an account</li>
              <li>Navigate to <strong>API Keys</strong> in the dashboard</li>
              <li>Click <strong>Create API Key</strong></li>
              <li>Give it a name and select the appropriate permissions</li>
              <li>Copy the generated key (starts with re_)</li>
            </ol>
          ),
          example: 're_123abc456def789...',
          required: true,
        },
        {
          name: 'RESEND_FROM_EMAIL',
          description: 'The email address that emails will be sent from.',
          howToGet: (
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>In Resend dashboard, go to <strong>Domains</strong></li>
              <li>Add and verify your domain (e.g., yourdomain.com)</li>
              <li>Once verified, use any email with that domain</li>
              <li>For testing, use onboarding@resend.dev (limited to your own email)</li>
            </ol>
          ),
          example: 'noreply@yourdomain.com',
          required: true,
        },
      ],
    },
    {
      category: 'Google OAuth (Optional)',
      icon: () => <GoogleIcon className="h-5 w-5" />,
      vars: [
        {
          name: 'GOOGLE_CLIENT_ID',
          description: 'OAuth 2.0 Client ID for Google Sign-In.',
          howToGet: (
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://console.cloud.google.com" target="_blank" className="text-primary hover:underline">Google Cloud Console</a></li>
              <li>Create a new project or select an existing one</li>
              <li>Navigate to <strong>APIs & Services &gt; Credentials</strong></li>
              <li>Click <strong>Create Credentials &gt; OAuth client ID</strong></li>
              <li>Select <strong>Web application</strong> as the application type</li>
              <li>Add authorized redirect URI: <code className="bg-muted px-1 rounded">http://localhost:3000/api/auth/callback/google</code></li>
              <li>Copy the Client ID</li>
            </ol>
          ),
          example: '123456789-abcdef.apps.googleusercontent.com',
          required: false,
        },
        {
          name: 'GOOGLE_CLIENT_SECRET',
          description: 'OAuth 2.0 Client Secret for Google Sign-In.',
          howToGet: 'Generated alongside the Client ID in the previous step. Copy it from the credentials page.',
          example: 'GOCSPX-abcdef123456',
          required: false,
        },
      ],
    },
    {
      category: 'GitHub OAuth (Optional)',
      icon: Github,
      vars: [
        {
          name: 'GITHUB_CLIENT_ID',
          description: 'OAuth App Client ID for GitHub Sign-In.',
          howToGet: (
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://github.com/settings/developers" target="_blank" className="text-primary hover:underline">GitHub Developer Settings</a></li>
              <li>Click <strong>New OAuth App</strong></li>
              <li>Fill in the application details:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Application name: Your app name</li>
                  <li>Homepage URL: http://localhost:3000</li>
                  <li>Authorization callback URL: <code className="bg-muted px-1 rounded">http://localhost:3000/api/auth/callback/github</code></li>
                </ul>
              </li>
              <li>Click <strong>Register application</strong></li>
              <li>Copy the Client ID</li>
            </ol>
          ),
          example: 'Iv1.abc123def456',
          required: false,
        },
        {
          name: 'GITHUB_CLIENT_SECRET',
          description: 'OAuth App Client Secret for GitHub Sign-In.',
          howToGet: 'After creating the OAuth App, click "Generate a new client secret" and copy it immediately (it won\'t be shown again).',
          example: 'abc123def456ghi789...',
          required: false,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              <span className="font-bold text-lg">JB Better Auth UI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Environment Variables Guide</h1>
          <p className="text-muted-foreground mb-8">
            Complete guide on how to obtain all the required environment variables for JB Better Auth UI.
          </p>

          {/* Quick Copy Section */}
          <div className="bg-muted rounded-lg p-6 mb-12">
            <h2 className="font-semibold mb-4">Quick Setup: Copy to .env.local</h2>
            <div className="bg-background rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Better Auth Configuration
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
GITHUB_CLIENT_SECRET=""`}</pre>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => copyToClipboard(`# Better Auth Configuration
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
GITHUB_CLIENT_SECRET=""`, 'env-template')}
            >
              {copiedKey === 'env-template' ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy Template
            </Button>
          </div>

          {/* Detailed Variables */}
          <div className="space-y-12">
            {envVariables.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{category.category}</h2>
                </div>

                <div className="space-y-6">
                  {category.vars.map((variable) => (
                    <div key={variable.name} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-lg font-semibold text-primary">{variable.name}</code>
                            {variable.required ? (
                              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full">Required</span>
                            ) : (
                              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">Optional</span>
                            )}
                          </div>
                          <p className="text-muted-foreground">{variable.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(variable.name, variable.name)}
                          className="shrink-0"
                        >
                          {copiedKey === variable.name ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">How to get it:</h4>
                          <div className="text-muted-foreground">
                            {typeof variable.howToGet === 'string' ? (
                              <p className="text-sm">{variable.howToGet}</p>
                            ) : (
                              variable.howToGet
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Example:</h4>
                          <code className="block bg-muted rounded-lg p-3 text-sm break-all">
                            {variable.name}="{variable.example}"
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Production Notes */}
          <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Production Deployment Notes</h3>
            <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
              <li className="flex items-start gap-2">
                <span className="mt-1">1.</span>
                <span>Update <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">BETTER_AUTH_URL</code> to your production domain (e.g., https://yourdomain.com)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">2.</span>
                <span>Update OAuth callback URLs in Google Cloud Console and GitHub Developer Settings to use your production domain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">3.</span>
                <span>Ensure your Resend domain is verified and properly configured</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">4.</span>
                <span>Never commit your .env.local file to version control</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://www.better-auth.com/docs"
              target="_blank"
              className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <Key className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Better Auth Docs</div>
                <div className="text-sm text-muted-foreground">Official documentation</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </a>
            <a
              href="https://resend.com/docs"
              target="_blank"
              className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Resend Docs</div>
                <div className="text-sm text-muted-foreground">Email API guide</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </a>
            <Link
              href="/"
              className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Back to Docs</div>
                <div className="text-sm text-muted-foreground">Installation guide</div>
              </div>
              <ArrowLeft className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Built with Better Auth and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  )
}
