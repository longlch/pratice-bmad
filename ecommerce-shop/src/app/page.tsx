/**
 * Homepage - Digital Products Marketplace
 *
 * Main entry point of the ecommerce-shop application.
 * Displays hero banner, category filtering, and responsive product grid.
 *
 * Story 4.4: Implement Homepage with Hero, Filter, and Product Grid
 * Architecture Section 6.1: URL-Based State Management
 * Architecture Section 8.1: Routing & Navigation
 *
 * Features:
 * - HeroBanner with Trust Blue gradient
 * - CategoryFilter with URL-based state management
 * - ProductGrid showing filtered products (4/2/1 column layout)
 * - Browser back button support
 * - Shareable URLs (e.g., /?category=games)
 */

import { Suspense } from 'react';
import { HeroBanner } from '@/components/layout/hero-banner';
import { Skeleton } from '@/components/ui/skeleton';
import HomePageContent from './home-content';

/**
 * Homepage - Digital Products Marketplace
 *
 * Wrapper component that provides Suspense boundary for client component.
 * Required for Next.js 14+ production builds when using useSearchParams.
 *
 * Story 4.4: Implement Homepage with Hero, Filter, and Product Grid
 */
export default function HomePage() {
  return (
    <main>
      {/* Hero Banner - Full width with Trust Blue gradient */}
      <HeroBanner />

      {/* Suspense boundary required for useSearchParams in production */}
      <Suspense fallback={<HomePageSkeleton />}>
        <HomePageContent />
      </Suspense>
    </main>
  );
}

/**
 * Loading skeleton for homepage content
 */
function HomePageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Category filter skeleton */}
      <div className="flex gap-2 overflow-x-auto py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[16/9] h-80" />
        ))}
      </div>
    </div>
  );
}
