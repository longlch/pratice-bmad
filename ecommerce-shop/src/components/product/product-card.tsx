"use client";

/**
 * ProductCard Component
 * 
 * Displays product summary in browse/grid views with hover effects,
 * semantic HTML, and WCAG AA accessibility compliance.
 * 
 * Story 4.1: Create ProductCard Component with Hover Effects
 * Architecture Section 11.2: ProductCard Component Specification
 * 
 * Features:
 * - Next.js Link wrapper for client-side navigation
 * - Semantic <article> HTML element
 * - ProductImage with hover zoom effect (group-hover:scale-105)
 * - Category Badge (shadcn/ui)
 * - Product name (H3) with line-clamp-2 truncation
 * - Short description with line-clamp-2 truncation
 * - PriceDisplay with Trust Blue styling
 * - Elevated shadow on hover (hover:shadow-lg)
 * - Focus ring for keyboard navigation (focus:ring-2 ring-blue-600)
 * - Touch-friendly on mobile (entire card is tap target)
 * 
 * @example
 * ```tsx
 * // Standard variant (default)
 * <ProductCard product={product} />
 * 
 * // With custom click handler
 * <ProductCard 
 *   product={product} 
 *   onClick={() => console.log('Card clicked')}
 * />
 * 
 * // Compact variant (deferred to Story 5.3)
 * <ProductCard product={product} variant="compact" />
 * ```
 */

import Link from 'next/link';
import { ProductCardProps } from '@/types/component-props';
import { ProductImage } from '@/components/product/product-image';
import { PriceDisplay } from '@/components/product/price-display';
import { Badge } from '@/components/ui/badge';

export function ProductCard({ 
  product, 
  variant = 'standard', // eslint-disable-line @typescript-eslint/no-unused-vars
  onClick 
}: ProductCardProps) {
  // Handle optional click event
  const handleClick = () => {
    if (onClick) {
      onClick();
      // Note: Not preventing default navigation unless explicitly needed
      // onClick is for tracking/analytics, not preventing navigation
    }
  };

  return (
    <Link 
      href={`/products/${product.slug}`}
      aria-label={`View ${product.name}`}
      onClick={handleClick}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg transition-all"
    >
      <article className="group border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white h-full flex flex-col">
        {/* Product Image with Hover Zoom */}
        <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700">
          <ProductImage
            src={product.image}
            alt={`${product.name} - ${product.category}`}
            aspectRatio="16/9"
            className="group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Product Content */}
        <div className="p-4 flex flex-col flex-grow space-y-2">
          {/* Category Badge */}
          <Badge variant="secondary" className="text-xs w-fit">
            {product.category}
          </Badge>

          {/* Product Name */}
          <h3 className="font-semibold text-lg text-slate-900 line-clamp-2 mt-2">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-600 line-clamp-2 mt-1 flex-grow">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="mt-3 pt-2">
            <PriceDisplay amount={product.price} size="large" />
          </div>
        </div>
      </article>
    </Link>
  );
}

