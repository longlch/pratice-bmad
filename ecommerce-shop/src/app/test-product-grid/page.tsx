"use client";

/**
 * Test Page for ProductGrid Component (Story 4.2)
 * 
 * Tests all three states:
 * 1. Loading state (skeleton screens)
 * 2. Empty state (no products message)
 * 3. Loaded state (products displayed in grid)
 * 
 * Also tests responsive behavior at different breakpoints.
 */

import { useState } from 'react';
import { ProductGrid } from '@/components/product/product-grid';
import { getAllProducts } from '@/lib/product-data';
import { Button } from '@/components/ui/button';

type ViewState = 'loading' | 'empty' | 'loaded';

export default function TestProductGridPage() {
  const [viewState, setViewState] = useState<ViewState>('loaded');
  const allProducts = getAllProducts();

  // Determine what to pass to ProductGrid based on viewState
  const getProductGridProps = () => {
    switch (viewState) {
      case 'loading':
        return { products: [], loading: true };
      case 'empty':
        return { 
          products: [], 
          loading: false,
          emptyMessage: "No products match your filters. Try browsing all products."
        };
      case 'loaded':
        return { products: allProducts, loading: false };
      default:
        return { products: allProducts, loading: false };
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Test Controls */}
      <div className="bg-white border-b border-slate-200 py-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            ProductGrid Component Test - Story 4.2
          </h1>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant={viewState === 'loading' ? 'default' : 'outline'}
              onClick={() => setViewState('loading')}
            >
              Loading State
            </Button>
            <Button
              variant={viewState === 'empty' ? 'default' : 'outline'}
              onClick={() => setViewState('empty')}
            >
              Empty State
            </Button>
            <Button
              variant={viewState === 'loaded' ? 'default' : 'outline'}
              onClick={() => setViewState('loaded')}
            >
              Loaded State ({allProducts.length} products)
            </Button>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            <p><strong>Current State:</strong> {viewState}</p>
            <p className="mt-1">
              <strong>Instructions:</strong> Toggle between states to verify all acceptance criteria.
              Resize your browser to test responsive behavior (4/2/1 columns).
            </p>
          </div>
        </div>
      </div>

      {/* ProductGrid Component Under Test */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductGrid {...getProductGridProps()} />
      </div>

      {/* Test Checklist */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Test Checklist (Story 4.2 Acceptance Criteria)
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">AC-3: Loading State</h3>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>Shows 8 skeleton screens with shimmer animation</li>
                <li>Skeletons have aspect-[16/9] and h-80</li>
                <li>Grid layout maintained (same columns as loaded state)</li>
                <li>Container has aria-busy=&quot;true&quot;</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">AC-4: Empty State</h3>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>Centered message with text-center py-12</li>
                <li>Text color is text-slate-600</li>
                <li>Custom message displays correctly</li>
                <li>Professional and helpful tone</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">AC-5: Loaded State</h3>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>All {allProducts.length} products display in grid</li>
                <li>Each card has unique key (product.id)</li>
                <li>Grid responds to breakpoints smoothly</li>
                <li>Consistent spacing via grid gap</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">AC-2: Responsive Grid Layout</h3>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>Desktop (≥1024px): 4 columns with gap-6</li>
                <li>Tablet (640-1023px): 2 columns with gap-6</li>
                <li>Mobile (&lt;640px): 1 column with gap-4</li>
                <li>No layout shift between states</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">AC-6: Accessibility</h3>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>Semantic section element with aria-label=&quot;Product grid&quot;</li>
                <li>aria-busy attribute during loading</li>
                <li>Screen reader announces states</li>
                <li>Keyboard navigation flows naturally through cards</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-900">
              <strong>Manual Testing:</strong> Use browser DevTools to inspect elements, 
              verify aria attributes, and test keyboard navigation (Tab, Enter). 
              Use responsive mode to test different screen sizes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

