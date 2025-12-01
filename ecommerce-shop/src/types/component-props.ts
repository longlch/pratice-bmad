/**
 * Component Props Type Definitions
 * 
 * Centralized type definitions for reusable components.
 * Follow Architecture Section 13.3 (Component Structure Pattern).
 */

import { Product, Category } from './product';

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

// ============================================
// Story 3.1: Product Domain Component Props
// ============================================

/**
 * Props for ProductCard component (Epic 4)
 */
export interface ProductCardProps {
  /** Product to display */
  product: Product;
  
  /** Display variant for different contexts */
  variant?: 'standard' | 'compact' | 'featured';
  
  /** Click handler (optional, defaults to navigate to detail page) */
  onClick?: () => void;
}

/**
 * Props for ProductGrid component (Epic 4)
 */
export interface ProductGridProps {
  /** Array of products to display in grid */
  products: Product[];
  
  /** Whether data is currently loading */
  loading?: boolean;
  
  /** Message to show when products array is empty */
  emptyMessage?: string;
}

/**
 * Props for CategoryFilter component (Epic 4)
 */
export interface CategoryFilterProps {
  /** Available categories for filtering */
  categories: Category[];
  
  /** Currently active/selected category slug */
  activeCategory: string;
  
  /** Callback when user selects a different category */
  onCategoryChange: (categorySlug: string) => void;
  
  /** Optional product count per category for badges */
  productCounts?: Record<string, number>;
}

// ============================================
// Type Aliases for Union Types
// ============================================

/**
 * Product card display variant types
 */
export type ProductCardVariant = 'standard' | 'compact' | 'featured';

/**
 * Currency types for price display
 */
export type Currency = 'USD' | 'EUR' | 'GBP';

/**
 * Display size variants for components
 */
export type DisplaySize = 'small' | 'large' | 'xlarge';

/**
 * Image aspect ratio types
 */
export type AspectRatio = '16/9' | '1/1' | '4/3';

