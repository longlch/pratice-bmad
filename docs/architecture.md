# Architecture Document
## ecommerce-shop - Phase 1: UI Foundation

**Project:** ecommerce-shop  
**Phase:** Phase 1 - Product Catalog UI  
**Date:** 2025-11-30  
**Architect:** Winston (BMAD)  
**Status:** In Progress  
**Version:** 1.0

---

## Executive Summary

This architecture defines the technical foundation for Phase 1 of the ecommerce-shop digital marketplace. Phase 1 delivers a browsing-only experience with product listings, category filtering, and detailed product pages. The architecture uses Next.js 14+ with TypeScript and Tailwind CSS, optimized for static product catalogs without requiring backend infrastructure.

**Key Architectural Decisions:**
- **Next.js 14+ App Router** as foundation (server components, optimized images, file-based routing)
- **shadcn/ui + Tailwind CSS** for component library and styling (Trust Blue theme)
- **Static JSON data** for product catalog (no database needed in Phase 1)
- **URL-based state management** for filtering (no state library needed)
- **Domain-based component organization** for maintainability

This architecture ensures AI agents implement Phase 1 consistently while establishing patterns that scale to Phase 2 (cart/checkout) and beyond.

---

## 1. Project Initialization

### 1.1 Starter Template

**Selected Foundation:** Next.js 14+ with App Router

**Initialization Command:**
```bash
npx create-next-app@latest ecommerce-shop --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**What this provides:**
- ✅ Next.js 14+ with React 18+
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup
- ✅ App Router (modern Next.js architecture)
- ✅ ESLint for code quality
- ✅ src/ directory structure
- ✅ Path aliases (@/components, @/lib, @/types)
- ✅ Fast Refresh development server
- ✅ Production-optimized build system

**Post-initialization steps:**
1. Install shadcn/ui: `npx shadcn@latest init`
2. Configure Trust Blue theme in `tailwind.config.ts`
3. Add initial shadcn/ui components: `npx shadcn@latest add button card badge`

### 1.2 Technology Stack Versions

| Technology | Version | Verified Date | Purpose |
|------------|---------|---------------|---------|
| Next.js | 14.x (latest stable) | 2025-11-30 | React framework with App Router |
| React | 18.x | 2025-11-30 | UI library with Server Components |
| TypeScript | 5.x | 2025-11-30 | Type safety and developer experience |
| Tailwind CSS | 3.x | 2025-11-30 | Utility-first CSS framework |
| shadcn/ui | Latest | 2025-11-30 | Accessible component primitives |

**Why these versions:**
- Next.js 14+ provides App Router, Server Components, and optimized images critical for product catalog performance
- React 18+ enables Server Components for better initial page load
- TypeScript 5.x offers improved type inference and performance
- Tailwind CSS 3.x provides JIT compilation for smaller bundle sizes
- shadcn/ui uses latest Radix UI primitives for WCAG AA accessibility

---

## 2. Project Structure

### 2.1 Directory Organization

```
ecommerce-shop/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout (header/footer)
│   │   ├── page.tsx                 # Homepage (product grid)
│   │   ├── products/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Product detail page
│   │   └── globals.css              # Tailwind + custom styles
│   ├── components/                   # Organized by domain
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── skeleton.tsx
│   │   ├── product/                 # Product-specific components
│   │   │   ├── product-card.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-image.tsx
│   │   │   └── product-detail.tsx
│   │   ├── layout/                  # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── hero-banner.tsx
│   │   └── filters/
│   │       └── category-filter.tsx
│   ├── lib/                         # Utilities & helpers
│   │   ├── utils.ts                 # shadcn/ui cn() utility
│   │   ├── product-data.ts          # Product data loader functions
│   │   └── constants.ts             # App-wide constants
│   ├── types/                       # TypeScript type definitions
│   │   ├── product.ts               # Product, Category interfaces
│   │   └── component-props.ts       # Component prop types
│   └── data/                        # Static data (Phase 1)
│       ├── products.json            # Product catalog
│       └── categories.json          # Category definitions
├── public/                          # Static assets
│   ├── images/                      # Product images
│   │   └── products/
│   └── favicon.ico
├── tailwind.config.ts               # Tailwind + Trust Blue theme
├── tsconfig.json                    # TypeScript configuration
├── next.config.js                   # Next.js configuration
├── package.json
└── README.md
```

### 2.2 Structure Rationale

**Domain-based component organization:**
- `components/product/` - All product-related components together
- `components/layout/` - Layout and structural components
- `components/filters/` - Filtering and search components
- `components/ui/` - Generic UI primitives (from shadcn/ui)

**Benefits:**
- Easy to locate components by feature
- Clear separation of concerns
- Scales well when adding new domains (cart, checkout in Phase 2)
- AI agents know exactly where to create new components

**src/ directory:**
- Separates source code from configuration files
- Cleaner root directory
- Standard Next.js pattern

**data/ for static JSON:**
- Single source of truth for Phase 1 product data
- Easy to update product catalog
- Can be replaced with API calls in Phase 2 without changing component structure

---

## 3. Data Architecture

### 3.1 Product Data Model

**File:** `src/data/products.json`

**Structure:**
```json
[
  {
    "id": "prod_001",
    "slug": "premium-game-pass",
    "name": "Premium Game Pass",
    "category": "games",
    "price": 49.99,
    "shortDescription": "Access to 100+ premium games instantly",
    "description": "Full detailed description with features, benefits, and use cases explained in detail. Multiple paragraphs covering what it is, key features, who it's for, what's included, and how it works.",
    "image": "/images/products/premium-game-pass.jpg",
    "images": [
      "/images/products/premium-game-pass-1.jpg",
      "/images/products/premium-game-pass-2.jpg"
    ],
    "platform": "Windows, Mac, Xbox",
    "deliveryMethod": "Email",
    "deliveryTime": "Instant",
    "featured": true,
    "relatedProducts": ["prod_002", "prod_003"]
  }
]
```

**Field Definitions:**
- `id` (string, required): Unique identifier (format: `prod_XXX`)
- `slug` (string, required): URL-friendly identifier for routing
- `name` (string, required): Product display name (max 100 chars)
- `category` (string, required): Category ID (must match categories.json)
- `price` (number, required): Price in USD (e.g., 49.99)
- `shortDescription` (string, required): 1-2 sentence summary for cards
- `description` (string, required): Full multi-paragraph description
- `image` (string, required): Primary product image path
- `images` (array, optional): Additional product images
- `platform` (string, optional): Compatibility info
- `deliveryMethod` (string, optional): How product is delivered
- `deliveryTime` (string, optional): Expected delivery time
- `featured` (boolean, optional): Show as featured on homepage
- `relatedProducts` (array, optional): Product IDs for "You might also like"

### 3.2 Category Data Model

**File:** `src/data/categories.json`

**Structure:**
```json
[
  { "id": "all", "name": "All Products", "slug": "all" },
  { "id": "games", "name": "Games", "slug": "games" },
  { "id": "software", "name": "Software", "slug": "software" },
  { "id": "ai-tools", "name": "AI Tools", "slug": "ai-tools" },
  { "id": "education", "name": "Education", "slug": "education" },
  { "id": "entertainment", "name": "Entertainment", "slug": "entertainment" }
]
```

**Field Definitions:**
- `id` (string, required): Unique category identifier
- `name` (string, required): Display name for UI
- `slug` (string, required): URL parameter value

### 3.3 Data Loading Functions

**File:** `src/lib/product-data.ts`

```typescript
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { Product, Category } from '@/types/product';

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'all') return getAllProducts();
  return productsData.filter(p => p.category === categorySlug);
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = productsData.find(p => p.id === productId);
  if (!product?.relatedProducts) {
    // Fallback: return products from same category
    return getProductsByCategory(product?.category || 'all')
      .filter(p => p.id !== productId)
      .slice(0, limit);
  }
  return product.relatedProducts
    .map(id => productsData.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, limit) as Product[];
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return productsData.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  );
}
```

**Phase 2 Migration Path:**
- Replace JSON imports with API fetch calls
- Add caching with React Server Components
- No changes needed to component interfaces

---

## 4. TypeScript Type System

### 4.1 Core Types

**File:** `src/types/product.ts`

```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  images?: string[];
  platform?: string;
  deliveryMethod?: string;
  deliveryTime?: string;
  featured?: boolean;
  relatedProducts?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
