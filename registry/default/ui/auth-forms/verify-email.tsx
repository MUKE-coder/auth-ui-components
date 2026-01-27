'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyEmailSchema, type VerifyEmailInput } from '@/lib/auth-schemas'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect } from 'react'

export function VerifyEmail() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verify_email")
    if (storedEmail) setEmail(storedEmail)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else {
      setCanResend(true)
    }
    return () => clearTimeout(timer)
  }, [countdown, canResend])

  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  })

  async function onSubmit(data: VerifyEmailInput) {
    setIsLoading(true)
    await authClient.emailOtp.verifyEmail({
        email: email, // Use state email
        otp: data.code,
    }, {
        onSuccess: () => {
            toast.success("Email verified successfully!")
            sessionStorage.removeItem("verify_email")
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
  }

  async function handleResendCode() {
    if (!email) {
        toast.error("No email found to resend code.")
        return
    }
    setResendLoading(true)
    setCanResend(false)
    setCountdown(60)

    await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification"
    }, {
        onSuccess: () => {
             toast.success("Code resent! Check your email.")
             setResendLoading(false)
        },
        onError: (ctx) => {
            toast.error(ctx.error.message)
            setCanResend(true)
            setCountdown(0)
            setResendLoading(false)
        }
    })
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-card m-auto h-fit w-full max-w-md rounded-lg border p-0.5 shadow-md">
        <div className="p-8 pb-6">
          <Link href="/" aria-label="go home">
            <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">Verify your email</h1>
          <p className="text-sm text-muted-foreground">We sent a verification code to {email}</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-sm">Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="w-full justify-center">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify email'}
              </Button>
            </form>
          </Form>
        </div>

        <div className="rounded-lg border bg-muted p-3">
          <p className="text-center text-sm">
            Didn&apos;t receive the code?
            <Button
              asChild
              variant="link"
              className="ml-3 px-2"
              onClick={(e) => {
                e.preventDefault()
                handleResendCode()
              }}
            >
              <button disabled={!canResend || resendLoading}>
                {resendLoading ? 'Resending...' : canResend ? 'Resend' : `Resend in ${countdown}s`}
              </button>
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}
