/**
 * HomePageContent - Client Component with URL State Management
 *
 * Contains the interactive parts of the homepage that require client-side hooks.
 * Wrapped in Suspense boundary in page.tsx for Next.js 14+ production builds.
 *
 * Story 4.4: Implement Homepage with Hero, Filter, and Product Grid
 * Architecture Section 6.1: URL-Based State Management
 */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { CategoryFilter } from '@/components/filters/category-filter';
import { ProductGrid } from '@/components/product/product-grid';
import {
  getAllCategories,
  getProductsByCategory
} from '@/lib/product-data';

export default function HomePageContent() {
  // URL state management (Architecture Section 6.1)
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active category from URL (?category=games) or default to 'all'
  const activeCategory = searchParams.get('category') || 'all';

  // Load data
  const categories = getAllCategories();
  const products = getProductsByCategory(activeCategory);

  // Handle category change - updates URL without page reload
  const handleCategoryChange = (slug: string) => {
    router.push(`/?category=${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Category Filter - Horizontal tabs with URL state */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Product Grid - Responsive 4/2/1 column layout */}
      <ProductGrid products={products} />
    </div>
  );
}
