import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PropertyCard } from '@/components/properties/property-card'
import { properties } from '@/data/properties'

const FEATURED_LIMIT = 6

export function FeaturedProperties() {
  const featured = properties.slice(0, FEATURED_LIMIT)

  return (
    <section className="scroll-mt-24 bg-slate-50 py-28 sm:py-36 transition-colors duration-200 dark:bg-surface-base" id="featured-properties">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-gray-400">
              Hand-picked deals available for fractional ownership today.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/properties">
            <Button
              size="lg"
              variant="outline"
              className="h-11 gap-2 rounded-full border-slate-300 bg-white text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md hover:bg-slate-100 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:bg-white/10 dark:hover:text-white"
            >
              See More Properties
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
