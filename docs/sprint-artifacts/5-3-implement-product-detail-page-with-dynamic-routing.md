# Story 5.3: Implement Product Detail Page with Dynamic Routing

**Story ID:** 5.3
**Story Key:** 5-3-implement-product-detail-page-with-dynamic-routing
**Epic:** Epic 5 - Product Detail Pages
**Status:** ready-for-dev
**Created:** 2025-12-03
**Priority:** High
**Estimated Complexity:** Medium

---

## Story

As a **user**,
I want to **click on any product and see its detailed information page**,
So that **I can learn more before making a purchase decision**.

---

## Acceptance Criteria

### AC1: Dynamic Route Setup
**Given** ProductDetail and Breadcrumb components exist (Stories 5.1-5.2)
**When** I implement the dynamic product detail route
**Then** `src/app/products/[slug]/page.tsx` exists as a Server Component with:
- Dynamic route parameter: `[slug]`
- Fetches product data via `getProductBySlug(params.slug)`
- Fetches related products via `getRelatedProducts(product.id, 4)`
- Returns rendered product detail page
- No `'use client'` directive (Server Component by default)

### AC2: Page Layout Structure
**Given** the product detail page renders
**When** displaying the complete page
**Then** it includes in order:
1. **Breadcrumb component** - Shows navigation path (Home > Category > Product Name)
2. **ProductDetail component** - Main product information with image, specs, description
3. **Related products section:**
   - Heading: "You might also like" (`<h2>`, text-2xl, font-semibold)
   - ProductGrid component with 4 related products
   - Desktop: Horizontal layout (grid-cols-4)
   - Proper spacing between sections (space-y-8 or space-y-12)

### AC3: 404 Handling for Invalid Slugs
**Given** a user navigates to an invalid product URL
**When** `getProductBySlug(slug)` returns `undefined`
**Then** the page:
- Calls `notFound()` from 'next/navigation'
- Next.js renders `src/app/not-found.tsx` (404 page)

**And** the 404 page (`src/app/not-found.tsx`) shows:
- Heading: "Product not found"
- Message: "The product you're looking for doesn't exist or has been removed."
- "Browse Products" button linking to `/`
- Friendly, helpful tone (not technical error message)
- Maintains header/footer layout (from root layout)

### AC4: Dynamic Metadata for SEO
**Given** the product detail page is accessed
**When** Next.js generates page metadata
**Then** it uses `generateMetadata` function to set:
- Page title: `"{product.name} - ecommerce-shop"`
- Meta description: `product.shortDescription`
- Open Graph title: `product.name` (optional Phase 1)
- Open Graph description: `product.shortDescription` (optional Phase 1)
- Open Graph image: `product.image` (optional Phase 1)

### AC5: URL Structure and Navigation
**Given** the dynamic routing is implemented
**When** users navigate to product pages
**Then** URLs follow the structure:
- Pattern: `/products/{slug}`
- Example: `/products/premium-game-pass`
- Slugs are URL-friendly: lowercase-with-hyphens
- Clicking ProductCard on homepage navigates to correct detail page
- URL is clean and readable (no IDs visible)

### AC6: Related Products Section
**Given** the product detail page displays
**When** the related products section renders
**Then** it shows:
- **4 related products** from `product.relatedProducts` array
- **Fallback logic:** If `relatedProducts` not defined or empty, show 4 products from same category
- Heading: "You might also like" (`<h2>`, text-2xl, font-semibold)
- Uses ProductGrid component to display products
- Desktop: 4 columns (grid-cols-4)
- Tablet: 2 columns
- Mobile: 1 column
- Clicking related product navigates to that product's detail page

### AC7: Breadcrumb Integration
**Given** the product detail page renders
**When** the breadcrumb displays
**Then** it shows:
- Structure: Home > {Category Name} > {Product Name}
- Example: "Home > Games > Premium Game Pass"
- **Home link:** navigates to `/`
- **Category link:** navigates to `/?category={product.category}`
- **Product name:** plain text (current page, not clickable)
- Category name is fetched from `getAllCategories()` by matching `product.category`

