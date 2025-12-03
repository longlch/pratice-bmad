/**
 * Test Page for ProductDetail Component
 *
 * Story 5.1: Visual verification and testing
 * This page will be removed after testing is complete
 */

import { ProductDetail } from '@/components/product/product-detail';
import products from '@/data/products.json';
import { Product } from '@/types/product';

export default function TestProductDetailPage() {
  // Use the first product for testing
  const testProduct = products[0] as Product;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">ProductDetail Component Test</h1>
          <p className="text-slate-600">Testing Story 5.1 - ProductDetail Component</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <ProductDetail product={testProduct} />
        </div>

        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Test Checklist:</h2>
          <ul className="space-y-2 text-sm">
            <li>✓ Component renders without errors</li>
            <li>✓ Two-column layout on desktop (image left, info right)</li>
            <li>✓ Product name displays as h1</li>
            <li>✓ Category badge shows correctly</li>
            <li>✓ Price displays with Trust Blue color</li>
            <li>✓ Short description visible</li>
            <li>✓ Disabled CTA buttons with tooltips</li>
            <li>✓ Full description section below</li>
            <li>✓ Specifications section with metadata</li>
            <li>✓ Responsive on mobile (resize browser to test)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
