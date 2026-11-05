import { Menu, X } from 'lucide-react'
import { AuthActions } from '@/components/navigation/auth-actions'
import { NavigationLinks } from '@/components/navigation/navigation-links'
import { ThemeToggle } from '@/components/navigation/theme-toggle'

type MobileNavigationProps = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: (isOpen: boolean) => void
  onSignIn: () => void
  pathname: string
}

export function MobileNavigation({
  isOpen,
  onClose,
  onOpenChange,
  onSignIn,
  pathname,
}: MobileNavigationProps) {
  return (
    <div className="flex items-center md:hidden">
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        className="rounded-md p-2 text-slate-700 transition-colors hover:text-slate-900 dark:text-gray-200 dark:hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/40"
        onClick={() => onOpenChange(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[68px] border-b border-slate-200 bg-white/95 px-4 pb-6 pt-3 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-gray-900/95">
          <div className="space-y-1">
            <NavigationLinks pathname={pathname} variant="mobile" onNavigate={onClose} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-3">
            <ThemeToggle variant="labeled" />
            <AuthActions
              variant="mobile"
              onSignIn={() => {
                onClose()
                onSignIn()
              }}
              onSignedOut={onClose}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
