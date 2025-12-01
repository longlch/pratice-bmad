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

