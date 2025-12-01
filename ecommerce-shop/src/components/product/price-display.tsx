/**
 * PriceDisplay Component
 * 
 * Displays product prices with consistent currency formatting and Trust Blue styling.
 * Supports multiple currencies (USD, EUR, GBP) and size variants.
 * 
 * Story 2.3: Create PriceDisplay Component with Currency Formatting
 * Architecture Section 11.2: Core Component Specifications
 */

import { cn } from "@/lib/utils";
import type { PriceDisplayProps } from "@/types/component-props";

/**
 * Size variant style mappings
 */
const sizeVariants = {
  small: "text-base font-semibold",
  large: "text-xl font-bold",
  xlarge: "text-2xl font-bold",
} as const;

/**
 * Currency locale mappings for Intl.NumberFormat
 */
const currencyLocales = {
  USD: "en-US",
  EUR: "en-US", // Use en-US locale even for EUR for consistency
  GBP: "en-US", // Use en-US locale even for GBP for consistency
} as const;

/**
 * PriceDisplay Component
 * 
 * Renders a formatted price with proper currency symbol and Trust Blue styling.
 * 
 * @example
 * ```tsx
 * <PriceDisplay amount={49.99} size="large" />
 * // Renders: $49.99 (in Trust Blue, large bold)
 * 
 * <PriceDisplay amount={199.99} currency="EUR" size="small" />
 * // Renders: €199.99 (in Trust Blue, small)
 * ```
 */
export function PriceDisplay({
  amount,
  currency = "USD",
  size = "large",
  className,
}: PriceDisplayProps) {
  // Format price using Intl.NumberFormat for proper currency display
  const formattedPrice = new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Generate accessible label for screen readers
  const ariaLabel = `Price: ${formattedPrice}`;

  return (
    <span
      className={cn(
        // Trust Blue color (#2563eb / blue-600)
        "text-blue-600",
        // Size variant
        sizeVariants[size],
        // Custom classes
        className
      )}
      aria-label={ariaLabel}
    >
      {formattedPrice}
    </span>
  );
}