```

**File:** `src/types/component-props.ts`

```typescript
import { Product } from './product';

export interface ProductCardProps {
  product: Product;
  variant?: 'standard' | 'compact' | 'featured';
  onClick?: () => void;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  productCounts?: Record<string, number>;
}

export interface ProductImageProps {
  src: string;
  alt: string;
  category?: string;
  aspectRatio?: '16/9' | '1/1' | '4/3';
}

export interface PriceDisplayProps {
  amount: number;
  currency?: 'USD' | 'EUR' | 'GBP';
  size?: 'small' | 'large' | 'xlarge';
}
```

### 4.2 Type Safety Guidelines

**All components MUST:**
- Define explicit prop types using TypeScript interfaces
- Use typed imports from `@/types/`
- Avoid `any` type (use `unknown` if truly unknown)
- Export prop interfaces for reusability

**AI Agent Rule:** When creating a component, define its prop interface in `src/types/component-props.ts` first.

---

## 5. Naming Conventions

### 5.1 File Naming

| Type | Convention | Example |
|------|-----------|---------|
| React Components | kebab-case.tsx | product-card.tsx |
| Type Definitions | kebab-case.ts | product.ts |
| Data Files | kebab-case.json | products.json |
| Utility Functions | kebab-case.ts | product-data.ts |
| CSS/Style Files | kebab-case.css | globals.css |

### 5.2 Code Naming

| Element | Convention | Example |
|---------|-----------|---------|
| React Components | PascalCase | ProductCard, CategoryFilter |
| Functions | camelCase | getProducts, filterByCategory |
| Variables | camelCase | productList, activeCategory |
| Constants | UPPER_SNAKE_CASE | MAX_PRODUCTS, DEFAULT_CATEGORY |
| Type/Interface | PascalCase | Product, ProductCardProps |
| CSS Classes | kebab-case | product-card, hero-gradient |

### 5.3 URL Structure

| Page | Pattern | Example |
|------|---------|---------|
| Homepage | / | / |
| Category Filter | /?category={slug} | /?category=games |
| Search | /?search={query} | /?search=game |
| Product Detail | /products/{slug} | /products/premium-game-pass |

**Rules:**
- Product slugs: lowercase, hyphen-separated
- URL params: lowercase, no spaces
- No trailing slashes

---

## 6. State Management Strategy

### 6.1 Phase 1 Approach: URL-Based State

**Decision:** No state management library needed for Phase 1

**Rationale:**
- Category filtering handled via URL search params
- No global state (no cart, no user session, no wishlist)
- React's `useState` sufficient for local component state
- Keeps bundle size minimal

**Implementation:**
```typescript
// In page.tsx or client component
import { useSearchParams } from 'next/navigation';

const searchParams = useSearchParams();
const category = searchParams.get('category') || 'all';
```

**State Management Per Feature:**

| Feature | State Approach | Location |
|---------|---------------|----------|
| Category Filter | URL search param | ?category=games |
| Product List | Server-side data | Next.js Server Component |
| Product Detail | Server-side data | Next.js Server Component |
| Loading States | React useState | Component local state |
| Error States | React useState | Component local state |

### 6.2 Phase 2 Considerations

When adding cart in Phase 2, introduce:
- **Zustand** (recommended) or **React Context** for cart state
- LocalStorage persistence for cart across sessions
- No need to refactor existing Phase 1 components

---

## 7. Image Strategy

### 7.1 Image Storage

**Location:** `/public/images/products/`

**Naming Convention:** Use product slug
- Primary: `{slug}.jpg` → `premium-game-pass.jpg`
- Additional: `{slug}-{n}.jpg` → `premium-game-pass-2.jpg`

### 7.2 Image Specifications

**Dimensions:**
- Product cards: 800x450px (16:9 aspect ratio)
- Thumbnails: Auto-generated by Next.js Image component
- Hero banner: 1920x600px (optional background)

**Format:**
- Source: JPEG or PNG
- Delivery: Next.js auto-converts to WebP
- Compression: Next.js handles automatically

### 7.3 Next.js Image Component

**Usage:**
```typescript
import Image from 'next/image';

<Image
  src="/images/products/premium-game-pass.jpg"
  alt="Premium Game Pass"
  width={800}
  height={450}
  className="rounded-lg"
  priority={false} // true for above-fold images
