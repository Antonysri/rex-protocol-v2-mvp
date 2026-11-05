'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInSchema, type SignInFormValues } from '@/lib/validation/auth'
import { useAuth } from '@/providers/auth-provider'
import { Github, Mail } from 'lucide-react'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { signIn } = useAuth()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: SignInFormValues) {
    signIn(values.email)
    reset()
    onClose()
  }

  function mockSignIn(email: string) {
    signIn(email)
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-slate-200 bg-white/95 text-slate-900 shadow-xl dark:border-gray-700 dark:bg-gray-800/90 dark:backdrop-blur-lg dark:text-white">
        <DialogTitle className="text-2xl font-bold text-center">Sign In</DialogTitle>
        <DialogDescription className="sr-only">
          Sign in with a mock account to preview the investor experience.
        </DialogDescription>

        <div className="grid gap-6">
          <div className="space-y-2 text-center">
            <p className="text-slate-500 dark:text-gray-400">Choose your preferred sign in method</p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full space-x-2 border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-gray-700 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              onClick={() => mockSignIn('demo@github.com')}
            >
              <Github className="h-5 w-5" />
              <span>Continue with Github</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full space-x-2 border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-gray-700 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              onClick={() => mockSignIn('demo@email.com')}
            >
              <Mail className="h-5 w-5" />
              <span>Continue with Email</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 dark:bg-gray-800/90 dark:text-gray-400">Or</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand dark:border-gray-700 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                {...register('email')}
              />
              {errors.email ? (
                <p id="email-error" role="alert" className="text-sm text-red-500 dark:text-red-300">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand dark:border-gray-700 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                {...register('password')}
              />
              {errors.password ? (
                <p id="password-error" role="alert" className="text-sm text-red-500 dark:text-red-300">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
            <Button type="submit" className="w-full bg-brand hover:bg-brand-hover text-white">
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm">
            <a href="#" className="text-brand hover:text-brand-hover">
              Forgot password?
            </a>
          </div>

          <div className="text-center text-sm text-slate-500 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-brand hover:text-brand-hover">
              Sign up
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