### AC8: Visual and Functional Verification
**Given** the product detail page is complete
**When** I test the implementation
**Then** I can verify:
- Navigate to homepage, click any ProductCard → shows product detail page
- Detail page shows all product info (name, image, price, description, specifications)
- Breadcrumb shows correct path: Home > Category Name > Product Name
- Related products section shows 4 products
- Click related product → navigates to that product's detail page
- Try invalid URL `/products/fake-slug` → shows 404 page with "Browse Products" button
- Click "Browse Products" on 404 → returns to homepage
- Browser back button from detail page → returns to homepage with preserved category filter

---

## Tasks / Subtasks

- [ ] **Task 1:** Create dynamic route file structure (AC: #1, #5)
  - [ ] Create directory: `src/app/products/[slug]/`
  - [ ] Create file: `src/app/products/[slug]/page.tsx`
  - [ ] Set up as Server Component (no 'use client')
  - [ ] Define `ProductPageProps` interface with `params: { slug: string }`

- [ ] **Task 2:** Implement data fetching logic (AC: #1, #6, #7)
  - [ ] Import data functions: `getProductBySlug`, `getRelatedProducts`, `getAllCategories`
  - [ ] Fetch product: `const product = getProductBySlug(params.slug)`
  - [ ] Implement 404 check: `if (!product) notFound()`
  - [ ] Fetch related products: `getRelatedProducts(product.id, 4)`
  - [ ] Map category ID to name using `getAllCategories()`
  - [ ] Build breadcrumb items array from product data

- [ ] **Task 3:** Implement page layout (AC: #2)
  - [ ] Add main container: `<main className="max-w-7xl mx-auto px-4 py-8">`
  - [ ] Render Breadcrumb component with items array
  - [ ] Render ProductDetail component with product prop
  - [ ] Add related products section with heading and ProductGrid
  - [ ] Apply proper spacing between sections (space-y-8 or mt-16)

- [ ] **Task 4:** Create 404 page (AC: #3)
  - [ ] Create file: `src/app/not-found.tsx`
  - [ ] Add heading: "Product Not Found"
  - [ ] Add friendly message
  - [ ] Add "Browse Products" button (shadcn/ui Button linking to `/`)
  - [ ] Center content vertically and horizontally
  - [ ] Style with Tailwind classes

- [ ] **Task 5:** Implement dynamic metadata (AC: #4)
  - [ ] Create `generateMetadata` async function
  - [ ] Accept `params` prop with slug
  - [ ] Fetch product by slug
  - [ ] Return `Metadata` object with title and description
  - [ ] Handle 404 case (return "Product Not Found" title)
  - [ ] Add Open Graph metadata (optional)

- [ ] **Task 6:** Implement related products logic (AC: #6)
  - [ ] Check if `product.relatedProducts` exists and has items
  - [ ] If yes: Use `getRelatedProducts(product.id, 4)`
  - [ ] If no: Fallback to same-category products
  - [ ] Render ProductGrid with related products
  - [ ] Add conditional: Only show section if `relatedProducts.length > 0`

- [ ] **Task 7:** Test navigation and routing (AC: #8)
  - [ ] Test homepage → click ProductCard → verify detail page loads
  - [ ] Test breadcrumb links (Home, Category)
  - [ ] Test related products links → verify navigation
  - [ ] Test invalid slug → verify 404 page
  - [ ] Test browser back button → verify homepage state preserved
  - [ ] Test direct URL access (e.g., `/products/premium-game-pass`)

- [ ] **Task 8:** Visual and accessibility testing (AC: #8)
  - [ ] Verify all product information displays correctly
  - [ ] Test responsive layout (mobile, tablet, desktop)
  - [ ] Test keyboard navigation (Tab through links)
  - [ ] Verify single `<h1>` per page (in ProductDetail component)
  - [ ] Run Lighthouse accessibility scan (target ≥90)
  - [ ] Test with screen reader

---

## Dev Notes

### Architecture Compliance

**Routing & Navigation (Architecture Section 8.1):**
- Dynamic route: `src/app/products/[slug]/page.tsx`
- URL pattern: `/products/{slug}`
- Server Component (default, no 'use client')
- 404 handling with `notFound()` from 'next/navigation'
- Metadata with `generateMetadata` function

**Component Integration (Architecture Section 11):**
- Uses ProductDetail component (Story 5.1)
- Uses Breadcrumb component (Story 5.2)
- Uses ProductGrid component (Epic 4)
- Uses ProductCard component (Epic 4)

**Data Loading (Architecture Section 3.3):**
- `getProductBySlug(slug)` - Find product by URL slug
- `getRelatedProducts(productId, limit)` - Get related products
- `getAllCategories()` - Map category ID to name
- All functions from `@/lib/product-data`

**SEO Optimization (Architecture Section 8.1):**
- Dynamic page titles per product
- Meta descriptions from product data
- Single `<h1>` per page (in ProductDetail)
- Semantic HTML structure
- Clean URL slugs (no IDs)

### Technical Requirements

**File Structure:**
```
src/app/
├── products/
│   └── [slug]/
│       └── page.tsx     (Server Component)
└── not-found.tsx        (404 page)
```

**Server Component Implementation:**
```typescript
// src/app/products/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getProductBySlug,
  getRelatedProducts,
  getAllCategories
} from '@/lib/product-data';
import { ProductDetail } from '@/components/product/product-detail';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { ProductGrid } from '@/components/product/product-grid';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found - ecommerce-shop',
    };
  }

  return {
    title: `${product.name} - ecommerce-shop`,
    description: product.shortDescription,
  };
}

// Server Component page
export default function ProductPage({ params }: ProductPageProps) {
  // Fetch product data
  const product = getProductBySlug(params.slug);

  // 404 if product not found
  if (!product) {
    notFound();
  }

  // Fetch related products
  const relatedProducts = getRelatedProducts(product.id, 4);

  // Get category name for breadcrumb
  const categories = getAllCategories();
  const category = categories.find(c => c.id === product.category);
  const categoryName = category?.name || 'Products';

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: categoryName, href: `/?category=${product.category}` },
    { label: product.name },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Product Detail */}
      <ProductDetail product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </main>
  );
}
```

**404 Page Implementation:**
```typescript
// src/app/not-found.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        Product Not Found
      </h1>
      <p className="text-lg text-slate-600 mb-8 text-center">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/">
        <Button variant="default">Browse Products</Button>
      </Link>
    </div>
  );
}
```

### Library & Framework Requirements

**Next.js 14+ App Router:**
- Dynamic routes with `[slug]` directory
- Server Components (default)
- `generateMetadata` for dynamic SEO
- `notFound()` for 404 handling
- Import from 'next/navigation'

**TypeScript:**
- `ProductPageProps` interface for page props
- `Metadata` type from 'next'
- Proper typing for all functions

**Data Functions (from Epic 3):**
- `getProductBySlug(slug: string): Product | undefined`
- `getRelatedProducts(productId: string, limit: number): Product[]`
- `getAllCategories(): Category[]`

**Components (from previous stories):**
- ProductDetail (Story 5.1)
- Breadcrumb (Story 5.2)
- ProductGrid (Epic 4, Story 4.2)
- ProductCard (Epic 4, Story 4.1)
- Button (Epic 2, Story 2.2)

### File Structure Requirements

**New Files to Create:**
1. `src/app/products/[slug]/page.tsx` - Dynamic product page
2. `src/app/not-found.tsx` - 404 page

**Files to Import:**
- `@/lib/product-data` - Data functions
- `@/components/product/product-detail` - ProductDetail component
- `@/components/layout/breadcrumb` - Breadcrumb component
- `@/components/product/product-grid` - ProductGrid component
- `@/components/ui/button` - Button component
- `next/navigation` - notFound function
- `next` - Metadata type

### Testing Requirements

**Manual Testing Checklist:**
1. **Navigation Testing:**
   - Go to homepage
   - Click any ProductCard
   - Verify product detail page loads
   - Check URL is `/products/{slug}` format

2. **Data Display Testing:**
   - Verify product name, image, price display
   - Verify description and specifications show
   - Check breadcrumb shows Home > Category > Product
   - Verify related products section shows 4 products

3. **Link Testing:**
   - Click breadcrumb "Home" → navigate to `/`
   - Click breadcrumb category → navigate to `/?category={slug}`
   - Click related product → navigate to that product's page

4. **404 Testing:**
   - Navigate to `/products/invalid-slug`
   - Verify 404 page displays
   - Click "Browse Products" → navigate to homepage

5. **Back Button Testing:**
   - Go to homepage with category filter (e.g., `/?category=games`)
   - Click product → go to detail page
   - Click browser back button
   - Verify returns to homepage with `?category=games` preserved

6. **Metadata Testing:**
   - View page source
   - Verify `<title>` contains product name
   - Verify meta description contains product shortDescription

**Responsive Testing:**
- Desktop (≥1024px): Related products show 4 columns
- Tablet (640-1023px): Related products show 2 columns
- Mobile (<640px): Related products show 1 column

**Accessibility Testing:**
- Single `<h1>` on page (in ProductDetail component)
- "You might also like" is `<h2>` (proper hierarchy)
- Keyboard Tab navigation works
- Screen reader announces breadcrumb navigation
- Lighthouse accessibility score ≥90

### Project Structure Notes

**App Router Structure:**
- Uses Next.js 14+ App Router convention
- Dynamic segment: `[slug]` directory name
- Server Component by default (no client bundle)
- Fast page loads with server-side rendering

**Integration Points:**
- Homepage ProductCard links to `/products/{product.slug}`
- Related products link to other product detail pages
- Breadcrumb links back to homepage and category filter
- 404 page links back to homepage

**No Conflicts:**
- New route (no modifications to existing pages)
- Uses existing components without changes
- Data functions already exist (Epic 3)

### References

**Source Documents:**
- [Architecture Section 8.1: Routing & Navigation](docs/architecture.md#8.1)
- [Architecture Section 3.3: Data Loading Functions](docs/architecture.md#3.3)
- [Epic 5 Tech Context: Dynamic Route Specification](docs/sprint-artifacts/epic-5-tech-context.md#3.3)
- [Epics Document: Story 5.3 Acceptance Criteria](docs/epics.md#1173-1254)

**Prerequisites (All Completed or in Epic 5):**
- Story 5.1: ProductDetail component ✅
- Story 5.2: Breadcrumb component ✅
- Story 4.2: ProductGrid component ✅
- Story 4.1: ProductCard component ✅
- Story 3.2: Data functions (getProductBySlug, getRelatedProducts) ✅

---

## Previous Story Intelligence

**Lessons from Story 5.1 & 5.2:**
- Use semantic HTML for SEO (single `<h1>` per page)
- Apply proper spacing between sections (space-y-*, mt-*)
- Test responsive layout at all breakpoints
- Verify keyboard accessibility
- Use Trust Blue theme for consistency

**Patterns from Epic 4:**
- Server Components for data fetching (no client-side state)
- Responsive grid layouts (4/2/1 columns)
- Clean URL structure with slugs
- Browser back button preservation

**Common Patterns:**
- max-w-7xl mx-auto px-4 for page containers
- py-8 for vertical page padding
- text-2xl font-semibold for section headings
- Space between sections for visual hierarchy

---

## Latest Tech Information

**Next.js 14+ Dynamic Routes:**
- `[slug]` directory creates dynamic segment
- Access via `params.slug` in page component
- Server Components by default (faster initial load)
- `generateMetadata` for dynamic SEO per route
- `notFound()` triggers 404 page automatically

**SEO Best Practices:**
- Unique page title per product
- Meta description from product data
- Single `<h1>` per page (SEO ranking factor)
- Clean URL structure (no query params for product ID)
- Semantic HTML with breadcrumbs

**Related Products Algorithm:**
- Primary: Use explicit `product.relatedProducts` array
- Fallback: Show products from same category
- Exclude current product from fallback results
- Limit to 4 products for optimal display

---

## Project Context Reference

**Phase 1 Scope:**
- Product detail pages are core browsing feature
- No cart or checkout (Phase 2)
- Disabled CTAs with "Coming in Phase 2" message
- Static product data from JSON files

**User Flow:**
```
Homepage
  ↓ (click ProductCard)
Product Detail Page (/products/[slug])
  ↓ (click breadcrumb)
Back to Homepage with filter preserved
  OR
  ↓ (click related product)
Another Product Detail Page
```

**Component Hierarchy:**
```
/products/[slug]/page.tsx (this story)
├── Breadcrumb (Story 5.2)
├── ProductDetail (Story 5.1)
│   ├── ProductImage (Epic 2)
│   ├── PriceDisplay (Epic 2)
│   ├── Badge (Epic 2)
│   └── Button (Epic 2)
└── ProductGrid (Epic 4)
    └── ProductCard (Epic 4)
```

---

## Definition of Done

✅ **Story 5.3 is DONE when:**

1. **Code Complete:**
   - [ ] `src/app/products/[slug]/page.tsx` created
   - [ ] `src/app/not-found.tsx` created
   - [ ] `generateMetadata` function implemented
   - [ ] Data fetching with getProductBySlug, getRelatedProducts
   - [ ] TypeScript compiles without errors
   - [ ] No linting warnings

2. **Functionality Complete:**
   - [ ] All 8 acceptance criteria (AC1-AC8) met
   - [ ] Dynamic routing works for all products
   - [ ] 404 page handles invalid slugs
   - [ ] Breadcrumb displays correct navigation path
   - [ ] Related products section shows 4 products
   - [ ] Product detail shows all information
   - [ ] Metadata set dynamically per product

3. **Integration Complete:**
   - [ ] Homepage ProductCard links work
   - [ ] Related product links work
   - [ ] Breadcrumb links navigate correctly
   - [ ] Browser back button preserves filter state
   - [ ] All components integrate properly

4. **Quality Complete:**
   - [ ] Semantic HTML with proper heading hierarchy
   - [ ] WCAG AA accessibility compliance
   - [ ] Responsive on mobile, tablet, desktop
   - [ ] Keyboard navigation works
   - [ ] Lighthouse Performance ≥90
   - [ ] Lighthouse Accessibility ≥90

5. **Testing Complete:**
   - [ ] Navigation testing (all links work)
   - [ ] 404 testing (invalid slugs handled)
   - [ ] Responsive testing (all breakpoints)
   - [ ] Accessibility testing (keyboard, screen reader)
   - [ ] Metadata testing (page title, description)
   - [ ] Visual verification (layout, spacing, styling)

6. **Documentation Complete:**
   - [ ] Dev notes updated with completion details
   - [ ] File list updated with created files
   - [ ] Any learnings documented
   - [ ] Epic 5 marked as complete in sprint status

---

## Dev Agent Record

### Context Reference

Story context engine analysis completed - comprehensive developer guide created.

**Key Context Sources:**
- Epic 5 technical context document (Section 3.3)
- Architecture sections 8.1 (Routing), 3.3 (Data Loading), 11 (Components)
- Epics.md Story 5.3 detailed acceptance criteria
- Previous Epic 4 & 5 patterns and conventions

### Agent Model Used

_To be filled by dev agent during implementation_

### Debug Log References

_To be filled by dev agent during implementation_

### Completion Notes List

_To be filled by dev agent during implementation_

### File List

**Files to be created:**
- `src/app/products/[slug]/page.tsx` - Dynamic product detail page (Server Component)
- `src/app/not-found.tsx` - 404 page

**Files to be imported:**
- `@/lib/product-data` - getProductBySlug, getRelatedProducts, getAllCategories
- `@/components/product/product-detail` - ProductDetail component
- `@/components/layout/breadcrumb` - Breadcrumb component
- `@/components/product/product-grid` - ProductGrid component
- `@/components/ui/button` - Button component (for 404 page)
- `next/navigation` - notFound function
- `next` - Metadata type
- `next/link` - Link component (for 404 page)

---

**Story Status:** ready-for-dev
**Last Updated:** 2025-12-03
**Created By:** Bob (Scrum Master) via Ultimate BMad Method Story Context Engine