/>
```

**Benefits:**
- Automatic WebP conversion
- Lazy loading by default
- Responsive srcset generation
- Prevents layout shift

### 7.4 Placeholder Strategy (Phase 1)

Until real product images available:

**Option 1: Placehold.co service**
```
https://placehold.co/800x450/2563eb/ffffff?text=Product+Name
```

**Option 2: Gradient placeholders**
```typescript
// CSS gradient matching Trust Blue theme
background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
```

**Option 3: Unsplash**
Free stock images via Unsplash API or direct links

---

## 8. Routing & Navigation

### 8.1 URL Structure

| Page | Route | File Location |
|------|-------|--------------|
| Homepage | / | src/app/page.tsx |
| Category Filtered | /?category=games | src/app/page.tsx |
| Search | /?search=query | src/app/page.tsx |
| Product Detail | /products/[slug] | src/app/products/[slug]/page.tsx |
| 404 Not Found | /not-found | src/app/not-found.tsx |

### 8.2 Navigation Behavior

**Homepage → Product Detail:**
```typescript
// In ProductCard component
import Link from 'next/link';

<Link href={`/products/${product.slug}`}>
  <ProductCard product={product} />
</Link>
```

**Category Filtering:**
```typescript
// In CategoryFilter component
import { useRouter } from 'next/navigation';

const router = useRouter();
const handleCategoryChange = (categorySlug: string) => {
  router.push(`/?category=${categorySlug}`);
};
```

**Breadcrumb Navigation:**
```typescript
// On product detail page
Home > {product.category} > {product.name}
```

### 8.3 Browser Back Button

**Requirement:** Must work correctly and preserve state

**Implementation:**
- Use Next.js Link and router.push (not window.location)
- URL params preserve filter state
- Scroll position restored by browser default

---

## 9. Error Handling & Recovery

### 9.1 Error Handling Patterns

**Phase 1 Error Types:**

| Error Type | Handler | User Experience |
|-----------|---------|-----------------|
| Products fail to load | Try/catch in data loader | Error message + Retry button |
| Product not found | Return 404 | 404 page with "Browse Products" link |
| Image load failure | Next.js Image onError | Gradient placeholder + emoji |
| Network timeout | Fetch timeout | "Connection issue. Retry?" |
| Invalid category | Redirect to all | Show all products |

### 9.2 Error Display Components

**File:** `src/components/ui/error-message.tsx`

```typescript
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}
```

### 9.3 Logging Strategy

**Phase 1:**
- Console errors for development
- No external logging service yet

**Phase 2:**
- Add error tracking (Sentry, LogRocket, etc.)
- Track user actions for debugging

---

## 10. Performance Requirements

### 10.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Homepage load | < 2 seconds | Lighthouse Performance |
| Product detail load | < 1.5 seconds | Lighthouse Performance |
| Category filter response | < 100ms | Manual testing |
| Interaction responsiveness | 60fps | Chrome DevTools |
| Lighthouse Score | ≥ 90 | Lighthouse CI |

### 10.2 Optimization Strategies

**Implemented by Next.js:**
- ✅ Automatic code splitting
- ✅ Image optimization (WebP conversion)
- ✅ Font optimization (next/font)
- ✅ Static page generation where possible

**Developer Responsibilities:**
- Lazy load below-fold images
- Minimize component re-renders
- Use skeleton screens (not spinners)
- Optimize Tailwind CSS (JIT mode)

### 10.3 Bundle Size Monitoring

**Keep minimal:**
- No unnecessary dependencies
- No state management library (Phase 1)
- shadcn/ui components copied (not entire library)
- Tree-shake unused Tailwind classes

---

## 11. Component Architecture

### 11.1 Component Hierarchy

```
App (layout.tsx)
├── Header
│   ├── Logo
│   ├── SearchBar (Phase 1 optional)
│   └── Navigation (placeholder for cart/user icons)
├── Main Content
│   ├── Homepage (page.tsx)
│   │   ├── HeroBanner
│   │   ├── CategoryFilter
│   │   └── ProductGrid
│   │       └── ProductCard (× N)
│   │           ├── ProductImage
│   │           ├── Badge (category)
│   │           └── PriceDisplay
│   └── Product Detail (/products/[slug]/page.tsx)
│       ├── Breadcrumb
│       ├── ProductDetail
│       │   ├── ProductImage
│       │   ├── ProductInfo
│       │   │   ├── Badge
│       │   │   ├── PriceDisplay
│       │   │   └── Button (disabled)
│       │   └── Description
│       └── RelatedProducts
│           └── ProductCard (× 3-4)
└── Footer
```

### 11.2 Core Component Specifications

#### ProductCard Component

**File:** `src/components/product/product-card.tsx`

**Purpose:** Display product summary in browse/grid views

**Props:**
```typescript
interface ProductCardProps {
  product: Product;
  variant?: 'standard' | 'compact' | 'featured';
  onClick?: () => void;
}
```

**Implementation Pattern:**
```typescript
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { PriceDisplay } from '@/components/product/price-display';
import { Product } from '@/types/product';

export function ProductCard({ 
  product, 
  variant = 'standard' 
}: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <article className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <Badge variant="secondary">{product.category}</Badge>
          <h3 className="font-semibold text-lg mt-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
          <PriceDisplay amount={product.price} size="large" className="mt-3" />
        </div>
      </article>
    </Link>
  );
}
```

**States:**
- Default: White background, subtle border
- Hover: Shadow elevation, image scale
- Focus: Blue focus ring (keyboard)

**Accessibility:**
- Entire card wrapped in Link
- Semantic `<article>` tag
- Proper alt text on images
- ARIA label: "View {product.name}"

---

#### ProductGrid Component

**File:** `src/components/product/product-grid.tsx`

**Purpose:** Responsive container for product cards

**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}
```

**Implementation Pattern:**
```typescript
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductGrid({ products, loading, emptyMessage }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">{emptyMessage || 'No products found'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Responsive Behavior:**
- Desktop (≥1024px): 4 columns, 24px gap
- Tablet (640-1023px): 2 columns, 24px gap
- Mobile (<640px): 1 column, 16px gap

---

#### CategoryFilter Component

**File:** `src/components/filters/category-filter.tsx`

**Purpose:** Horizontal category selection bar

**Props:**
```typescript
interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
}
```

**Implementation Pattern:**
```typescript
'use client';

import { Button } from '@/components/ui/button';
import { Category } from '@/types/product';

export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-4" role="tablist">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.slug ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category.slug)}
          role="tab"
          aria-selected={activeCategory === category.slug}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
