import Image from 'next/image'
import Link from 'next/link'
import { Building2, Home, MapPin, ShieldCheck } from 'lucide-react'
import type { Property } from '@/data/properties'

type PropertyCardProps = {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const TypeIcon = property.type === 'Commercial' ? Building2 : Home
  const layoutLabel =
    property.type === 'Residential' && property.bedrooms ? `${property.bedrooms} BR` : 'Office'
  const fundedPercent = 100 - property.tokensAvailable

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-surface-base"
    >
      <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/15 dark:hover:bg-white/[0.05]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent"
          />

          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/10 backdrop-blur-md">
              <TypeIcon className="h-3 w-3" aria-hidden="true" />
              {property.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-400/30 backdrop-blur-md">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              On-Chain
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[22px] font-bold leading-none text-slate-900 dark:text-white">
                ${property.price.toLocaleString()}
              </p>
              <p className="mt-1.5 text-[12px] text-slate-500 dark:text-gray-500">From $100 / share</p>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:bg-success/12 dark:text-emerald-300 dark:ring-emerald-400/25">
              {property.roi}% ROI
            </span>
          </div>

          <div className="mt-4 flex items-stretch divide-x divide-slate-200 dark:divide-white/10 text-[13px]">
            <div className="pr-4">
              <p className="font-semibold text-slate-900 dark:text-white">{layoutLabel}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-slate-500 dark:text-gray-500">Layout</p>
            </div>
            <div className="px-4">
              <p className="font-semibold text-slate-900 dark:text-white">{property.area.toLocaleString()}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-slate-500 dark:text-gray-500">sqft</p>
            </div>
            <div className="pl-4">
              <p className="font-semibold text-slate-900 dark:text-white">{property.yearBuilt}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-slate-500 dark:text-gray-500">Built</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[12.5px] text-slate-600 dark:text-gray-400">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            <span className="truncate">{property.location}</span>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[10.5px] uppercase tracking-wider">
              <span className="font-medium text-slate-600 dark:text-gray-400">{fundedPercent}% funded</span>
              <span className="text-slate-500 dark:text-gray-500">{property.tokensAvailable}% available</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-soft"
                style={{ width: `${fundedPercent}%` }}
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
