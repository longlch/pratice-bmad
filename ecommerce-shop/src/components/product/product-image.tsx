"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductImageProps } from "@/types/component-props";

/**
 * ProductImage Component
 * 
 * Optimized image component using Next.js Image for automatic WebP conversion,
 * lazy loading, and responsive sizing. Includes Trust Blue gradient fallback
 * for failed images and hover effects for product cards.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ProductImage
 *   src="/images/products/game.jpg"
 *   alt="Premium Game Pass - Games"
 * />
 * 
 * // With priority loading (hero/above-fold)
 * <ProductImage
 *   src="/images/products/featured.jpg"
 *   alt="Featured Product - Software"
 *   priority={true}
 * />
 * 
 * // Square aspect ratio
 * <ProductImage
 *   src="/images/products/thumbnail.jpg"
 *   alt="Product Thumbnail"
 *   aspectRatio="1/1"
 * />
 * 
 * // In product card with hover effect
 * <div className="group overflow-hidden">
 *   <ProductImage
 *     src={product.image}
 *     alt={`${product.name} - ${product.category}`}
 *   />
 * </div>
 * ```
 * 
 * Features:
 * - Automatic WebP optimization via Next.js Image
 * - Three aspect ratios: 16/9 (default), 1/1, 4/3
 * - Trust Blue gradient fallback for failed images
 * - Lazy loading by default, priority loading for above-fold
 * - Hover zoom effect when used in card contexts
 * - WCAG AA compliant with required alt text
 * 
 * @see Architecture Section 7 (Image Strategy)
 * @see Architecture Section 11.2 (Core Component Specifications)
 */
export function ProductImage({
  src,
  alt,
  category,
  aspectRatio = "16/9",
  priority = false,
  className,
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  // Aspect ratio dimension mappings
  const aspectRatioDimensions = {
    "16/9": { width: 800, height: 450 },
    "1/1": { width: 800, height: 800 },
    "4/3": { width: 800, height: 600 },
  } as const;

  // Tailwind aspect ratio classes
  const aspectRatioClasses = {
    "16/9": "aspect-[16/9]",
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
  } as const;

  const dimensions = aspectRatioDimensions[aspectRatio];
  const aspectClass = aspectRatioClasses[aspectRatio];

  // Error fallback: Trust Blue gradient with centered icon
  if (imageError) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-blue-600 to-blue-700",
          "flex items-center justify-center text-white",
          aspectClass,
          "rounded-lg",
          className
        )}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-sm opacity-90">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", aspectClass, "overflow-hidden rounded-lg")}>
      <Image
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className={cn(
          "object-cover rounded-lg",
          "transition-transform duration-200",
          "group-hover:scale-105",
          className
        )}
        onError={() => setImageError(true)}
        quality={85}
      />
    </div>
  );
}