```

**States:**
- Active: Trust Blue background, white text
- Inactive: White background, slate text
- Hover: Blue border

**Accessibility:**
- role="tablist" and role="tab"
- aria-selected on active tab
- Keyboard navigation (Tab, Enter)

---

#### PriceDisplay Component

**File:** `src/components/product/price-display.tsx`

**Purpose:** Consistent price formatting

**Props:**
```typescript
interface PriceDisplayProps {
  amount: number;
  currency?: 'USD' | 'EUR' | 'GBP';
  size?: 'small' | 'large' | 'xlarge';
  className?: string;
}
```

**Implementation Pattern:**
```typescript
import { cn } from '@/lib/utils';

export function PriceDisplay({ 
  amount, 
  currency = 'USD', 
  size = 'large',
  className 
}: PriceDisplayProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);

  const sizeClasses = {
    small: 'text-base font-semibold',
    large: 'text-xl font-bold',
    xlarge: 'text-2xl font-bold',
  };

  return (
    <span 
      className={cn('text-blue-600', sizeClasses[size], className)}
      aria-label={`Price: ${formatted}`}
    >
      {formatted}
    </span>
  );
}
```

---

#### HeroBanner Component

**File:** `src/components/layout/hero-banner.tsx`

**Purpose:** Full-width promotional section at top of homepage

**Implementation Pattern:**
```typescript
export function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Digital Products Marketplace
        </h1>
        <p className="text-xl text-blue-100">
          Games • Software • AI Tools • More
        </p>
      </div>
    </section>
  );
}
```

---

### 11.3 Component Creation Guidelines

**When creating a new component, AI agents MUST:**

1. **Define types first** in `src/types/component-props.ts`
2. **Choose location** based on domain (product/, layout/, filters/)
3. **Use shadcn/ui primitives** where applicable (Button, Card, Badge)
4. **Apply Trust Blue theme** colors (#2563eb primary)
5. **Add TypeScript types** for all props
6. **Include accessibility** (ARIA labels, semantic HTML)
7. **Use Tailwind classes** (avoid custom CSS)
8. **Export as named export** (not default)

**Example Component Template:**
```typescript
// 1. Imports
import { ComponentType } from '@/components/ui/component';
import { PropsInterface } from '@/types/component-props';

// 2. Component definition with typed props
export function MyComponent({ prop1, prop2 }: PropsInterface) {
  // 3. Component logic
  
  // 4. Return JSX with semantic HTML and Tailwind classes
  return (
    <section className="..." aria-label="...">
      {/* Content */}
    </section>
  );
}
```

---

## 12. Styling & Theme Configuration

### 12.1 Tailwind Configuration

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Trust Blue Theme (from UX Design)
        primary: {
          DEFAULT: '#2563eb', // Blue 600
          hover: '#1d4ed8',   // Blue 700
          light: '#3b82f6',   // Blue 500
        },
        // Semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        // Neutral scale (Slate)
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Type scale from UX spec
        'display': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
      spacing: {
        // 8px grid system
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '7xl': '1280px', // Container max-width
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 12.2 Global Styles

**File:** `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.5rem;
  }
  
  body {
    @apply bg-slate-50 text-slate-900;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-slate-900;
  }
}

@layer components {
  /* Trust Blue gradient for hero */
  .hero-gradient {
    @apply bg-gradient-to-r from-blue-600 to-blue-700;
  }
  
  /* Product card hover effect */
  .product-card-hover {
    @apply transition-all duration-200 hover:shadow-lg hover:-translate-y-1;
  }
}

@layer utilities {
  /* Line clamp utilities */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

### 12.3 shadcn/ui Configuration

**File:** `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 13. Implementation Patterns for AI Agent Consistency

### 13.1 Naming Pattern Rules

**MUST follow these patterns to prevent conflicts:**

| Category | Pattern | Example | Counter-Example (Don't) |
|----------|---------|---------|------------------------|
| Component files | kebab-case.tsx | product-card.tsx | ProductCard.tsx |
| Component exports | PascalCase | ProductCard | productCard |
| Functions | camelCase | getProducts | GetProducts |
| Constants | UPPER_SNAKE_CASE | MAX_PRODUCTS | maxProducts |
| Types | PascalCase | ProductCardProps | productCardProps |
| Data files | kebab-case.json | products.json | Products.json |
| CSS classes | kebab-case | product-card | productCard |
| URL slugs | lowercase-hyphen | premium-game-pass | Premium_Game_Pass |

**AI Agent Enforcement:** If creating a file named differently than this pattern, STOP and rename.

---

### 13.2 Import Pattern Rules

**Import order (enforce consistently):**

```typescript
// 1. React and Next.js imports
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { cn } from '@/lib/utils';

// 3. Internal types
import { Product, Category } from '@/types/product';
import { ProductCardProps } from '@/types/component-props';

// 4. Internal components
import { Button } from '@/components/ui/button';
import { PriceDisplay } from '@/components/product/price-display';

// 5. Data and utilities
import { getAllProducts } from '@/lib/product-data';
```

**Path alias usage:**
- ALWAYS use `@/` path aliases (configured in tsconfig.json)
- NEVER use relative paths like `../../components/`

---

### 13.3 Component Structure Pattern

**Every component MUST follow this structure:**

```typescript
// 1. Imports (as above)
import ...

// 2. Type definitions (or import from types/)
interface MyComponentProps {
  // Props
}

// 3. Component function
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // 4. Hooks (if any)
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Derived values
  const computedValue = useMemo(() => ..., [deps]);
  
  // 7. Return JSX
  return (
    <div className="...">
      {/* Content */}
    </div>
  );
}
```

---

### 13.4 Data Fetching Pattern

**Server Components (preferred for Phase 1):**

```typescript
// src/app/page.tsx
import { getAllProducts } from '@/lib/product-data';
import { ProductGrid } from '@/components/product/product-grid';

export default function HomePage() {
  const products = getAllProducts();
  
  return (
    <main>
      <ProductGrid products={products} />
    </main>
  );
}
```

**Client Components (when interactivity needed):**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export function InteractiveComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data
    setLoading(false);
  }, []);
  
  if (loading) return <Skeleton />;
  
  return <div>{/* Content */}</div>;
}
```

---

### 13.5 Error Handling Pattern

**Consistent error handling across all components:**

```typescript
export function DataFetchingComponent() {
  try {
    const data = fetchData();
    return <DisplayData data={data} />;
  } catch (error) {
    console.error('Failed to load data:', error);
    return (
      <ErrorMessage 
        message="Unable to load products" 
        onRetry={() => window.location.reload()}
      />
    );
  }
}
```

