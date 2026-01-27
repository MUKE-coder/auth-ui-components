'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgetPasswordSchema, type ForgetPasswordInput } from '@/lib/auth-schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { AppLogoIcon } from '@/components/icons'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function ForgetPassword() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ForgetPasswordInput>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: ForgetPasswordInput) {
    setIsLoading(true)
    await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "forget-password",
    }, {
        onSuccess: () => {
             toast.success("If an account exists, a reset code has been sent.")
             sessionStorage.setItem("reset_email", data.email)
             router.push("/auth/reset-password")
        },
        onError: (ctx) => {
             form.setError('root', {
                message: ctx.error.message,
             })
             toast.error(ctx.error.message)
             setIsLoading(false)
        }
    })
    setIsLoading(false)
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-card m-auto h-fit w-full max-w-md rounded-lg border p-0.5 shadow-md">
        <div className="p-8 pb-6">
          <Link href="/" aria-label="go home">
            <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">Reset password</h1>
          <p className="text-sm text-muted-foreground">Enter your email address and we&apos;ll send you a link to reset your password</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-sm">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          </Form>
        </div>

        <div className="rounded-lg border bg-muted p-3">
          <p className="text-center text-sm">
            Remember your password?
            <Button asChild variant="link" className="ml-3 px-2">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}
