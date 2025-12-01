/**
 * Product Domain Type Definitions
 * 
 * Core types for products and categories in the ecommerce marketplace.
 * Follow Architecture Section 3 (Data Architecture) and Section 4.1 (Core Types).
 */

// ============================================
// Product Interface
// ============================================

/**
 * Product represents a digital product in the marketplace.
 * Used for all product displays: cards, grids, detail pages.
 */
export interface Product {
  /** Unique identifier. Format: "prod_001", "prod_002", etc. */
  id: string;
  
  /** URL-friendly identifier for routing. Format: lowercase-with-hyphens. */
  slug: string;
  
  /** Display name shown to users. Max 100 characters. */
  name: string;
  
  /** Category identifier. Must match a Category.id from categories.json. */
  category: string;
  
  /** Price in USD. Use number type for calculations, not string. */
  price: number;
  
  /** Brief 1-2 sentence description for product cards. */
  shortDescription: string;
  
  /** Full multi-paragraph description for product detail pages. */
  description: string;
  
  /** Primary product image path. Format: "/images/products/{slug}.jpg" */
  image: string;
  
  /** Additional product images for gallery view (optional). */
  images?: string[];
  
  /** Platform compatibility info (optional). Example: "Windows, Mac, Web" */
  platform?: string;
  
  /** How product is delivered (optional). Example: "Email", "Account Dashboard" */
  deliveryMethod?: string;
  
  /** Expected delivery timeframe (optional). Example: "Instant", "Within 24 hours" */
  deliveryTime?: string;
  
  /** Whether product should appear in featured section (optional). */
  featured?: boolean;
  
  /** Array of related product IDs for "You might also like" section (optional). */
  relatedProducts?: string[];
}

// ============================================
// Category Interface
// ============================================

/**
 * Category represents a product category for filtering.
 * Used in category filter component and product organization.
 */
export interface Category {
  /** Unique identifier. Used for filtering. Example: "games", "software" */
  id: string;
  
  /** Display name shown to users. Example: "Games", "Software" */
  name: string;
  
  /** URL parameter value. Should match id for simplicity. Example: "games" */
  slug: string;
}