**Error boundary for component failures:**

```typescript
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
```

---

### 13.6 Accessibility Pattern Rules

**Every interactive component MUST:**

1. **Keyboard accessible:**
   ```typescript
   <button 
     onClick={handleClick}
     onKeyDown={(e) => e.key === 'Enter' && handleClick()}
   >
   ```

2. **ARIA labels:**
   ```typescript
   <button aria-label="Close dialog">
     <XIcon />
   </button>
   ```

3. **Semantic HTML:**
   ```typescript
   <article>  {/* Not <div> */}
     <h2>...</h2>
     <p>...</p>
   </article>
   ```

4. **Alt text on images:**
   ```typescript
   <Image 
     src={product.image} 
     alt={`${product.name} - ${product.category}`}
   />
   ```

5. **Focus indicators (never remove):**
   ```typescript
   // In Tailwind classes
   className="focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
   ```

---

### 13.7 Responsive Design Pattern

**Mobile-first Tailwind classes:**

```typescript
<div className="
  grid 
  grid-cols-1          /* Mobile: 1 column */
  md:grid-cols-2       /* Tablet: 2 columns */
  lg:grid-cols-4       /* Desktop: 4 columns */
  gap-4                /* Mobile gap */
  md:gap-6             /* Desktop gap */
">
```

**Responsive typography:**

```typescript
<h1 className="
  text-2xl             /* Mobile */
  md:text-3xl          /* Tablet */
  lg:text-4xl          /* Desktop */
  font-bold
">
```

---

## 14. Cross-Cutting Concerns

### 14.1 Logging Approach

**Phase 1 Strategy:**
```typescript
// src/lib/logger.ts
export const logger = {
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message: string) => {
    console.warn(`[WARN] ${message}`);
  },
  info: (message: string) => {
    console.info(`[INFO] ${message}`);
  },
};
```

**Usage:**
```typescript
import { logger } from '@/lib/logger';

try {
  // Operation
} catch (error) {
  logger.error('Failed to load products', error as Error);
}
```

**Phase 2 Enhancement:**
- Add Sentry or LogRocket for production error tracking
- Add user session context to logs
- Track user actions for debugging

---

### 14.2 Constants Management

**File:** `src/lib/constants.ts`

```typescript
export const CONSTANTS = {
  // Product limits
  MAX_PRODUCTS_PER_PAGE: 50,
  PRODUCTS_PER_ROW_DESKTOP: 4,
  PRODUCTS_PER_ROW_TABLET: 2,
  PRODUCTS_PER_ROW_MOBILE: 1,
  
  // Category defaults
  DEFAULT_CATEGORY: 'all',
  
  // Image settings
  PRODUCT_IMAGE_WIDTH: 800,
  PRODUCT_IMAGE_HEIGHT: 450,
  IMAGE_ASPECT_RATIO: '16/9',
  
  // Performance
  PAGE_LOAD_TARGET_MS: 2000,
  FILTER_RESPONSE_TARGET_MS: 100,
  
  // URLs
  PLACEHOLDER_IMAGE_URL: 'https://placehold.co/800x450/2563eb/ffffff',
  
  // Phase boundaries
  PHASE_1_FEATURES: ['browse', 'filter', 'detail'],
  PHASE_2_FEATURES: ['cart', 'checkout', 'payment'],
} as const;
```

---

### 14.3 Utility Functions

**File:** `src/lib/utils.ts` (shadcn/ui default + custom)

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// shadcn/ui utility for className merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price consistently
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Generate product slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
```

---

## 15. Development Workflow

### 15.1 Project Setup (First Time)

```bash
# 1. Initialize Next.js project
npx create-next-app@latest ecommerce-shop --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd ecommerce-shop

# 2. Install shadcn/ui
npx shadcn@latest init

# 3. Add required shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add skeleton

# 4. Install additional dependencies (if needed)
npm install clsx tailwind-merge

# 5. Create directory structure
mkdir -p src/components/{product,layout,filters}
mkdir -p src/types
mkdir -p src/data
mkdir -p public/images/products

# 6. Start development server
npm run dev
```

**Access:** `http://localhost:3000`

---

### 15.2 Daily Development Workflow

```bash
# 1. Pull latest changes (if team)
git pull origin main

# 2. Create feature branch (if using Git)
git checkout -b feature/product-card

# 3. Start dev server
npm run dev

# 4. Make changes, test in browser

# 5. Check TypeScript errors
npm run build

# 6. Commit changes
git add .
git commit -m "Add ProductCard component"
git push origin feature/product-card
```

---

### 15.3 Code Quality Commands

```bash
# Type checking
npm run build          # Also type checks

# Linting
npm run lint           # ESLint check
npm run lint --fix     # Auto-fix issues

# Format (if Prettier added)
npx prettier --write .
```

---

### 15.4 Component Development Process

**For AI agents implementing a story:**

1. **Read UX spec** for component design requirements
2. **Define types** in `src/types/component-props.ts`
3. **Create component file** in appropriate domain folder
4. **Implement with TypeScript** and type checking
5. **Use shadcn/ui primitives** where applicable
6. **Apply Tailwind classes** for styling (Trust Blue theme)
7. **Test accessibility** (keyboard, screen reader)
8. **Test responsive** (mobile, tablet, desktop)
9. **Verify performance** (Lighthouse score)

---

## 16. Testing Strategy

### 16.1 Phase 1 Testing Approach

**Manual Testing (Priority for Phase 1):**
- ✅ Browser testing (Chrome, Firefox, Safari)
- ✅ Device testing (mobile, tablet, desktop)
- ✅ Accessibility testing (keyboard, screen reader)
- ✅ Performance testing (Lighthouse)

**Automated Testing (Phase 2+):**
- Unit tests (Jest + React Testing Library)
- E2E tests (Playwright or Cypress)
- Visual regression tests (Chromatic or Percy)

---

### 16.2 Testing Checklist (Manual)

**Before marking a story complete:**

- [ ] **Functionality:** Feature works as specified in PRD
- [ ] **Visual:** Matches UX design spec (Trust Blue theme)
- [ ] **Responsive:** Works on mobile (iPhone), tablet (iPad), desktop (1280px+)
- [ ] **Accessibility:** 
  - [ ] Keyboard navigation works
  - [ ] Focus indicators visible
  - [ ] ARIA labels present
  - [ ] Alt text on images
  - [ ] Lighthouse accessibility score ≥90
