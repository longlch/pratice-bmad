/**
 * ProductDetail Component
 *
 * Comprehensive product detail view with image gallery, pricing, description,
 * specifications, and CTA buttons. Follows Trust Blue theme and responsive design.
 *
 * Story 5.1: Create ProductDetail Component with Full Information
 * Architecture Section 11.2: Core Component Specifications
 * Architecture Section 13.3: Component Structure Pattern
 * Architecture Section 13.6: Accessibility Pattern Rules
 */

import { ProductDetailProps } from '@/types/component-props';
import { ProductImage } from './product-image';
import { PriceDisplay } from './price-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * ProductDetail Component
 *
 * Displays comprehensive product information in a responsive layout:
 * - Desktop: Two-column layout (60/40 split, image left, info right)
 * - Mobile: Stacked vertical layout
 * - Includes description, specifications, and disabled Phase 2 CTAs
 *
 * @example
 * ```tsx
 * import { ProductDetail } from '@/components/product/product-detail';
 *
 * <ProductDetail product={product} />
 * ```
 */
export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article className="max-w-7xl mx-auto px-4 py-8">
      {/* Two-column layout: Image (60%) + Info (40%) */}
      <div className="grid lg:grid-cols-5 gap-8 mb-12">
        {/* Left Column: Product Image */}
        <div className="lg:col-span-3">
          <ProductImage
            src={product.image}
            alt={`${product.name} - ${product.category}`}
            aspectRatio="16/9"
            priority={true}
            className="rounded-lg"
          />
        </div>

        {/* Right Column: Product Information */}
        <div className="lg:col-span-2 space-y-4">
          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            {product.name}
          </h1>

          {/* Category Badge */}
          <div>
            <Badge variant="secondary" className="text-sm">
              {product.category}
            </Badge>
          </div>

          {/* Price Display */}
          <div className="pt-2">
            <PriceDisplay
              amount={product.price}
              size="xlarge"
            />
          </div>

          {/* Short Description */}
          <p className="text-lg text-slate-700 mt-4">
            {product.shortDescription}
          </p>

          {/* CTA Buttons (Disabled for Phase 1) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="default"
              disabled={true}
              title="Coming in Phase 2"
              className="opacity-50 cursor-not-allowed"
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              disabled={true}
              title="Coming in Phase 2"
              className="opacity-50 cursor-not-allowed"
            >
              Buy Now
            </Button>
          </div>

          {/* Phase 2 Notice */}
          <p className="text-sm text-slate-500 italic">
            Cart and checkout features coming in Phase 2
          </p>
        </div>
      </div>

      {/* Full-Width Description Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Description
        </h2>
        <div className="text-slate-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </div>
      </section>

      {/* Specifications/Metadata Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Specifications
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.platform && (
            <div className="border-b border-slate-200 pb-2">
              <dt className="text-sm font-semibold text-slate-900 mb-1">
                Platform
              </dt>
              <dd className="text-slate-700">
                {product.platform}
              </dd>
            </div>
          )}

          {product.deliveryMethod && (
            <div className="border-b border-slate-200 pb-2">
              <dt className="text-sm font-semibold text-slate-900 mb-1">
                Delivery Method
              </dt>
              <dd className="text-slate-700">
                {product.deliveryMethod}
              </dd>
            </div>
          )}

          {product.deliveryTime && (
            <div className="border-b border-slate-200 pb-2">
              <dt className="text-sm font-semibold text-slate-900 mb-1">
                Delivery Time
              </dt>
              <dd className="text-slate-700">
                {product.deliveryTime}
              </dd>
            </div>
          )}
        </dl>
      </section>
    </article>
  );
}
