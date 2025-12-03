/**
 * ProductGrid Component
 * 
 * Responsive grid container for displaying product cards with loading states.
 * Implements responsive layout: 4 columns (desktop), 2 columns (tablet), 1 column (mobile).
 * 
 * Story 4.2: Create ProductGrid Component with Loading States
 * Architecture Section 11.2: ProductGrid Component Specification
 * 
 * Features:
 * - Responsive CSS Grid layout (grid-cols-1/md:grid-cols-2/lg:grid-cols-4)
 * - Skeleton loading state (8 skeleton screens)
 * - Empty state with custom message support
 * - WCAG AA accessibility (aria-label, aria-busy)
 * - Semantic HTML (section element)
 * - No layout shift between loading/loaded states
 * 
 * Responsive Breakpoints (Architecture Section 4.2):
 * - Mobile: < 640px (1 column)
 * - Tablet: 640px - 1023px (2 columns)
 * - Desktop: ≥ 1024px (4 columns)
 * 
 * @example
 * ```tsx
 * // Loading state
 * <ProductGrid products={[]} loading={true} />
 * 
 * // Loaded with products
 * <ProductGrid products={products} />
 * 
 * // Empty state with custom message
 * <ProductGrid 
 *   products={[]} 
 *   emptyMessage="No products match your filters. Try browsing all products."
 * />
 * ```
 */

import { ProductGridProps } from '@/types/component-props';
import { ProductCard } from '@/components/product/product-card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductGrid({ 
  products, 
  loading = false, 
  emptyMessage = "No products found" 
}: ProductGridProps) {
  // Loading state: Show 8 skeleton screens
  if (loading) {
    return (
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        aria-busy="true"
        aria-label="Product grid"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[16/9] h-80" />
        ))}
      </div>
    );
  }

  // Empty state: Show message when no products
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">{emptyMessage}</p>
      </div>
    );
  }

  // Loaded state: Render product cards in grid
  return (
    <section 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      aria-label="Product grid"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}