- [ ] **Performance:**
  - [ ] Page load < 2s
  - [ ] Lighthouse performance ≥90
  - [ ] No console errors
- [ ] **Browser compatibility:**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)

---

### 16.3 Lighthouse Testing

```bash
# Run Lighthouse from Chrome DevTools
# Or use CLI:
npx lighthouse http://localhost:3000 --view

# Target scores:
# Performance: ≥90
# Accessibility: ≥90
# Best Practices: ≥90
# SEO: ≥80
```

---

## 17. Deployment Strategy

### 17.1 Deployment Platform

**Recommended: Vercel** (Next.js creators, seamless integration)

**Alternatives:**
- Netlify
- Cloudflare Pages
- AWS Amplify

---

### 17.2 Deployment Configuration

**File:** `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Phase 1
  images: {
    unoptimized: true, // Required for static export
    // Or configure image optimization service
  },
  // Enable if using environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;
```

---

### 17.3 Deployment Commands

**Build for production:**
```bash
npm run build
```

**Test production build locally:**
```bash
npm run build
npx serve@latest out
```

**Deploy to Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Environment Variables (if needed):**
- Set in Vercel dashboard or `.env.local`
- Prefix with `NEXT_PUBLIC_` for client-side access

---

### 17.4 Deployment Checklist

Before production deployment:

- [ ] All product images added to `/public/images/products/`
- [ ] Product data JSON complete (`src/data/products.json`)
- [ ] Environment variables configured
- [ ] Favicon and meta tags set
- [ ] 404 page implemented
- [ ] Performance testing passed (Lighthouse ≥90)
- [ ] Cross-browser testing complete
- [ ] Mobile testing complete
- [ ] Accessibility testing complete

---

## 18. Phase 2 Preparation

### 18.1 What Stays the Same

