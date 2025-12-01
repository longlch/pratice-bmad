/**
 * CategoryFilter Component
 * 
 * Horizontal category selection bar for filtering products.
 * Uses URL-based state management via parent component.
 * 
 * Story 4.3: Create CategoryFilter Component with URL State
 * Architecture Section 11.2: CategoryFilter Component (lines 796-851)
 */

'use client';

import { Button } from '@/components/ui/button';
import { CategoryFilterProps } from '@/types/component-props';

/**
 * CategoryFilter - Horizontal category tabs with active state highlighting
 * 
 * @param categories - Array of categories to display
 * @param activeCategory - Currently active category slug
 * @param onCategoryChange - Callback when category is clicked
 * @param productCounts - Optional product count per category
 */
export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  productCounts 
}: CategoryFilterProps) {
  return (
    <div 
      className="flex gap-2 overflow-x-auto py-4"
      style={{ WebkitOverflowScrolling: 'touch' }}
      role="tablist"
      aria-label="Filter products by category"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.slug;
        
        return (
          <Button
            key={category.id}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category.slug)}
            role="tab"
            aria-selected={isActive}
            className="transition-colors whitespace-nowrap"
          >
            {category.name}
            {productCounts && productCounts[category.slug] !== undefined && (
              <span className="ml-1.5 opacity-75">
                ({productCounts[category.slug]})
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

