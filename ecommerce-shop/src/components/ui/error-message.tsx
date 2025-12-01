/**
 * ErrorMessage Component
 * 
 * Displays user-friendly error messages with optional retry functionality.
 * Follows Architecture Section 9.2 (Error Display Components) and
 * Section 13.6 (Accessibility Pattern Rules).
 * 
 * @example
 * // Basic error (no retry)
 * <ErrorMessage message="Unable to load products" />
 * 
 * @example
 * // Error with retry functionality
 * <ErrorMessage 
 *   message="Connection issue. Please try again."
 *   onRetry={() => window.location.reload()}
 * />
 * 
 * @example
 * // Custom styled error
 * <ErrorMessage 
 *   message="Product not found"
 *   className="mt-8"
 * />
 */

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ErrorMessageProps } from '@/types/component-props';

export function ErrorMessage({
  message,
  onRetry,
  className
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6",
        "bg-red-50 border border-red-200 rounded-lg",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Error Icon */}
      <div className="text-5xl mb-4" aria-hidden="true">
        ⚠️
      </div>
      
      {/* Error Message */}
      <p className="text-red-600 text-lg text-center mb-4">
        {message}
      </p>
      
      {/* Optional Retry Button */}
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="default"
          aria-label="Retry loading"
          className="mt-2"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}


