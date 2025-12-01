/**
 * Test Page for CategoryFilter Component
 * 
 * Tests all acceptance criteria for Story 4.3:
 * - Horizontal tab layout with overflow scroll
 * - Active/inactive button styling
 * - Click behavior and state updates
 * - Keyboard navigation
 * - Responsive behavior
 * - Accessibility (ARIA attributes)
 * 
 * Access at: http://localhost:3000/test-category-filter
 */

'use client';

import { useState } from 'react';
import { CategoryFilter } from '@/components/filters/category-filter';
import { getAllCategories, getProductsByCategory } from '@/lib/product-data';

export default function TestCategoryFilterPage() {
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState('all');
  const [clickLog, setClickLog] = useState<string[]>([]);

  // Get product counts for each category
  const productCounts = categories.reduce((acc, category) => {
    const products = getProductsByCategory(category.slug);
    acc[category.slug] = products.length;
    return acc;
  }, {} as Record<string, number>);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp} - Category changed to: ${slug}`;
    setClickLog([logEntry, ...clickLog.slice(0, 9)]); // Keep last 10 logs
    console.log(logEntry);
  };

  const currentProducts = getProductsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            CategoryFilter Component Test
          </h1>
          <p className="text-slate-600">
            Story 4.3: Testing horizontal category selection with URL state management
          </p>
        </div>

        {/* Test Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            Test Instructions
          </h2>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Click different categories to verify filtering works</li>
            <li>✓ Press Tab to navigate through categories with keyboard</li>
            <li>✓ Press Enter or Space on focused category to select it</li>
            <li>✓ Verify active category has Trust Blue background</li>
            <li>✓ Verify inactive categories have outline style</li>
            <li>✓ Verify hover effects on inactive categories</li>
            <li>✓ Verify focus ring visible when using keyboard</li>
            <li>✓ Resize browser to test responsive/horizontal scroll</li>
            <li>✓ Inspect ARIA attributes in DevTools</li>
          </ul>
        </div>

        {/* CategoryFilter Component */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Category Filter (with product counts)
          </h2>
          
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            productCounts={productCounts}
          />
        </div>

        {/* CategoryFilter Without Counts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Category Filter (without product counts)
          </h2>
          
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* State Display */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current State */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Current State
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-slate-600">Active Category:</span>
                <div className="mt-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded text-blue-900 font-mono">
                  {activeCategory}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Products Found:</span>
                <div className="mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono">
                  {currentProducts.length} products
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Total Categories:</span>
                <div className="mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono">
                  {categories.length} categories
                </div>
              </div>
            </div>
          </div>

          {/* Click Log */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Click Log (Console)
            </h2>
            <div className="space-y-1 font-mono text-xs">
              {clickLog.length === 0 ? (
                <p className="text-slate-400 italic">No clicks yet. Try clicking categories above.</p>
              ) : (
                clickLog.map((log, index) => (
                  <div 
                    key={index} 
                    className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700"
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Product Counts Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Product Counts by Category
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 px-4 font-semibold text-slate-900">Category</th>
                  <th className="py-2 px-4 font-semibold text-slate-900">Slug</th>
                  <th className="py-2 px-4 font-semibold text-slate-900 text-right">Count</th>
                  <th className="py-2 px-4 font-semibold text-slate-900 text-center">Active</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr 
                    key={category.id}
                    className={`border-b border-slate-100 ${
                      activeCategory === category.slug ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="py-2 px-4 text-slate-900">{category.name}</td>
                    <td className="py-2 px-4 font-mono text-sm text-slate-600">{category.slug}</td>
                    <td className="py-2 px-4 text-slate-900 text-right">
                      {productCounts[category.slug]}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {activeCategory === category.slug && (
                        <span className="inline-block w-3 h-3 bg-blue-600 rounded-full" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Accessibility Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-900 mb-3">
            ✓ Accessibility Features Implemented
          </h2>
          <ul className="space-y-2 text-green-800">
            <li>• role=&quot;tablist&quot; on container div</li>
            <li>• aria-label=&quot;Filter products by category&quot; on container</li>
            <li>• role=&quot;tab&quot; on each button</li>
            <li>• aria-selected={'{'}true|false{'}'} on buttons</li>
            <li>• Keyboard navigation: Tab, Enter, Space</li>
            <li>• Focus ring visible (2px blue ring)</li>
            <li>• Touch-friendly button sizes (≥44px)</li>
            <li>• Horizontal scroll on mobile (-webkit-overflow-scrolling: touch)</li>
            <li>• Semantic HTML structure</li>
          </ul>
        </div>

        {/* Visual States Test */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Visual States Reference
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Active State:</p>
              <p className="text-sm text-slate-500">
                Trust Blue background (#2563eb), white text, no border
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Inactive State:</p>
              <p className="text-sm text-slate-500">
                White background, slate text, slate border
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Hover State (inactive):</p>
              <p className="text-sm text-slate-500">
                Blue border, blue text, smooth transition
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Focus State:</p>
              <p className="text-sm text-slate-500">
                Blue focus ring (2px), visible when using keyboard
              </p>
            </div>
          </div>
        </div>

        {/* Test Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Acceptance Criteria Status
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-slate-700">Structure & Props (AC-1)</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ File at src/components/filters/category-filter.tsx</li>
                <li>✓ &apos;use client&apos; directive</li>
                <li>✓ CategoryFilterProps interface used</li>
                <li>✓ Named export</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-700">Layout (AC-2)</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Flexbox horizontal layout</li>
                <li>✓ Overflow scroll on mobile</li>
                <li>✓ role=&quot;tablist&quot; accessibility</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-700">Buttons (AC-3)</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ shadcn/ui Button component</li>
                <li>✓ Active: variant=&quot;default&quot;</li>
                <li>✓ Inactive: variant=&quot;outline&quot;</li>
                <li>✓ ARIA attributes</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-700">Behavior (AC-4)</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ onClick calls onCategoryChange</li>
                <li>✓ Parent updates URL (simulated)</li>
                <li>✓ No page reload</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

