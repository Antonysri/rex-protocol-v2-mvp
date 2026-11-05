'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/theme-provider'
import { cn } from '@/components/ui/utils'

type ThemeToggleProps = {
  className?: string
  variant?: 'icon' | 'labeled'
}

export function ThemeToggle({ className, variant = 'icon' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch by rendering a stable placeholder until mounted
  if (!mounted) {
    return (
      <div
        className={cn(
          'h-9 w-9 rounded-full border border-slate-200/80 bg-white/50 dark:border-white/10 dark:bg-white/5',
          className,
        )}
        aria-hidden="true"
      />
    )
  }

  const isDark = theme === 'dark'

  if (variant === 'labeled') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-xl border border-slate-200/80 bg-white/80 px-4 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10',
          className,
        )}
      >
        <span className="flex items-center gap-2.5">
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4 text-brand" aria-hidden="true" />
          )}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </span>
        <span className="text-xs text-slate-500 dark:text-gray-400">
          {isDark ? 'Switch to light' : 'Switch to dark'}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'group relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:shadow-none dark:hover:bg-white/10 dark:hover:text-white',
        className,
      )}
    >
      {isDark ? (
        <Sun
          className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="h-4 w-4 text-slate-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-gray-300"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
