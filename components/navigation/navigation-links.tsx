import Link from 'next/link'
import { cn } from '@/components/ui/utils'

const navigationItems = [
  { href: '/properties', label: 'Properties' },
  { href: '/how-it-works', label: 'How it Works' },
  { href: '/about', label: 'About' },
]

type NavigationLinksProps = {
  pathname: string
  variant?: 'desktop' | 'mobile'
  onNavigate?: () => void
}

export function NavigationLinks({
  pathname,
  variant = 'desktop',
  onNavigate,
}: NavigationLinksProps) {
  return (
    <>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'group relative inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/40 dark:text-gray-300 dark:hover:text-white',
              variant === 'mobile' && 'block rounded-md px-2 py-2 hover:bg-slate-100 dark:hover:bg-white/5',
              isActive && 'text-slate-900 font-semibold dark:text-white',
            )}
            onClick={onNavigate}
          >
            {variant === 'desktop' && isActive ? (
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
            ) : null}
            {item.label}
          </Link>
        )
      })}
    </>
  )
}
