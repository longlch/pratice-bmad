/**
 * Component Props Type Definitions
 * 
 * Centralized type definitions for reusable components.
 * Follow Architecture Section 13.3 (Component Structure Pattern).
 */

// ============================================
// Story 2.3: PriceDisplay Component
// ============================================

export interface PriceDisplayProps {
  /**
   * Price amount in decimal format (e.g., 49.99)
   */
  amount: number;
  
  /**
   * Currency code for formatting
   * @default 'USD'
   */
  currency?: 'USD' | 'EUR' | 'GBP';
  
  /**
   * Size variant for the price display
   * - small: text-base font-semibold
   * - large: text-xl font-bold (default)
   * - xlarge: text-2xl font-bold
   * @default 'large'
   */
  size?: 'small' | 'large' | 'xlarge';
  
  /**
   * Additional CSS classes for custom styling
   */
  className?: string;
}

// ============================================
// Story 2.4: ProductImage Component
// ============================================

export interface ProductImageProps {
  /**
   * Image source URL or path
   * For Phase 1, use placeholder.co URLs or public/images/products paths
   * @example "https://placehold.co/800x450/2563eb/ffffff?text=Product"
   * @example "/images/products/premium-game-pass.jpg"
   */
  src: string;
  
  /**
   * Accessibility alt text (required for WCAG AA compliance)
   * Format: "{product.name} - {product.category}"
   * Use empty string alt="" for decorative images
   * @example "Premium Game Pass - Games"
   */
  alt: string;
  
  /**
   * Optional category for badge overlay (future enhancement)
   */
  category?: string;
  
  /**
   * Image aspect ratio
   * - 16/9: Default for product cards and detail images (800x450px)
   * - 1/1: Square thumbnails (800x800px)
   * - 4/3: Alternative layout (800x600px)
   * @default '16/9'
   */
  aspectRatio?: '16/9' | '1/1' | '4/3';
  
  /**
   * Priority loading for above-fold images (LCP optimization)
   * Set to true for hero images and first product cards
   * @default false
   */
  priority?: boolean;
  
  /**
   * Additional CSS classes for custom styling
   */
  className?: string;
}

// ============================================
// Story 2.5: ErrorMessage Component
// ============================================

export interface ErrorMessageProps {
  /**
   * User-friendly error message to display
   * Should be clear and actionable, not technical stack traces
   * @example "Unable to load products"
   * @example "Product not found"
   * @example "Connection issue. Please try again."
   */
  message: string;
  
  /**
   * Optional retry callback function
   * If provided, displays a "Try Again" button that calls this function
   * @example () => window.location.reload()
   * @example () => refetchData()
   */
  onRetry?: () => void;
  
  /**
   * Additional CSS classes for custom styling
   */
  className?: string;
}

