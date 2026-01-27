'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { AppLogoIcon } from '@/components/icons'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

const resetPasswordOtpSchema = z.object({
  otp: z.string().min(6, "Please enter the 6-digit code"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordOtpInput = z.infer<typeof resetPasswordOtpSchema>

export function ResetPassword() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("reset_email")
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const form = useForm<ResetPasswordOtpInput>({
    resolver: zodResolver(resetPasswordOtpSchema),
    defaultValues: {
      otp: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: ResetPasswordOtpInput) {
    if (!email) {
      toast.error("Email not found. Please go back and request a new reset code.")
      return
    }

    setIsLoading(true)
    await authClient.emailOtp.resetPassword({
      email: email,
      otp: data.otp,
      password: data.password,
    }, {
      onSuccess: () => {
        toast.success("Password reset successfully! Please log in.")
        sessionStorage.removeItem("reset_email")
        router.push("/auth/sign-in")
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

  async function handleResendOtp() {
    if (!email) {
      toast.error("Email not found. Please go back and request a new reset code.")
      return
    }

    await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: "forget-password",
    }, {
      onSuccess: () => {
        toast.success("A new reset code has been sent to your email.")
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  }

  if (!email) {
    return (
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <div className="bg-card m-auto h-fit w-full max-w-md rounded-lg border p-0.5 shadow-md">
          <div className="p-8 pb-6 text-center">
            <AppLogoIcon className="h-10 mx-auto fill-current text-black sm:h-12" />
            <h1 className="mb-1 mt-4 text-xl font-semibold">Session Expired</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Please request a new password reset code.
            </p>
            <Button asChild className="w-full">
              <Link href="/auth/forgot-password">Request Reset Code</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-card m-auto h-fit w-full max-w-md rounded-lg border p-0.5 shadow-md">
        <div className="p-8 pb-6">
          <Link href="/" aria-label="go home">
            <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to <span className="font-medium">{email}</span> and your new password.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-sm">Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="w-full flex justify-between">
                          <InputOTPSlot index={0} className="flex-1" />
                          <InputOTPSlot index={1} className="flex-1" />
                          <InputOTPSlot index={2} className="flex-1" />
                          <InputOTPSlot index={3} className="flex-1" />
                          <InputOTPSlot index={4} className="flex-1" />
                          <InputOTPSlot index={5} className="flex-1" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-sm">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showPassword ? 'Hide password' : 'Show password'}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-sm">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showConfirmPassword ? 'Hide password' : 'Show password'}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Reset Password'}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={handleResendOtp} className="text-sm">
              Didn&apos;t receive the code? Resend
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-muted p-3">
          <p className="text-center text-sm">
            Remember your password?
            <Button asChild variant="link" className="ml-3 px-2">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}
