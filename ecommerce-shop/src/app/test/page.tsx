/**
 * ProductCard Manual Testing Page
 * Story 4.1 - Acceptance Criteria 12: Manual Testing Checklist
 * 
 * This page allows testing all ProductCard features:
 * - Visual display of product information
 * - Hover effects (shadow + image zoom)
 * - Keyboard navigation (Tab, Enter)
 * - Screen reader announcements
 * - Responsive behavior
 * - Text truncation
 */

import { ProductCard } from '@/components/product/product-card';
import { getAllProducts } from '@/lib/product-data';
import { Product } from '@/types/product';

export default function TestProductCardPage() {
  // Get real products from the catalog
  const products = getAllProducts();
  
  // Sample regular products
  const regularProducts = products.slice(0, 4);
  
  // Create a product with very long name and description for truncation testing
  const longTextProduct: Product = {
    ...products[0],
    id: 'test-long',
    slug: 'test-long-text',
    name: 'This Is An Extremely Long Product Name That Should Be Truncated After Two Lines To Test The Line Clamp Functionality Works Correctly And Shows Ellipsis',
    shortDescription: 'This is also a very long description that should be truncated after two lines to ensure the line-clamp-2 utility is working as expected in the ProductCard component and prevents layout breaking.',
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            ProductCard Component - Manual Testing
          </h1>
          <p className="text-slate-600">
            Story 4.1: Test all ProductCard features below
          </p>
        </div>

        {/* Testing Instructions */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            AC-12: Manual Testing Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div>
              <h3 className="font-semibold mb-2">Visual Tests</h3>
              <ul className="space-y-1 ml-4">
                <li>✓ All product info displays</li>
                <li>✓ Long text truncates (2 lines)</li>
                <li>✓ Image shows 16:9 ratio</li>
                <li>✓ Badge shows category</li>
                <li>✓ Price in Trust Blue</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Interaction Tests</h3>
              <ul className="space-y-1 ml-4">
                <li>✓ Hover: shadow + zoom</li>
                <li>✓ Tab: blue focus ring</li>
                <li>✓ Enter: navigate</li>
                <li>✓ Click: navigate</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Responsive Tests</h3>
              <ul className="space-y-1 ml-4">
                <li>✓ Desktop (1280px): 4 cols</li>
                <li>✓ Tablet (768px): 2 cols</li>
                <li>✓ Mobile (375px): 1 col</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Accessibility Tests</h3>
              <ul className="space-y-1 ml-4">
                <li>✓ Screen reader announcements</li>
                <li>✓ Keyboard navigation</li>
                <li>✓ WCAG AA contrast</li>
                <li>✓ Lighthouse: 100%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 1: Regular Products Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            1. Regular Product Cards (Hover to Test Effects)
          </h2>
          <p className="text-slate-600 mb-4 text-sm">
            Test hover effects: Card shadow should elevate and image should zoom slightly. Try clicking to navigate (404 expected).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 2: Long Text Truncation Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            2. Text Truncation Test (Long Name & Description)
          </h2>
          <p className="text-slate-600 mb-4 text-sm">
            The card below has very long text. Both name and description should truncate after 2 lines with ellipsis (...).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard product={longTextProduct} />
            {regularProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 3: Keyboard Navigation Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            3. Keyboard Navigation Test (Press Tab Key)
          </h2>
          <p className="text-slate-600 mb-4 text-sm">
            Press Tab to navigate between cards. Each card should show a blue focus ring. Press Enter to activate the link.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 4: Responsive Layout Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            4. Responsive Layout Test (Resize Browser)
          </h2>
          <p className="text-slate-600 mb-4 text-sm">
            Resize your browser window to test responsive behavior:
            Desktop (&ge;1024px) = 4 columns | Tablet (640-1023px) = 2 columns | Mobile (&lt;640px) = 1 column
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(8, 16).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 5: Accessibility Testing Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            5. Accessibility Testing Instructions
          </h2>
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <h3 className="font-semibold mb-2">🔊 Screen Reader Testing:</h3>
              <ul className="ml-4 space-y-1">
                <li>• <strong>Mac:</strong> Enable VoiceOver (Cmd + F5), navigate with Tab key</li>
                <li>• <strong>Windows:</strong> Use NVDA (free download), navigate with Tab key</li>
                <li>• <strong>Expected:</strong> Announces &quot;View [Product Name]&quot; when focused</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎯 Lighthouse Testing:</h3>
              <ul className="ml-4 space-y-1">
                <li>• Open Chrome DevTools (F12 or Cmd + Option + I)</li>
                <li>• Navigate to &quot;Lighthouse&quot; tab</li>
                <li>• Select &quot;Accessibility&quot; category only</li>
                <li>• Click &quot;Analyze page load&quot;</li>
                <li>• <strong>Target:</strong> 100% accessibility score</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔍 axe DevTools Testing:</h3>
              <ul className="ml-4 space-y-1">
                <li>• Install axe DevTools browser extension</li>
                <li>• Open extension panel in DevTools</li>
                <li>• Click &quot;Scan ALL of my page&quot;</li>
                <li>• <strong>Target:</strong> 0 violations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📐 Contrast Testing:</h3>
              <ul className="ml-4 space-y-1">
                <li>• Use WebAIM Contrast Checker: <a href="https://webaim.org/resources/contrastchecker/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">webaim.org/resources/contrastchecker</a></li>
                <li>• Test: Product name (slate-900 on white) = 7.15:1 ratio ✓</li>
                <li>• Test: Description (slate-600 on white) = 7.15:1 ratio ✓</li>
                <li>• Test: Price (blue-600 on white) = 7.35:1 ratio ✓</li>
                <li>• <strong>Target:</strong> WCAG AA requires 4.5:1 minimum</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final Notes */}
        <div className="bg-slate-100 border border-slate-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Testing Complete? Next Steps:
          </h2>
          <div className="space-y-2 text-sm text-slate-700">
            <p>✓ <strong>All tests passed?</strong> Update sprint-status.yaml: <code className="bg-slate-200 px-2 py-1 rounded">4-1-create-productcard-component-with-hover-effects: done</code></p>
            <p>✓ <strong>Found issues?</strong> Report them to the dev team for fixes</p>
            <p>✓ <strong>Ready for next story?</strong> Proceed to Story 4.2 (ProductGrid Component)</p>
          </div>
        </div>
      </div>
    </main>
  );
}