**These Phase 1 decisions don't change:**
- ✅ Next.js + TypeScript + Tailwind stack
- ✅ Component structure and organization
- ✅ Product data model (add fields, don't break existing)
- ✅ URL routing patterns
- ✅ Trust Blue theme and styling
- ✅ Accessibility requirements

---

### 18.2 What Gets Added in Phase 2

**New Features:**
- Shopping cart functionality
- Checkout flow (multi-step)
- User authentication
- Payment processing (Stripe)
- Order management

**New Technology:**
- State management (Zustand or Context API) for cart
- Backend API (Next.js API routes or separate backend)
- Database (PostgreSQL, MongoDB, or Supabase)
- Authentication (NextAuth.js or Clerk)
- Payment integration (Stripe SDK)

**New Components:**
- `<ShoppingCart>`
- `<CheckoutForm>`
- `<PaymentMethod>`
- `<UserMenu>`
- `<OrderHistory>`

---

### 18.3 Migration Strategy

**Enabling Phase 2 features:**

1. **State Management:**
   ```bash
   npm install zustand
   ```
   
   ```typescript
   // src/store/cart.ts
   import { create } from 'zustand';
   
   export const useCartStore = create((set) => ({
     items: [],
     addItem: (product) => set((state) => ({
       items: [...state.items, product]
     })),
   }));
   ```

2. **API Integration:**
   ```typescript
   // Replace static data import
   // Before (Phase 1):
   import productsData from '@/data/products.json';
   
   // After (Phase 2):
   const products = await fetch('/api/products').then(r => r.json());
   ```

3. **Enable Disabled CTAs:**
   ```typescript
   // Phase 1:
   <Button disabled>Add to Cart (Coming in Phase 2)</Button>
   
   // Phase 2:
   <Button onClick={handleAddToCart}>Add to Cart</Button>
   ```

**No breaking changes to existing components!**

---

## 19. Architecture Decision Records (ADRs)

### ADR-001: Next.js 14+ App Router

**Status:** Accepted  
**Date:** 2025-11-30  
**Decision:** Use Next.js 14+ with App Router as foundation

**Context:**
- Need server-side rendering for SEO
- Want automatic image optimization
- Require file-based routing
- Phase 1 is static, but Phase 2 needs dynamic capabilities

**Decision:**
Next.js 14+ App Router provides:
- Server Components for initial load performance
- Automatic code splitting
- Built-in image optimization
- File-based routing
- API routes ready for Phase 2

**Alternatives Considered:**
- Create React App: Too basic, no SSR, deprecated
- Vite + React Router: More manual configuration, no built-in optimizations
- Remix: Good alternative, but Next.js has larger ecosystem

**Consequences:**
- ✅ Excellent performance out of the box
- ✅ Easy Phase 2 scaling (API routes, server actions)
- ✅ Vercel deployment is seamless
- ⚠️ Learning curve for App Router (newer paradigm)

---

### ADR-002: No State Management Library (Phase 1)

**Status:** Accepted  
**Date:** 2025-11-30  
**Decision:** Use URL-based state for filtering, no Zustand/Redux in Phase 1

**Context:**
- Phase 1 only needs category filtering
- No cart, no user session, no global state
- Want to minimize bundle size

**Decision:**
URL search params handle all Phase 1 state:
- `?category=games` for filtering
- React `useState` for local UI state
- Server Components for data fetching

**Alternatives Considered:**
- Zustand: Overkill for Phase 1, but will add in Phase 2
- Redux: Too complex, outdated patterns
- React Context: Unnecessary without global state needs

**Consequences:**
- ✅ Minimal bundle size
- ✅ Shareable URLs (filtering preserved)
- ✅ Browser back button works correctly
- ✅ Easy to add Zustand in Phase 2 without refactoring

---

### ADR-003: shadcn/ui Component Library

**Status:** Accepted  
**Date:** 2025-11-30  
**Decision:** Use shadcn/ui for component primitives

**Context:**
- UX spec requires WCAG AA accessibility
- Want customizable components (Trust Blue theme)
- Need fast development with quality components
- Don't want large bundle from full component library

**Decision:**
shadcn/ui provides:
- Copy-paste components (no large dependency)
- Built on Radix UI (accessible primitives)
- Tailwind CSS styled (perfect for Trust Blue theme)
- Full control over code

**Alternatives Considered:**
- Material UI: Too opinionated, large bundle, hard to customize
- Chakra UI: Good accessibility, but adds dependency
- Headless UI: Good, but shadcn/ui is more complete
- Build from scratch: Too time-consuming

**Consequences:**
- ✅ WCAG AA compliance easier
- ✅ Perfect for Trust Blue theme customization
- ✅ Small bundle size (only copy what we need)
- ✅ Full code ownership
- ⚠️ Need to copy components manually (not NPM install)

---

### ADR-004: Static JSON Product Data (Phase 1)

**Status:** Accepted (Phase 1 only)  
**Date:** 2025-11-30  
**Decision:** Use static JSON file for product catalog in Phase 1

**Context:**
- Phase 1 is browsing-only (no purchases)
- ~20-30 products in catalog
- No backend ready yet
- Want fast development cycle

**Decision:**
`src/data/products.json` contains all product data:
- Simple to manage
- No API needed
- Fast loading (bundled with app)
- Easy to update during development

**Alternatives Considered:**
- Mock API (json-server): Unnecessary complexity for Phase 1
- Real backend: Not ready, overkill for browsing
- CMS (Contentful, Sanity): Too early, adds costs

**Consequences:**
- ✅ Fast Phase 1 development
- ✅ No backend dependency
- ✅ Easy to seed with sample data
- ✅ Clear migration path to API in Phase 2
- ⚠️ Data changes require rebuild (acceptable for Phase 1)

**Phase 2 Migration:**
Replace `import products from '@/data/products.json'`  
With `const products = await fetch('/api/products')`

---

### ADR-005: Desktop-First Responsive Design

**Status:** Accepted  
**Date:** 2025-11-30  
**Decision:** Desktop-first responsive design (4-column → 2-column → 1-column)

**Context:**
- UX research shows primary users browse on desktop
- Product comparison easier on larger screens
- Mobile still important (secondary use case)
- UX spec specifies desktop-first approach

**Decision:**
- Optimize for desktop (1280px+ container, 4-column grid)
- Responsive breakpoints: 1024px (desktop), 640px (mobile)
- Mobile gets simplified, stacked layout

**Alternatives Considered:**
- Mobile-first: Common practice, but not optimal for this product
- Desktop-only: Would exclude mobile users (bad)

**Consequences:**
- ✅ Best experience for primary use case (desktop browsing)
- ✅ Mobile still fully functional (1-column layout)
- ✅ Matches user behavior patterns
- ⚠️ Mobile is secondary (acceptable per user research)

---

## 20. Success Criteria & Validation

### 20.1 Architecture Completeness Checklist

This architecture is complete when:

- [x] **Project initialization** command documented
- [x] **Technology stack** versions verified
- [x] **Project structure** fully defined (every directory explained)
- [x] **Data models** specified (Product, Category JSON structures)
- [x] **TypeScript types** defined for all entities
- [x] **Naming conventions** established (files, code, URLs)
- [x] **State management** approach chosen (URL-based)
- [x] **Component architecture** specified (11 components detailed)
- [x] **Styling system** configured (Tailwind + Trust Blue theme)
- [x] **Implementation patterns** defined for AI agents
- [x] **Cross-cutting concerns** addressed (logging, errors, constants)
- [x] **Development workflow** documented
- [x] **Testing strategy** defined
- [x] **Deployment approach** specified
- [x] **Phase 2 migration** planned
- [x] **ADRs** recorded for key decisions

---

### 20.2 Implementation Readiness Validation

**Before starting implementation, verify:**

1. **PRD Requirements Coverage:**
   - [ ] All functional requirements have architectural support
   - [ ] All NFRs addressable with this architecture
   - [ ] No PRD features without implementation path

2. **UX Design Alignment:**
   - [ ] Trust Blue theme (#2563eb) configured in Tailwind
   - [ ] All UX components mapped to architecture components
   - [ ] Responsive breakpoints match UX spec (640px, 1024px)
   - [ ] shadcn/ui supports all UX patterns needed

3. **AI Agent Consistency:**
   - [ ] Naming conventions prevent conflicts
   - [ ] Component creation patterns defined
   - [ ] File locations unambiguous
   - [ ] Type safety enforced

4. **Phase 2 Scalability:**
   - [ ] State management easily addable (Zustand slot ready)
   - [ ] API integration path clear (replace JSON imports)
   - [ ] Component structure supports cart/checkout additions
   - [ ] No breaking changes required for Phase 2

---

### 20.3 Phase 1 Success Metrics

**Technical Metrics:**
- Lighthouse Performance Score: ≥ 90
- Lighthouse Accessibility Score: ≥ 90
- Lighthouse Best Practices: ≥ 90
- Homepage load time: < 2 seconds
- Product detail load time: < 1.5 seconds
- Bundle size: < 500KB (initial)
- Zero TypeScript errors
- Zero console errors in production

**Functional Metrics:**
- 20-30 products displayed on homepage
- Category filtering works (6 categories)
- Product detail pages load for all products
- Responsive on mobile, tablet, desktop
- Browser back button works
- All images load (or placeholders shown)
- "Coming in Phase 2" tooltips on CTAs

**Quality Metrics:**
- All components have TypeScript types
- All interactive elements keyboard accessible
- All images have alt text
- WCAG AA color contrast ratios met
- No accessibility violations (axe DevTools)

---

## 21. Summary & Next Steps

### 21.1 Architecture Summary

This architecture defines a **Next.js 14+ TypeScript web application** for Phase 1 of the ecommerce-shop digital marketplace. The architecture prioritizes:

1. **Performance:** < 2s load times via Next.js optimization, static generation
2. **Accessibility:** WCAG AA compliance via shadcn/ui, semantic HTML, ARIA labels
3. **Developer Experience:** TypeScript safety, clear patterns, path aliases
4. **AI Agent Consistency:** Strict naming, structure, and implementation patterns
5. **Phase 2 Scalability:** Clean migration paths for cart, checkout, backend

**Technology Foundation:**
- **Next.js 14+ App Router** - Server Components, file-based routing, image optimization
- **TypeScript 5.x** - Type safety across components, data, props
- **Tailwind CSS 3.x** - Trust Blue theme, responsive utilities, JIT compilation
- **shadcn/ui** - Accessible component primitives (Button, Card, Badge, Skeleton)
- **Static JSON** - Product catalog (Phase 1), migrates to API (Phase 2)

**Key Architectural Patterns:**
- Domain-based component organization (product/, layout/, filters/)
- URL-based state management (no Redux/Zustand needed in Phase 1)
- Server Components for data fetching (no client-side fetching needed)
- Skeleton screens for loading (better UX than spinners)
- Desktop-first responsive (4-col → 2-col → 1-col grid)

---

### 21.2 Files AI Agents Will Create

**Phase 1 Implementation will create ~30 files:**

**Configuration (5 files):**
- `tailwind.config.ts` - Trust Blue theme, type scale, spacing
- `tsconfig.json` - TypeScript configuration (auto-generated by Next.js)
- `next.config.js` - Next.js configuration
- `components.json` - shadcn/ui configuration
- `package.json` - Dependencies (auto-generated by Next.js)

**Types (2 files):**
- `src/types/product.ts` - Product, Category interfaces
- `src/types/component-props.ts` - Component prop interfaces

**Data (2 files):**
- `src/data/products.json` - 20-30 sample products
- `src/data/categories.json` - 6 categories

**Utilities (3 files):**
- `src/lib/utils.ts` - cn(), formatPrice(), truncate()
- `src/lib/product-data.ts` - getAllProducts(), getProductBySlug(), etc.
- `src/lib/constants.ts` - MAX_PRODUCTS, DEFAULT_CATEGORY, etc.

**Pages (4 files):**
- `src/app/layout.tsx` - Root layout with Header/Footer
- `src/app/page.tsx` - Homepage with ProductGrid
- `src/app/products/[slug]/page.tsx` - Product detail page
- `src/app/not-found.tsx` - 404 page

**shadcn/ui Components (5 files):**
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/skeleton.tsx`
- `src/components/ui/error-message.tsx`

**Custom Components (9 files):**
- `src/components/product/product-card.tsx`
- `src/components/product/product-grid.tsx`
- `src/components/product/product-image.tsx`
- `src/components/product/product-detail.tsx`
- `src/components/product/price-display.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/components/layout/hero-banner.tsx`
- `src/components/filters/category-filter.tsx`

**Styles (1 file):**
- `src/app/globals.css` - Tailwind directives + custom styles

---

### 21.3 Next Steps After Architecture

**Immediate Next (Recommended):**

1. **Create Epics & Stories Workflow**
   - Command: `create-epics-and-stories`
   - Agent: PM Agent
   - Input: This Architecture + PRD + UX Design
   - Output: Implementable user stories with acceptance criteria
   - Purpose: Break down Phase 1 into development-ready work items

2. **Implementation Readiness Check**
   - Command: `implementation-readiness`
   - Agent: Architect (me!)
   - Purpose: Validate PRD + UX + Architecture + Epics are cohesive
   - Output: Go/No-Go for implementation

3. **Start Implementation**
   - First story: "Initialize project with Next.js + TypeScript + Tailwind"
   - Command from initialization section: `npx create-next-app@latest...`
   - Then build components story-by-story

---

### 21.4 How AI Agents Use This Architecture

**When implementing any story, AI agents MUST:**

1. **Read relevant sections:**
   - Section 2 (Project Structure) - Where to create files
   - Section 11 (Component Architecture) - Component specs
   - Section 13 (Implementation Patterns) - Coding rules

2. **Follow naming conventions:**
   - Section 5.1 (File Naming) - kebab-case.tsx
   - Section 5.2 (Code Naming) - PascalCase components

3. **Use type definitions:**
   - Section 4 (TypeScript Types) - Product, Category, Props
   - Define new types in `src/types/component-props.ts`

4. **Apply styling:**
   - Section 12 (Styling & Theme) - Trust Blue colors
   - Use Tailwind classes from config

5. **Ensure accessibility:**
   - Section 13.6 (Accessibility Pattern) - ARIA, keyboard, semantic HTML

6. **Test against criteria:**
   - Section 16.2 (Testing Checklist) - Functionality, responsive, a11y

**This architecture is the source of truth for all Phase 1 implementation decisions.**

---

## Appendix A: Quick Reference

### Component File Locations

| Component | File Path |
|-----------|-----------|
| ProductCard | src/components/product/product-card.tsx |
| ProductGrid | src/components/product/product-grid.tsx |
| ProductImage | src/components/product/product-image.tsx |
| ProductDetail | src/components/product/product-detail.tsx |
| PriceDisplay | src/components/product/price-display.tsx |
| CategoryFilter | src/components/filters/category-filter.tsx |
| Header | src/components/layout/header.tsx |
| Footer | src/components/layout/footer.tsx |
| HeroBanner | src/components/layout/hero-banner.tsx |
| Button | src/components/ui/button.tsx |
| Card | src/components/ui/card.tsx |
| Badge | src/components/ui/badge.tsx |
| Skeleton | src/components/ui/skeleton.tsx |

### Key Colors (Trust Blue Theme)

| Purpose | Hex Code | Tailwind Class |
|---------|----------|----------------|
| Primary | #2563eb | bg-blue-600, text-blue-600 |
| Primary Hover | #1d4ed8 | hover:bg-blue-700 |
| Success | #10b981 | text-green-500 |
| Error | #ef4444 | text-red-500 |
| Warning | #f59e0b | text-amber-500 |
| Text Primary | #0f172a | text-slate-900 |
| Text Secondary | #475569 | text-slate-600 |
| Background | #f8fafc | bg-slate-50 |

### Key Commands

```bash
# Project initialization
npx create-next-app@latest ecommerce-shop --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# shadcn/ui setup
npx shadcn@latest init
npx shadcn@latest add button card badge skeleton

# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production + type check
npm run lint             # ESLint check

# Deployment
npm run build            # Build
npx serve@latest out     # Test locally
vercel --prod            # Deploy to Vercel
```

---

## Appendix B: Related Documents

- **Product Requirements:** `docs/prd-ecommerce-shop-phase1-ui-2025-11-30.md`
- **UX Design Specification:** `docs/ux-design-specification.md`
- **Product Brief:** `docs/product-brief-ecommerce-shop-2025-11-30.md`
- **UX Color Theme Visualizer:** `docs/ux-color-themes.html`
- **UX Design Direction Mockups:** `docs/ux-design-directions.html`

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-30 | Winston (BMAD Architect) | Initial architecture for Phase 1 UI Foundation |

---

**🏗️ Architecture Complete!**

This architecture provides a complete technical foundation for Phase 1 implementation. All decisions are documented, patterns are defined, and AI agents have clear guidance for consistent implementation.

**Next:** Run `create-epics-and-stories` to break this down into implementable work items.

---

_Generated by BMAD Decision Architecture Workflow v1.0_  
_Date: 2025-11-30_  
_For: BMad_  
_Project: ecommerce-shop Phase 1: UI Foundation_

