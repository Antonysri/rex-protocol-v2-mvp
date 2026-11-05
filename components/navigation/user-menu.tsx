'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, Wallet } from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { formatAddress } from '@/lib/wallet/format-address'
import { useWallet } from '@/providers/wallet-provider'
import type { User } from '@/types/user'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

type UserMenuProps = {
  user: User
  onSignOut: () => void
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { address, disconnectWallet } = useWallet()
  const formattedAddress = address ? formatAddress(address) : null
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current) {
        return
      }
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  function handleSignOut() {
    setIsOpen(false)
    onSignOut()
  }

  function handleDisconnectWallet() {
    disconnectWallet()
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${user.name} account menu`}
        className={cn(
          'flex h-9 min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-left text-slate-800 shadow-sm backdrop-blur-md transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/[0.08]',
          isOpen && 'border-slate-300 bg-slate-50 dark:border-white/25 dark:bg-white/[0.08]',
        )}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-[11px] font-bold text-white shadow-inner ring-1 ring-white/10">
          {getInitials(user.name)}
        </span>
        <span
          className="max-w-32 truncate text-[13px] font-medium"
          aria-label={`${user.name} profile`}
        >
          {user.name}
        </span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-slate-400 transition-transform dark:text-gray-400',
            isOpen && 'rotate-180 text-slate-700 dark:text-white',
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-11 min-w-64 origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:border-white/10 dark:bg-surface-base/95 dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
        >
          <div className="border-b border-slate-200 px-3 pb-3 pt-2 dark:border-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-gray-500">
              Signed in as
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
            <p className="truncate text-[11px] text-slate-500 dark:text-gray-400">{user.email}</p>
          </div>

          {formattedAddress ? (
            <div className="border-b border-slate-200 px-3 py-3 dark:border-white/10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-gray-500">
                Connected wallet
              </p>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-800 dark:text-gray-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-success/15 ring-1 ring-success/30">
                  <Wallet className="h-3 w-3 text-success" aria-hidden="true" />
                </span>
                <span className="font-mono text-[12.5px]" title={address ?? undefined}>
                  {formattedAddress}
                </span>
              </div>
            </div>
          ) : null}

          <div className="pt-1">
            {formattedAddress ? (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/40 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-white"
                onClick={handleDisconnectWallet}
              >
                <Wallet className="h-3.5 w-3.5 text-slate-400 dark:text-gray-400" aria-hidden="true" />
                Disconnect Wallet
              </button>
            ) : null}

            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] text-red-600 transition-colors hover:bg-red-500/10 hover:text-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400 dark:text-gray-200 dark:hover:text-red-200"
              onClick={handleSignOut}
            >
              <LogOut className="h-3.5 w-3.5 text-red-500 dark:text-gray-400" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
