# ecommerce-shop - Epic Breakdown

**Author:** BMad  
**Date:** 2025-12-01  
**Project Level:** Intermediate  
**Target Scale:** Phase 1 - UI Foundation

---

## Overview

This document provides the complete epic and story breakdown for ecommerce-shop Phase 1, decomposing the requirements from the PRD into implementable stories.

**Living Document Notice:** This version incorporates PRD requirements, UX Design interaction patterns, and Architecture technical decisions for complete implementation guidance.

**Project Context:**
- **Phase 1 Scope**: Product browsing UI - Homepage listing + Product detail pages
- **Deferred to Later Phases**: User accounts, cart, checkout, payments, admin panel
- **Technology Stack**: Next.js 14+ App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Design Theme**: Trust Blue (#2563eb) with WCAG AA accessibility

**Epic Structure:**
- **Epic 1: Foundation & Project Setup** (1 story) - Initialize Next.js project with full tech stack
- **Epic 2: Design System & UI Components** (5 stories) - shadcn/ui components + Trust Blue theme
- **Epic 3: Product Data & Models** (2 stories) - TypeScript types + sample product catalog
- **Epic 4: Homepage Product Listing** (4 stories) - Product grid, category filtering, hero banner
- **Epic 5: Product Detail Pages** (3 stories) - Detail view, related products, breadcrumbs
- **Epic 6: Navigation & Polish** (3 stories) - Header/footer, loading states, error handling

**Total Stories**: 18 implementable stories

---

## Functional Requirements Inventory

**Homepage / Product Listing:**
- FR-HP-1: Display site header with branding, navigation, and search bar
- FR-HP-2: Display hero section with featured product/promotional banner
- FR-HP-3: Enable category-based product filtering
- FR-HP-4: Display products in responsive grid layout
- FR-HP-5: Show comprehensive product information on cards
- FR-HP-6: Support product sorting (Optional Phase 1)

**Product Detail Page:**
- FR-PD-1: Display consistent header and breadcrumb navigation
- FR-PD-2: Show large product images with gallery view
- FR-PD-3: Display complete product information and metadata
- FR-PD-4: Show disabled "Coming Soon" action buttons
- FR-PD-5: Display related products section

**Navigation & Routing:**
- FR-NAV-1: Implement clean URL structure and routing
- FR-NAV-2: Support browser back button and navigation state
- FR-NAV-3: Display loading states during transitions

**Search Functionality (Optional Phase 1):**
- FR-SEARCH-1: Display search UI in header
- FR-SEARCH-2: Filter products by search query

**Non-Functional Requirements:**
- NFR-PERF: Page load < 2s, smooth 60fps interactions
- NFR-RESP: Responsive design (mobile/tablet/desktop breakpoints)
- NFR-A11Y: WCAG AA accessibility compliance
- NFR-DESIGN: Professional modern design with Trust Blue theme

---

## FR Coverage Map

| Epic | Stories | FRs Covered |
|------|---------|-------------|
| Epic 1: Foundation | 1.1 | Infrastructure for all FRs |
| Epic 2: Design System | 2.1-2.5 | NFR-DESIGN, NFR-A11Y, NFR-RESP |
| Epic 3: Product Data | 3.1-3.2 | Foundation for FR-HP-4, FR-HP-5, FR-PD-3 |
| Epic 4: Homepage | 4.1-4.4 | FR-HP-1, FR-HP-2, FR-HP-3, FR-HP-4, FR-HP-5 |
| Epic 5: Product Detail | 5.1-5.3 | FR-PD-1, FR-PD-2, FR-PD-3, FR-PD-4, FR-PD-5 |
| Epic 6: Navigation & Polish | 6.1-6.3 | FR-NAV-1, FR-NAV-2, FR-NAV-3, NFR-PERF |

---

## Epic 1: Foundation & Project Setup

**Goal:** Initialize Next.js 14+ project with TypeScript, Tailwind CSS, shadcn/ui, and proper project structure to enable all subsequent development.

**User Value:** Establishes the technical foundation required for all features. (Foundation exception - acceptable as first epic for greenfield project)

**Covers FRs:** Infrastructure foundation for all functional requirements

---

### Story 1.1: Initialize Next.js Project with Complete Tech Stack

As a developer,
I want the Next.js 14+ project initialized with TypeScript, Tailwind CSS, shadcn/ui, and proper directory structure,
So that all subsequent stories have a working foundation to build upon.

**Acceptance Criteria:**

**Given** no existing project
**When** I run the initialization commands
**Then** a Next.js 14+ project is created with:
- TypeScript 5.x configured
- Tailwind CSS 3.x installed and configured
- App Router enabled (not Pages Router)
- src/ directory structure created
- Path aliases configured (@/components, @/lib, @/types)

**And** shadcn/ui is initialized with:
- components.json configuration file
- Trust Blue theme configured in tailwind.config.ts
- Base components installed (Button, Card, Badge, Skeleton)
- Slate color palette configured as base color

**And** the following directory structure exists:
```
src/
  app/
    layout.tsx (basic structure)
    page.tsx (placeholder)
    globals.css (Tailwind directives + Trust Blue theme)
  components/
    ui/ (shadcn/ui components)
    product/ (empty, ready for stories)
    layout/ (empty, ready for stories)
    filters/ (empty, ready for stories)
  lib/
    utils.ts (cn() utility from shadcn/ui)
  types/ (empty, ready for type definitions)
  data/ (empty, ready for JSON files)
public/
  images/
    products/ (empty, ready for product images)
```

**And** Trust Blue theme colors are configured in tailwind.config.ts:
- Primary: #2563eb (blue-600)
- Primary hover: #1d4ed8 (blue-700)
- Slate neutral scale (50-900)
- Custom typography scale (display, h1-h4)

**And** the development server starts successfully:
- `npm run dev` runs without errors
- Accessible at http://localhost:3000
- Hot module reloading works
- No console errors

**And** build process works:
- `npm run build` completes successfully
- TypeScript compilation passes
- No linting errors

**Prerequisites:** None (first story in project)

**Technical Notes:**
- Initialization command (from Architecture doc Section 1.1):
  ```bash
  npx create-next-app@latest ecommerce-shop --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
  ```
- shadcn/ui initialization (from Architecture doc Section 1.1):
  ```bash
  npx shadcn@latest init
  npx shadcn@latest add button card badge skeleton
  ```
- Configure Trust Blue theme in tailwind.config.ts per Architecture Section 12.1
- Verify Next.js version is 14.x or higher
- Verify React version is 18.x or higher
- Create all directory placeholders per Architecture Section 2.1
- Follow naming conventions: kebab-case for files (Architecture Section 5.1)

---

## Epic 2: Design System & UI Components

**Goal:** Establish the complete design system with Trust Blue theme, shadcn/ui component library, and reusable UI primitives that ensure visual consistency and WCAG AA accessibility across all features.

**User Value:** Users experience a professional, accessible, visually cohesive interface with Trust Blue branding that works beautifully on all devices.

**Covers FRs:** NFR-DESIGN (Trust Blue theme, professional aesthetic), NFR-A11Y (WCAG AA compliance), NFR-RESP (responsive design system)

---

### Story 2.1: Configure Tailwind CSS with Trust Blue Theme

As a developer,
I want Tailwind CSS fully configured with the Trust Blue color palette, typography scale, and spacing system,
So that all components have consistent styling that matches the UX design specification.

**Acceptance Criteria:**

**Given** the Next.js project is initialized (Story 1.1 complete)
**When** I configure Tailwind CSS
**Then** tailwind.config.ts contains:
- Trust Blue primary colors (DEFAULT: #2563eb, hover: #1d4ed8, light: #3b82f6)
- Semantic colors (success: #10b981, warning: #f59e0b, error: #ef4444)
- Complete Slate neutral scale (50-900) per UX spec
- Custom typography scale with font sizes and line heights:
  - display: 3rem, line-height 1.2, font-weight 700
  - h1: 2.25rem, line-height 1.3, font-weight 700
  - h2: 1.875rem, line-height 1.3, font-weight 600
  - h3: 1.5rem, line-height 1.4, font-weight 600
  - h4: 1.25rem, line-height 1.5, font-weight 600
- Font families: Inter for sans, Fira Code for mono
- Custom spacing values (18: 4.5rem, 88: 22rem)
- Max-width container: 1280px (7xl)
- Border radius variable: 0.5rem

**And** src/app/globals.css contains:
- Tailwind directives (@tailwind base, components, utilities)
- Base layer styles:
  - Root CSS variables for radius
  - Body background (bg-slate-50) and text color (text-slate-900)
  - Heading styles (font-semibold, text-slate-900)
- Component layer utilities:
  - .hero-gradient class (bg-gradient-to-r from-blue-600 to-blue-700)
  - .product-card-hover class (transition-all with shadow-lg and translate-y)
- Utility layer additions:
  - .line-clamp-2 for text truncation

**And** dark mode is configured:
- darkMode: ['class'] in tailwind.config.ts (even though Phase 1 doesn't use it, prepared for Phase 2)

**And** I can verify the theme works:
- Apply `bg-primary` class → shows Trust Blue (#2563eb)
- Apply `hover:bg-primary-hover` → shows darker blue (#1d4ed8)
- Apply `text-slate-600` → shows secondary text color
- Typography classes (text-h1, text-h2) apply correct sizes

**Prerequisites:** Story 1.1 (Project initialization)

**Technical Notes:**
- Follow Architecture Section 12.1 (Tailwind Configuration) exactly
- Follow Architecture Section 12.2 (Global Styles) for globals.css
- UX Design Section 3 specifies Trust Blue (#2563eb) as primary brand color
- UX Design Section 4 specifies typography scale (48px display → 16px body)
- Ensure tailwindcss-animate plugin is installed (for shadcn/ui animations)
- Test theme by temporarily adding colored divs to page.tsx

---

### Story 2.2: Create shadcn/ui Base Components with Trust Blue Styling

As a developer,
I want shadcn/ui Button, Card, Badge, and Skeleton components installed and styled with Trust Blue theme,
So that I have accessible, consistent UI primitives for all product features.

**Acceptance Criteria:**

**Given** Tailwind CSS is configured with Trust Blue theme (Story 2.1 complete)
**When** I install shadcn/ui components
**Then** the following components exist in src/components/ui/:
- button.tsx (with variants: default, outline, ghost, destructive)
- card.tsx (with sub-components: Card, CardHeader, CardTitle, CardContent, CardFooter)
- badge.tsx (with variants: default, secondary, outline, destructive)
- skeleton.tsx (for loading states)

**And** Button component has Trust Blue styling:
- Default variant: bg-primary (#2563eb) with hover:bg-primary-hover (#1d4ed8)
- Outline variant: border-primary with text-primary
- Focus states: focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
- Proper ARIA attributes (role="button", aria-label support)
- Keyboard accessible (Enter and Space key support)
- Touch-friendly size (min 44x44px tap targets for mobile)

**And** Card component follows Trust Blue theme:
- Border color: border-slate-200
- Background: bg-white
- Rounded corners: rounded-lg
- Shadow on hover: hover:shadow-lg transition-shadow
- Proper semantic HTML (<article> or <section>)

**And** Badge component has category styling:
- Default variant: bg-primary text-white
- Secondary variant: bg-slate-100 text-slate-900
- Outline variant: border-primary text-primary
- Small, inline size for category labels

**And** Skeleton component for loading states:
- Animated shimmer effect
- Respects aspect ratios (aspect-[16/9] for product cards)
- Slate-200 background color

**And** all components are TypeScript typed:
- Proper prop interfaces exported
- Variants typed as string literals (not just string)
- Ref forwarding for accessibility

**And** I can verify components work:
- Import and render Button with different variants
- Apply Trust Blue classes and see correct colors
- Keyboard navigation works (Tab, Enter, Space)
- Components are responsive (mobile/desktop)

**Prerequisites:** Story 2.1 (Tailwind theme configuration)

**Technical Notes:**
- Install via: `npx shadcn@latest add button card badge skeleton`
- Components should auto-respect tailwind.config.ts theme
- Verify Trust Blue primary color (#2563eb) is used in default Button variant
- Architecture Section 11.2 specifies component patterns
- UX Design Section 6.2 specifies component accessibility requirements
- Test with temporary page.tsx imports to verify styling
- Ensure WCAG AA contrast ratios (4.5:1 for text) per Architecture Section 13.6

---

### Story 2.3: Create PriceDisplay Component with Currency Formatting

As a user,
I want product prices displayed consistently in USD format with proper currency symbols,
So that I can quickly understand product costs without confusion.

**Acceptance Criteria:**

**Given** shadcn/ui components are installed (Story 2.2 complete)
**When** I create the PriceDisplay component
**Then** src/components/product/price-display.tsx exists with:
- TypeScript interface PriceDisplayProps:
  - amount: number (required)
  - currency?: 'USD' | 'EUR' | 'GBP' (default 'USD')
  - size?: 'small' | 'large' | 'xlarge' (default 'large')
  - className?: string (optional)
- Named export: `export function PriceDisplay`
- Uses Intl.NumberFormat for currency formatting
- Renders as <span> with proper ARIA label

**And** the component formats prices correctly:
- 49.99 → "$49.99"
- 5.00 → "$5.00"
- 199.99 → "$199.99"
- Respects currency prop (USD, EUR, GBP)
- Uses en-US locale for consistency

**And** size variants apply Trust Blue styling:
- small: text-base font-semibold
- large: text-xl font-bold (default)
- xlarge: text-2xl font-bold
- All sizes use text-blue-600 (Trust Blue) color

**And** accessibility is implemented:
- aria-label={`Price: ${formattedPrice}`}
- Proper semantic HTML (<span>)
- Screen reader announces price with currency

**And** component is reusable:
- Accepts className prop for custom styling via cn() utility
- TypeScript ensures type safety
- Works in ProductCard, ProductDetail contexts

**And** I can verify it works:
- Render <PriceDisplay amount={49.99} size="large" />
- Shows "$49.99" in Trust Blue color, large bold text
- Changing size prop changes font size correctly
- Screen reader announces "Price: $49.99"

**Prerequisites:** Story 2.2 (shadcn/ui components)

**Technical Notes:**
- Follow Architecture Section 11.2 (PriceDisplay Component specification)
- Use Intl.NumberFormat per Architecture code example
- Import cn() utility from '@/lib/utils' for className merging
- Follow Architecture Section 13.3 (Component Structure Pattern)
- Define PriceDisplayProps interface in src/types/component-props.ts (create file if doesn't exist)
- UX Design Section 6.1.3 specifies price prominence and Trust Blue color
- Trust Blue price color (#2563eb) per UX spec

---

### Story 2.4: Create ProductImage Component with Next.js Optimization

As a user,
I want product images to load quickly and look sharp on all devices,
So that I can see products clearly without waiting for slow-loading images.

**Acceptance Criteria:**

**Given** the design system is configured (Story 2.1-2.3 complete)
**When** I create the ProductImage component
**Then** src/components/product/product-image.tsx exists with:
- TypeScript interface ProductImageProps:
  - src: string (required) - image path
  - alt: string (required) - accessibility text
  - category?: string (optional) - for category badge overlay
  - aspectRatio?: '16/9' | '1/1' | '4/3' (default '16/9')
  - priority?: boolean (default false) - for above-fold images
  - className?: string (optional)
- Uses Next.js Image component for optimization
- Named export: `export function ProductImage`

**And** the component uses Next.js Image with:
- width={800} height={450} for 16:9 ratio (from Architecture)
- fill prop for responsive container sizing
- Proper sizes attribute for responsive images
- priority={true} for above-fold images (hero section)
- lazy loading enabled by default (priority={false} for below-fold)
- className with object-cover for proper aspect ratio
- rounded-lg for consistent border radius

**And** aspect ratios are supported:
- 16/9: Most product cards and detail images (800x450px)
- 1/1: Square thumbnails if needed (800x800px)
- 4/3: Alternative layout (800x600px)
- Proper aspect-[16/9] Tailwind class applied to container

**And** image loading states are handled:
- Shows gradient placeholder while loading (Trust Blue gradient)
- Prevents layout shift with proper width/height
- onError handler shows fallback:
  - Trust Blue gradient background (from-blue-600 to-blue-700)
  - Centered emoji or icon (🖼️ or similar)
  - Alt text displayed if image fails

**And** accessibility is implemented:
- alt prop is required and descriptive
- Format: `{product.name} - {product.category}`
- Empty alt="" for decorative images
- No missing alt text warnings

**And** hover effects (for cards):
- group-hover:scale-105 for subtle zoom on hover
- transition-transform duration-200 for smooth animation
- Contained within overflow-hidden parent

**And** I can verify it works:
- Render with placeholder URL → shows image
- Render with invalid URL → shows Trust Blue gradient fallback
- Hover over image in card → subtle zoom effect
- Inspector shows Next.js optimized WebP format
- Mobile testing shows responsive image sizing

**Prerequisites:** Story 2.2 (shadcn/ui components)

**Technical Notes:**
- Follow Architecture Section 7 (Image Strategy)
- Next.js Image automatically converts to WebP
- Image dimensions: 800x450px per Architecture Section 7.2
- Use placeholder.co for Phase 1 testing: `https://placehold.co/800x450/2563eb/ffffff?text=Product`
- Architecture Section 11.2 shows ProductImage implementation pattern
- Define ProductImageProps in src/types/component-props.ts
- UX Design Section 6.1.2 specifies image loading and error states
- Trust Blue gradient: `bg-gradient-to-br from-blue-600 to-blue-700`

---

### Story 2.5: Create ErrorMessage Component for User Feedback

As a user,
I want clear error messages with retry options when something goes wrong,
So that I understand the issue and can take action to resolve it.

**Acceptance Criteria:**

**Given** base UI components exist (Story 2.2 complete)
**When** I create the ErrorMessage component
**Then** src/components/ui/error-message.tsx exists with:
- TypeScript interface ErrorMessageProps:
  - message: string (required) - user-friendly error message
  - onRetry?: () => void (optional) - retry callback
  - className?: string (optional)
- Named export: `export function ErrorMessage`
- Semantic HTML structure (<div> with role="alert")

**And** the component displays error state:
- Centered layout with flexbox
- Error icon or emoji (⚠️ or 🚫)
- Error message text in red-600 color
- Clear, user-friendly message (not technical stack traces)
- Proper spacing (padding, margins)

**And** optional retry functionality:
- If onRetry provided, show "Try Again" button
- Button uses shadcn/ui Button component (variant="default")
- Click calls onRetry callback
- Button is keyboard accessible
- Loading state during retry (optional enhancement)

**And** accessibility is implemented:
- role="alert" for screen reader announcement
- aria-live="polite" for dynamic errors
- Error message is descriptive (not just "Error")
- Retry button has aria-label="Retry loading"

**And** styling follows design system:
- Text color: text-red-600 (error semantic color)
- Background: bg-red-50 (light red tint)
- Border: border border-red-200
- Rounded corners: rounded-lg
- Proper padding: p-4 or p-6

**And** common error scenarios are handled:
- "Unable to load products" → generic data loading error
- "Product not found" → specific product error
- "Connection issue. Please try again." → network error
- "Something went wrong" → unknown error fallback

**And** I can verify it works:
- Render with message="Unable to load products"
- Shows red error with message
- Render with onRetry prop → shows "Try Again" button
- Click button → calls onRetry callback
- Screen reader announces error message

**Prerequisites:** Story 2.2 (shadcn/ui Button component)

**Technical Notes:**
- Follow Architecture Section 9.2 (Error Display Components)
- Use shadcn/ui Button for retry action
- Import from '@/components/ui/button'
- Define ErrorMessageProps in src/types/component-props.ts
- Architecture Section 13.5 shows error handling patterns
- Will be used in product grid, product detail, and data loading scenarios
- Consider extracting common error messages to constants.ts

---

## Epic 3: Product Data & Type System

**Goal:** Define TypeScript types and create sample product catalog data that provides realistic content for all browsing features while ensuring type safety across the application.

**User Value:** Users can browse a diverse, realistic product catalog. (Foundation for browsing features)

**Covers FRs:** Foundation for FR-HP-4 (product grid), FR-HP-5 (product information), FR-PD-3 (product details)

---

### Story 3.1: Define TypeScript Types for Product Domain

As a developer,
I want comprehensive TypeScript types for Product, Category, and component props,
So that all components have type safety and consistent data structures.

**Acceptance Criteria:**

**Given** the project structure is initialized (Story 1.1 complete)
**When** I create TypeScript type definitions
**Then** src/types/product.ts exists with Product interface:
```typescript
interface Product {
  id: string;              // Format: "prod_XXX"
  slug: string;            // URL-friendly: "premium-game-pass"
  name: string;            // Max 100 chars
  category: string;        // Must match Category.id
  price: number;           // USD amount (e.g. 49.99)
  shortDescription: string; // 1-2 sentences for cards
  description: string;     // Full multi-paragraph description
  image: string;           // Primary image path
  images?: string[];       // Additional gallery images
  platform?: string;       // "Windows, Mac, Web", etc.
  deliveryMethod?: string; // "Email", "Account Dashboard"
  deliveryTime?: string;   // "Instant", "Within 24 hours"
  featured?: boolean;      // Show in featured section
  relatedProducts?: string[]; // Product IDs for "You might also like"
}
```

**And** Category interface:
```typescript
interface Category {
  id: string;   // Unique identifier: "games", "software"
  name: string; // Display name: "Games", "Software"
  slug: string; // URL parameter: "games", "software"
}
```

**And** src/types/component-props.ts exists with all component prop interfaces:
- ProductCardProps (product, variant?, onClick?)
- ProductGridProps (products, loading?, emptyMessage?)
- CategoryFilterProps (categories, activeCategory, onCategoryChange, productCounts?)
- ProductImageProps (already defined in Story 2.4)
- PriceDisplayProps (already defined in Story 2.3)
- ErrorMessageProps (already defined in Story 2.5)

**And** all types are properly exported:
- `export interface Product`
- `export interface Category`
- `export type` for union types (e.g., `type Variant = 'standard' | 'compact' | 'featured'`)

**And** JSDoc comments document each field:
- Purpose of each field
- Format/constraints (e.g., "Format: prod_XXX", "Max 100 chars")
- Examples where helpful

**And** I can verify types work:
- Import Product type in another file → TypeScript recognizes it
- Create Product object → TypeScript validates required fields
- Try to set price to string → TypeScript shows error
- Autocomplete works in VS Code for all fields

**Prerequisites:** Story 1.1 (Project initialization)

**Technical Notes:**
- Follow Architecture Section 3.1 (Product Data Model) exactly
- Follow Architecture Section 4.1 (Core Types)
- Follow Architecture Section 4.2 (Component Props) for component-props.ts
- Product structure matches Architecture-defined JSON schema
- All optional fields marked with `?`
- id format: "prod_001", "prod_002", etc.
- slug format: lowercase-with-hyphens (from Architecture Section 5.3)
- price is number (not string) for calculations
- relatedProducts array contains Product IDs, not Product objects

---

### Story 3.2: Create Sample Product Catalog with 24 Products

As a user,
I want to browse a diverse catalog of digital products across multiple categories,
So that I can explore different types of products and understand the marketplace offering.

**Acceptance Criteria:**

**Given** TypeScript Product and Category types are defined (Story 3.1 complete)
**When** I create the product catalog data
**Then** src/data/products.json exists with 24 sample products:
- 6-8 products in "Games" category (game keys, subscriptions)
- 6-8 products in "Software" category (productivity, design, dev tools)
- 4-6 products in "AI Tools" category (ChatGPT Plus, Midjourney, etc.)
- 4-6 products in "Education" category (courses, learning platforms)
- 4-6 products in "Entertainment" category (streaming, music subscriptions)

**And** src/data/categories.json exists with 6 categories:
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

**And** each product has realistic content:
- Unique id (prod_001, prod_002, ..., prod_024)
- URL-friendly slug (e.g., "premium-game-pass", "chatgpt-plus-subscription")
- Compelling product name (max 100 chars)
- Category matching one of 5 categories (not "all")
- Price range: $5 - $200 (varied price points)
- Short description: 1-2 engaging sentences
- Full description: 3-5 paragraphs covering:
  - What it is
  - Key features (bullet points in text)
  - Who it's for
  - What's included
  - How it works/activation
- Primary image path: "/images/products/{slug}.jpg"
- Platform info: "Windows, Mac", "Web-based", etc.
- Delivery method: "Email", "Instant", "Account Dashboard"
- Delivery time: "Instant", "Within 5 minutes", "Within 24 hours"

**And** 4-6 products are marked as featured:
- featured: true flag
- Mix of categories (not all from one category)
- Range of price points

**And** each product has 2-4 related products:
- relatedProducts array with product IDs
- Products from same or complementary categories
- No circular references that break (product A → B → C is fine)

**And** product content is high quality:
- No Lorem Ipsum or obvious placeholders
- Descriptions are realistic and compelling
- Product names sound like real offerings
- No typos or grammatical errors
- Professional tone matching e-commerce marketplace

**And** src/lib/product-data.ts exists with helper functions:
- `getAllProducts(): Product[]` - returns all products
- `getProductBySlug(slug: string): Product | undefined` - find by slug
- `getProductsByCategory(categorySlug: string): Product[]` - filter by category
- `getRelatedProducts(productId: string, limit?: number): Product[]` - get related products
- `getAllCategories(): Category[]` - returns all categories
- `searchProducts(query: string): Product[]` - search by name/description

**And** I can verify data works:
- Import and call getAllProducts() → returns 24 products
- Call getProductsByCategory('games') → returns 6-8 games
- Call getProductBySlug('premium-game-pass') → returns that product
- All products pass TypeScript type checking
- No duplicate IDs or slugs
- All category references are valid

**Prerequisites:** Story 3.1 (TypeScript types)

**Technical Notes:**
- Follow Architecture Section 3.1 (Product Data Model) for JSON structure
- Follow Architecture Section 3.2 (Category Data Model)
- Follow Architecture Section 3.3 (Data Loading Functions) for product-data.ts
- PRD Section 7.1 lists specific product category requirements
- PRD Section 7.2 provides copy guidelines
- Use placeholder.co URLs for images (replace later): `https://placehold.co/800x450/2563eb/ffffff?text={slug}`
- Ensure all products validate against Product interface
- relatedProducts should reference actual product IDs in the dataset
- searchProducts should search name, shortDescription, description fields (case-insensitive)

---

## Epic 4: Homepage Product Listing

**Goal:** Build the complete homepage experience with hero banner, category filtering, and responsive product grid that enables users to discover and explore digital products.

**User Value:** Users can browse all available products, filter by category, and quickly find products of interest.

**Covers FRs:** FR-HP-1 (header), FR-HP-2 (hero), FR-HP-3 (category filter), FR-HP-4 (product grid), FR-HP-5 (product info)

---

### Story 4.1: Create ProductCard Component with Hover Effects

As a user,
I want product cards to show key information and respond to my mouse/touch interactions,
So that I can quickly evaluate products and know they're clickable.

**Acceptance Criteria:**

**Given** Product types, sample data, and UI components exist (Epic 2 & 3 complete)
**When** I create the ProductCard component
**Then** src/components/product/product-card.tsx exists with:
- TypeScript interface ProductCardProps (imported from types/)
- Props: product (Product), variant ('standard' | 'compact' | 'featured'), onClick
- Named export: `export function ProductCard`
- Wrapped in Next.js Link to /products/{product.slug}

**And** the card displays product information:
- ProductImage component (16:9 aspect ratio, 800x450px)
- Category Badge (uses shadcn/ui Badge, variant="secondary")
- Product name (h3, font-semibold, text-lg, line-clamp-2 for truncation)
- Short description (p, text-sm, text-slate-600, line-clamp-2)
- PriceDisplay component (size="large", Trust Blue color)

**And** the card structure uses semantic HTML:
- <article> element (not <div>)
- Proper heading hierarchy (h3 for product name)
- Link wraps entire card for accessibility
- aria-label="View {product.name}" on Link

**And** hover effects are implemented:
- Default state: white background, border, subtle shadow
- Hover state:
  - Elevated shadow (hover:shadow-lg)
  - Smooth transition (transition-shadow duration-200)
  - Image zoom effect: group-hover:scale-105
  - Image container has group class and overflow-hidden
- Focus state: Blue focus ring (focus:ring-2 focus:ring-blue-600)

**And** responsive layout:
- Aspect ratio maintained on all screen sizes
- Padding inside card: p-4
- Gap between elements: space-y-2 or explicit mt-* classes
- Mobile: Full card clickable, touch-friendly (min 44x44px)
- Desktop: Subtle cursor:pointer

**And** variant support (standard is default):
- 'standard': Regular size, all information shown
- 'compact': Smaller text, reduced padding (for related products)
- 'featured': Larger card, optional featured badge

**And** I can verify it works:
- Render ProductCard with sample product → shows all information
- Hover over card → shadow elevation and image zoom
- Tab to card with keyboard → visible focus ring
- Click card → navigates to product detail page (not yet implemented, shows Next.js 404 for now)
- Mobile: Tap card → proper touch response
- Product name longer than 2 lines → truncates with ellipsis

**Prerequisites:** Story 2.3 (PriceDisplay), Story 2.4 (ProductImage), Story 3.2 (Product data)

**Technical Notes:**
- Follow Architecture Section 11.2 (ProductCard Component) for exact implementation
- Use Next.js Link from 'next/link'
- Use Next.js Image inside ProductImage component
- Import Product type from '@/types/product'
- Import PriceDisplay from '@/components/product/price-display'
- Import ProductImage from '@/components/product/product-image'
- Import Badge from '@/components/ui/badge'
- UX Design Section 6.1.1 specifies card hover and interaction states
- Apply line-clamp-2 utility for text truncation (defined in globals.css)
- Test with various product name lengths (short, medium, very long)

---

### Story 4.2: Create ProductGrid Component with Loading States

As a user,
I want products displayed in a responsive grid that looks good on all screen sizes,
So that I can easily browse multiple products at once.

**Acceptance Criteria:**

**Given** ProductCard component exists (Story 4.1 complete)
**When** I create the ProductGrid component
**Then** src/components/product/product-grid.tsx exists with:
- TypeScript interface ProductGridProps (imported from types/)
- Props: products (Product[]), loading? (boolean), emptyMessage? (string)
- Named export: `export function ProductGrid`

**And** responsive grid layout:
- Mobile (<640px): 1 column (grid-cols-1)
- Tablet (640-1023px): 2 columns (md:grid-cols-2)
- Desktop (≥1024px): 4 columns (lg:grid-cols-4)
- Gap between cards: gap-4 on mobile, gap-6 on desktop (md:gap-6)
- Container applies CSS Grid (grid class)

**And** loading state shows skeleton placeholders:
- When loading={true}, render 8 Skeleton components
- Each skeleton has aspect-[16/9] matching ProductCard
- Skeletons have h-80 or similar height
- Skeleton components from shadcn/ui with shimmer animation
- Grid layout maintained (same columns as loaded state)

**And** empty state is user-friendly:
- When products.length === 0 and not loading, show empty message
- Centered text: text-center py-12
- Text color: text-slate-600
- Default message: "No products found"
- Custom message via emptyMessage prop
- Optional: Empty state icon or illustration

**And** loaded state renders product cards:
- Map over products array
- Render ProductCard for each product
- key={product.id} for React reconciliation
- All cards have consistent spacing via grid gap

**And** accessibility:
- Semantic container (<section> or <div> with role="region")
- aria-label="Product grid" or similar
- aria-busy={loading} for loading state
- Loading announcement for screen readers

**And** I can verify it works:
- Render with 24 products → shows 4 columns on desktop, 2 on tablet, 1 on mobile
- Render with loading={true} → shows 8 skeleton cards
- Render with empty array → shows "No products found" message
- Resize browser → grid responds to breakpoints
- Products maintain consistent card height in each row

**Prerequisites:** Story 4.1 (ProductCard), Story 2.2 (Skeleton component)

**Technical Notes:**
- Follow Architecture Section 11.2 (ProductGrid Component)
- Import ProductCard from '@/components/product/product-card'
- Import Skeleton from '@/components/ui/skeleton'
- Import Product type from '@/types/product'
- Responsive breakpoints match Architecture Section 4.2 (640px, 1024px)
- UX Design Section 6.1.1 specifies grid layout and responsive behavior
- Consider grid-auto-rows for consistent row heights if needed
- Test with various product counts (0, 1, 3, 8, 24)

---

### Story 4.3: Create CategoryFilter Component with URL State

As a user,
I want to filter products by category with clear visual feedback,
So that I can quickly narrow down products to my area of interest.

**Acceptance Criteria:**

**Given** Category data and UI components exist (Story 2.2, 3.2 complete)
**When** I create the CategoryFilter component
**Then** src/components/filters/category-filter.tsx exists with:
- 'use client' directive (client component for interactivity)
- TypeScript interface CategoryFilterProps (imported from types/)
- Props: categories (Category[]), activeCategory (string), onCategoryChange ((slug: string) => void)
- Named export: `export function CategoryFilter`

**And** horizontal category tabs layout:
- Flexbox container: flex gap-2 overflow-x-auto py-4
- Horizontal scroll on mobile if too many categories
- Proper touch scrolling: -webkit-overflow-scrolling: touch
- Role="tablist" for accessibility

**And** each category renders as a button:
- Uses shadcn/ui Button component
- Active category: variant="default" (Trust Blue background)
- Inactive categories: variant="outline" (white background, blue border)
- Button text: category.name ("All Products", "Games", "Software", etc.)
- role="tab" on each button
- aria-selected={activeCategory === category.slug}

**And** clicking a category updates the URL:
- onCategoryChange callback called with category.slug
- Parent component (page.tsx) handles URL update via useRouter().push
- URL format: /?category={slug} or /?category=all
- Browser back button works (URL-based state)

**And** visual states:
- Active: bg-primary (Trust Blue), text-white, no border
- Inactive: bg-white, text-slate-700, border-slate-300
- Hover (inactive): border-primary, text-primary
- Focus: Blue focus ring (keyboard navigation)
- Transition: smooth color/border transitions (transition-colors)

**And** accessibility:
- Keyboard navigation: Tab through categories, Enter/Space to select
- aria-label="Filter products by category" on container
- Active category has aria-selected="true"
- Screen reader announces: "Games tab, selected" or "Software tab"

**And** responsive behavior:
- Mobile: Horizontal scroll if categories overflow
- Desktop: All categories visible in single row
- Buttons maintain minimum size (don't shrink too small)
- Touch-friendly button size on mobile (min 44px height)

**And** I can verify it works:
- Render with 6 categories → all categories visible
- Click "Games" → onCategoryChange called with "games"
- Active category shows Trust Blue background
- Keyboard Tab → focus moves through categories
- Enter key → selects category
- Mobile: Scroll horizontally if needed

**Prerequisites:** Story 2.2 (Button component), Story 3.2 (Category data)

**Technical Notes:**
- Follow Architecture Section 11.2 (CategoryFilter Component)
- Import Button from '@/components/ui/button'
- Import Category type from '@/types/product'
- This is a controlled component (parent manages state)
- State management via URL per Architecture Section 6.1
- UX Design Section 6.1.4 specifies category filter behavior
- Will be used in page.tsx with useSearchParams and useRouter

---

### Story 4.4: Implement Homepage with Hero, Filter, and Product Grid

As a user,
I want a beautiful homepage that showcases products and lets me filter by category,
So that I can discover products and start my shopping journey.

**Acceptance Criteria:**

**Given** ProductGrid, CategoryFilter, and sample data exist (Stories 4.1-4.3, 3.2 complete)
**When** I implement the homepage
**Then** src/app/page.tsx is a client component with:
- 'use client' directive
- Imports: getAllProducts, getAllCategories, ProductGrid, CategoryFilter
- useSearchParams hook to read ?category= URL parameter
- Active category from URL or default to 'all'

**And** src/components/layout/hero-banner.tsx exists with:
- Full-width hero section
- Trust Blue gradient background (bg-gradient-to-r from-blue-600 to-blue-700)
- White text color (text-white)
- Centered content (max-w-7xl mx-auto text-center)
- Large heading (text-4xl md:text-5xl font-bold): "Digital Products Marketplace"
- Subheading (text-xl text-blue-100): "Games • Software • AI Tools • More"
- Vertical padding: py-16 (or py-12 on mobile)
- Horizontal padding: px-4 for mobile edge spacing

**And** the homepage layout includes:
1. HeroBanner component (full width)
2. Main content container (max-w-7xl mx-auto px-4)
   - CategoryFilter component
   - ProductGrid component
3. Proper spacing between sections (space-y-8 or explicit margins)

**And** category filtering works:
- Read category from URL: ?category=games
- Default to 'all' if no parameter
- Pass to CategoryFilter as activeCategory prop
- Filter products: getProductsByCategory(activeCategory)
- Pass filtered products to ProductGrid

**And** CategoryFilter onCategoryChange handler:
- Uses useRouter from 'next/navigation'
- Calls router.push(`/?category=${slug}`)
- Updates URL without page reload
- ProductGrid updates with new filtered products

**And** page structure uses semantic HTML:
- <main> element wraps main content
- <section> for hero banner
- Proper heading hierarchy (h1 in hero, h2 for "Browse Products" if added)

**And** meta tags are set:
- Page title: "Digital Products Marketplace - ecommerce-shop"
- Meta description: Brief description of marketplace
- Open Graph tags for social sharing (optional Phase 1)

**And** I can verify homepage works:
- Navigate to / → shows hero banner, all 24 products
- Click "Games" category → URL changes to /?category=games, shows 6-8 game products
- Click "All Products" → URL changes to /?category=all, shows all 24 products
- Browser back button → returns to previous category filter
- Mobile: Hero is full-width, product grid is 1 column
- Desktop: Product grid shows 4 columns
- No console errors
- Lighthouse performance ≥ 90

**Prerequisites:** Story 4.1 (ProductCard), Story 4.2 (ProductGrid), Story 4.3 (CategoryFilter), Story 3.2 (Product data)

**Technical Notes:**
- Follow Architecture Section 8.1 (URL Structure) for routing
- Follow Architecture Section 6.1 (URL-Based State Management)
- Create HeroBanner per Architecture Section 11.2 (HeroBanner Component)
- Use 'use client' because CategoryFilter needs interactivity
- Import useSearchParams from 'next/navigation'
- Import useRouter from 'next/navigation'
- Filter logic: `products.filter(p => category === 'all' || p.category === category)`
- PRD Section 3.1 specifies homepage layout requirements
- UX Design Section 5.1 specifies homepage structure and hero section
- Test all 6 category filters (all, games, software, ai-tools, education, entertainment)

---

## Epic 5: Product Detail Pages

**Goal:** Create rich product detail pages with large images, comprehensive information, and related product recommendations that help users make informed decisions.

**User Value:** Users can view detailed product information, see high-quality images, and discover related products.

**Covers FRs:** FR-PD-1 (breadcrumbs), FR-PD-2 (images), FR-PD-3 (product info), FR-PD-4 (disabled CTAs), FR-PD-5 (related products)

---

### Story 5.1: Create ProductDetail Component with Full Information

As a user,
I want to see comprehensive product details including description, specifications, and metadata,
So that I can fully understand what I'm considering purchasing.

**Acceptance Criteria:**

**Given** Product types and UI components exist (Epic 2 & 3 complete)
**When** I create the ProductDetail component
**Then** src/components/product/product-detail.tsx exists with:
- TypeScript interface ProductDetailProps: { product: Product }
- Named export: `export function ProductDetail`
- Two-column layout on desktop, stacked on mobile

**And** left column shows product image:
- ProductImage component with primary product.image
- Large size: aspect-[16/9], width 800px
- Gallery support if product.images exists (optional enhancement)
- Image container with rounded-lg border

**And** right column shows product information:
- Product name (h1, text-3xl md:text-4xl, font-bold, text-slate-900)
- Category badge (shadcn/ui Badge, secondary variant)
- Price display (PriceDisplay, size="xlarge", prominent placement)
- Short description (text-lg, text-slate-700, mt-4)
- Proper spacing between elements (space-y-4)

**And** below image/info sections shows full description:
- Full-width section below the two columns
- Heading: "Description" (h2, text-2xl, font-semibold)
- product.description rendered with paragraphs (whitespace-pre-line or split by \n)
- Proper typography: text-slate-700, line-height relaxed
- Markdown-style formatting if description includes ** bold ** or similar (optional)

**And** metadata section displays specifications:
- Heading: "Specifications" or "Details" (h3, text-xl, font-semibold)
- Platform: product.platform (e.g., "Windows, Mac, Xbox")
- Delivery Method: product.deliveryMethod (e.g., "Email")
- Delivery Time: product.deliveryTime (e.g., "Instant")
- Format: Key-value pairs or definition list (<dl>)
- Proper spacing and alignment

**And** disabled action buttons (Phase 1):
- "Add to Cart" button (shadcn/ui Button, variant="default")
- "Buy Now" button (shadcn/ui Button, variant="outline")
- Both buttons have disabled={true}
- Tooltip or helper text: "Coming in Phase 2" (use title attribute or <span>)
- Buttons are styled but clearly disabled (opacity-50 cursor-not-allowed)
- Visual cue that these are future features

**And** responsive layout:
- Desktop (≥1024px): Two columns (60/40 split, image left, info right)
- Tablet (640-1023px): Two columns (50/50 split)
- Mobile (<640px): Stacked (image above, info below)
- Proper spacing and padding throughout

**And** semantic HTML:
- <article> wrapper for entire product detail
- <h1> for product name (only h1 on page)
- <section> for description, specifications
- <dl>, <dt>, <dd> for metadata key-value pairs

**And** I can verify it works:
- Render with sample product → shows all information
- Long description wraps properly, maintains readability
- Mobile: Image above info, full-width layout
- Desktop: Two-column layout, image left, info right
- Disabled buttons show tooltip/text about Phase 2
- All product metadata displays correctly

**Prerequisites:** Story 2.3 (PriceDisplay), Story 2.4 (ProductImage), Story 2.2 (Button, Badge)

**Technical Notes:**
- Follow Architecture Section 11.2 for component structure
- Follow PRD Section 3.2 (Product Detail Page) for layout requirements
- Use CSS Grid or Flexbox for two-column layout
- Container: max-w-7xl mx-auto px-4
- Image column: lg:w-3/5 or similar
- Info column: lg:w-2/5 or similar
- UX Design Section 6.2 specifies product detail layout
- For description paragraphs, split on \n\n or use whitespace-pre-line
- Disabled buttons per PRD REQ-PD-005

---

### Story 5.2: Create Breadcrumb Navigation Component

As a user,
I want breadcrumb navigation showing my current location,
So that I can easily navigate back to previous pages.

**Acceptance Criteria:**

**Given** product detail page exists (Story 5.1 complete)
**When** I create the Breadcrumb component
**Then** src/components/layout/breadcrumb.tsx exists with:
- TypeScript interface BreadcrumbProps: { items: BreadcrumbItem[] }
- BreadcrumbItem type: { label: string, href?: string }
- Named export: `export function Breadcrumb`

**And** breadcrumb display:
- Horizontal layout: flex items-center gap-2
- Text size: text-sm
- Text color: text-slate-600
- Links: text-blue-600 hover:text-blue-700 hover:underline
- Current page (no href): text-slate-900 font-semibold
- Separator between items: "/" or "›" (text-slate-400)

**And** breadcrumb structure for product pages:
- Home > {Category Name} > {Product Name}
- Example: "Home > Games > Premium Game Pass"
- Home and Category are links
- Product Name is plain text (current page)

**And** semantic HTML and accessibility:
- <nav> element with aria-label="Breadcrumb"
- <ol> ordered list for breadcrumb items
- <li> for each item
- aria-current="page" on current page item
- Each link has proper href

**And** responsive behavior:
- Mobile: May truncate long product names (line-clamp-1)
- Desktop: Show full breadcrumb
- Proper spacing: py-4 or similar vertical padding

**And** I can verify it works:
- Render breadcrumb on product detail page → shows "Home > Games > Product Name"
- Click "Home" → navigates to /
- Click category name → navigates to /?category=games
- Current page (product name) is not clickable
- Screen reader announces breadcrumb navigation

**Prerequisites:** None (standalone component)

**Technical Notes:**
- Follow PRD REQ-PD-001 (breadcrumb navigation requirement)
- Use Next.js Link for navigation
- Import Link from 'next/link'
- Breadcrumb items can be built in product detail page from product data:
  ```typescript
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: categoryName, href: `/?category=${product.category}` },
    { label: product.name } // no href = current page
  ];
  ```
- UX Design Section 6.2 shows breadcrumb placement
- Consider using <ChevronRight> icon from lucide-react for separator (optional)

---

### Story 5.3: Implement Product Detail Page with Dynamic Routing

As a user,
I want to click on any product and see its detailed information page,
So that I can learn more before making a purchase decision.

**Acceptance Criteria:**

**Given** ProductDetail and Breadcrumb components exist (Stories 5.1-5.2)
**When** I implement the dynamic product detail route
**Then** src/app/products/[slug]/page.tsx exists as a Server Component with:
- Dynamic route parameter: [slug]
- Fetches product via getProductBySlug(slug)
- Fetches related products via getRelatedProducts(product.id, 4)
- Returns product detail page

**And** page layout includes:
1. Breadcrumb component (category and product name from product data)
2. ProductDetail component with product prop
3. Related products section:
   - Heading: "You might also like" (h2, text-2xl, font-semibold)
   - ProductGrid with related products (compact variant)
   - 3-4 related product cards
   - Horizontal layout on desktop (grid-cols-4)
4. Proper spacing between sections (space-y-8 or space-y-12)

**And** 404 handling for invalid slugs:
- If getProductBySlug returns undefined, call notFound()
- Next.js renders 404 page (src/app/not-found.tsx)
- 404 page shows:
  - "Product not found" message
  - "Browse Products" button linking to /
  - Friendly, helpful tone

**And** metadata is set dynamically:
- Page title: "{product.name} - ecommerce-shop"
- Meta description: product.shortDescription
- Open Graph image: product.image (optional Phase 1)
- Use Next.js generateMetadata function

**And** URL structure:
- /products/{slug} format (e.g., /products/premium-game-pass)
- Slugs are URL-friendly: lowercase-with-hyphens
- Clicking ProductCard navigates to correct product detail page

**And** related products work:
- Show 4 related products from product.relatedProducts array
- If relatedProducts not defined, show 4 from same category (fallback)
- Clicking related product navigates to that product's detail page
- Related products use compact variant of ProductCard

**And** I can verify it works:
- Navigate to homepage, click any product → shows detail page
- Detail page shows all product info (name, price, description, specs)
- Breadcrumb shows correct path: Home > Category > Product
- Related products section shows 4 products
- Click related product → navigates to new detail page
- Try invalid URL /products/fake-slug → shows 404 page
- Browser back button from detail → returns to homepage with correct filter

**Prerequisites:** Story 5.1 (ProductDetail), Story 5.2 (Breadcrumb), Story 4.1 (ProductCard for related products), Story 3.2 (getProductBySlug, getRelatedProducts functions)

**Technical Notes:**
- Follow Architecture Section 8.1 (Routing & Navigation)
- Server Component (no 'use client' needed)
- Import getProductBySlug, getRelatedProducts from '@/lib/product-data'
- Import getAllCategories to map category ID to name for breadcrumb
- notFound() is imported from 'next/navigation'
- Create src/app/not-found.tsx per Architecture Section 8.1
- PRD Section 3.2 specifies product detail requirements
- Related products per PRD REQ-PD-006
- generateMetadata example:
  ```typescript
  export async function generateMetadata({ params }): Promise<Metadata> {
    const product = getProductBySlug(params.slug);
    return {
      title: `${product.name} - ecommerce-shop`,
      description: product.shortDescription,
    };
  }
  ```

---

## Epic 6: Navigation & Polish

**Goal:** Complete the application with header/footer navigation, loading states, error handling, and final polish to deliver a production-ready Phase 1 browsing experience.

**User Value:** Users have a complete, polished web application with professional navigation, helpful loading states, and graceful error handling.

**Covers FRs:** FR-NAV-1 (URL structure), FR-NAV-2 (browser back button), FR-NAV-3 (loading states), FR-HP-1 (header), NFR-PERF (performance)

---

### Story 6.1: Create Header and Footer Components

As a user,
I want consistent header and footer navigation on all pages,
So that I can easily navigate the site and access important information.

**Acceptance Criteria:**

**Given** the homepage and product detail pages exist (Epics 4-5 complete)
**When** I create header and footer components
**Then** src/components/layout/header.tsx exists with:
- Site logo/branding in top-left (text or image)
- Logo links to / (homepage)
- Navigation menu with categories (optional dropdown)
- Search bar placeholder (disabled, shows "Coming soon" on hover)
- Placeholder icons for cart and user menu (disabled, shows "Coming in Phase 2")
- Sticky header: sticky top-0 z-50 bg-white border-b
- Container: max-w-7xl mx-auto px-4
- Flexbox layout: justify-between items-center
- Proper height: h-16 or h-20

**And** header responsive behavior:
- Desktop: Full navigation, all items visible
- Tablet: Slightly condensed, icons may be smaller
- Mobile: Hamburger menu (optional Phase 1) or simplified nav
- Logo always visible and clickable

**And** src/components/layout/footer.tsx exists with:
- Container: max-w-7xl mx-auto px-4 py-8
- Background: bg-slate-100 (light gray)
- Three-column layout on desktop, stacked on mobile:
  - Column 1: About section (brief text about marketplace)
  - Column 2: Links (Browse Products, Categories - placeholder for now)
  - Column 3: Contact/Social (Email, social icons - placeholder)
- Copyright notice: "© 2025 ecommerce-shop. All rights reserved."
- Text color: text-slate-600
- Heading color: text-slate-900 font-semibold

**And** footer responsive behavior:
- Desktop: 3 columns (grid-cols-3)
- Tablet: 2 columns (md:grid-cols-2)
- Mobile: 1 column (stacked)
- Proper spacing: space-y-6 or gap-8

**And** semantic HTML:
- <header> element for header
- <footer> element for footer
- <nav> for navigation sections
- Proper heading hierarchy

**And** accessibility:
- Skip to main content link (visually hidden, visible on focus)
- aria-label="Main navigation" on header nav
- aria-label="Footer navigation" on footer nav
- All links have descriptive text or aria-labels

**And** I can verify it works:
- Header appears on all pages (homepage, product detail)
- Click logo → navigates to homepage
- Footer appears on all pages
- Header is sticky (stays at top when scrolling)
- Disabled search and cart icons show tooltip
- Mobile: Header and footer adapt to small screen

**Prerequisites:** None (standalone layout components)

**Technical Notes:**
- Follow Architecture Section 11.1 (Component Hierarchy) for Header/Footer
- Follow PRD REQ-HP-001 (header requirements)
- Use Next.js Link for logo and navigation links
- Placeholder cart icon: 🛒 or import from lucide-react
- Placeholder user icon: 👤 or import from lucide-react
- Search bar is input with disabled attribute and title="Coming soon"
- Header will be added to src/app/layout.tsx (Story 6.2)
- UX Design Section 6.1.5 specifies header structure

---

### Story 6.2: Update Root Layout with Header and Footer

As a user,
I want header and footer to appear consistently on every page,
So that I have a cohesive navigation experience throughout the site.

**Acceptance Criteria:**

**Given** Header and Footer components exist (Story 6.1 complete)
**When** I update the root layout
**Then** src/app/layout.tsx includes:
- Header component above {children}
- Footer component below {children}
- Proper structure:
  ```tsx
  <html>
    <body>
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  </html>
  ```

**And** HTML metadata is configured:
- Site title: "ecommerce-shop - Digital Products Marketplace"
- Meta description: "Browse and discover digital products including games, software, AI tools, and more."
- Favicon configured in /public
- Viewport meta tag for responsive design
- UTF-8 charset

**And** font optimization:
- Inter font imported via next/font/google
- Applied to body: className={inter.className}
- Font optimization enabled (Next.js automatic)

**And** proper semantic structure:
- <html lang="en">
- <body> with min-h-screen flex flex-col
- <main> with flex-1 to push footer to bottom
- Footer always at bottom even on short pages

**And** I can verify it works:
- Navigate to / → Header and Footer visible
- Navigate to /products/{slug} → Same Header and Footer
- Scroll down on long page → Header stays fixed at top (sticky)
- Short page (404) → Footer at bottom of viewport
- No layout shift when navigating between pages
- Console shows no hydration errors

**Prerequisites:** Story 6.1 (Header, Footer components)

**Technical Notes:**
- Follow Architecture Section 11.1 (Component Hierarchy)
- Import Header from '@/components/layout/header'
- Import Footer from '@/components/layout/footer'
- Import Inter font:
  ```typescript
  import { Inter } from 'next/font/google';
  const inter = Inter({ subsets: ['latin'] });
  ```
- Use flex-col and flex-1 for sticky footer layout
- metadata export for site-wide meta tags
- This is the root layout for all pages (App Router pattern)

---

### Story 6.3: Add Loading States and Error Boundaries

As a user,
I want helpful loading indicators and error messages when things go wrong,
So that I understand what's happening and can take action if needed.

**Acceptance Criteria:**

**Given** the application is functional (Epics 1-5 complete)
**When** I add loading and error handling
**Then** src/app/loading.tsx exists with:
- Loading spinner or skeleton screen
- Centered layout: flex items-center justify-center min-h-screen
- Spinner component (shadcn/ui or custom)
- Text: "Loading..." (optional, can be spinner only)
- Accessible: aria-label="Loading" on spinner

**And** src/app/error.tsx exists with:
- 'use client' directive (Error boundaries must be client components)
- Props: error (Error), reset (() => void)
- ErrorMessage component with error.message
- "Try again" button that calls reset()
- Centered layout with proper spacing
- Friendly user message (not raw error stack)

**And** src/app/not-found.tsx exists with:
- Custom 404 page
- Heading: "Product not found" or "Page not found"
- Message: "The product you're looking for doesn't exist or has been removed."
- "Browse Products" button linking to /
- Centered layout with proper spacing
- Optional: 404 illustration or icon

**And** ProductGrid shows loading skeletons:
- Already implemented in Story 4.2
- Verify it works correctly

**And** error handling in product detail:
- Invalid slug → calls notFound() → shows not-found.tsx
- Already implemented in Story 5.3
- Verify it works correctly

**And** I can verify loading/error states:
- Navigate to page → brief loading.tsx flash (if any)
- Navigate to /products/invalid-slug → shows 404 page
- Simulate error (throw error in component) → shows error.tsx with reset button
- Click "Try again" → reloads and attempts to recover
- Loading skeletons show when ProductGrid is loading

**Prerequisites:** Story 2.5 (ErrorMessage), Story 4.2 (ProductGrid with loading), Story 5.3 (404 handling)

**Technical Notes:**
- Follow Architecture Section 9 (Error Handling & Recovery)
- Follow Next.js App Router conventions for loading.tsx, error.tsx, not-found.tsx
- loading.tsx is shown during page transitions (Suspense boundaries)
- error.tsx catches errors in child components
- not-found.tsx triggered by notFound() function
- Use ErrorMessage component in error.tsx
- Loading spinner can use lucide-react Loader2 icon with spin animation
- Test error boundary by temporarily throwing error in a component

---

## FR Coverage Matrix

| Functional Requirement | Epic | Stories | Implementation Notes |
|------------------------|------|---------|---------------------|
| **FR-HP-1**: Site header with branding, navigation, search | Epic 6 | 6.1, 6.2 | Header component in root layout, search disabled Phase 1 |
| **FR-HP-2**: Hero section with featured banner | Epic 4 | 4.4 | HeroBanner component with Trust Blue gradient |
| **FR-HP-3**: Category-based filtering | Epic 4 | 4.3, 4.4 | CategoryFilter component with URL state |
| **FR-HP-4**: Responsive product grid | Epic 4 | 4.2, 4.4 | ProductGrid with 4/2/1 column layout |
| **FR-HP-5**: Comprehensive product card info | Epic 4 | 4.1 | ProductCard shows image, name, category, price, description |
| **FR-HP-6**: Product sorting (Optional) | - | Deferred | Not implemented in Phase 1 |
| **FR-PD-1**: Header and breadcrumb navigation | Epic 5, 6 | 5.2, 5.3, 6.1, 6.2 | Breadcrumb on detail page, Header in layout |
| **FR-PD-2**: Large product images | Epic 5 | 5.1, 5.3 | ProductImage in ProductDetail, 800x450px |
| **FR-PD-3**: Complete product information | Epic 5 | 5.1, 5.3 | ProductDetail shows all metadata |
| **FR-PD-4**: Disabled "Coming Soon" CTAs | Epic 5 | 5.1 | Disabled buttons with tooltip |
| **FR-PD-5**: Related products section | Epic 5 | 5.3 | Related products grid below detail |
| **FR-NAV-1**: Clean URL structure | Epic 4, 5 | 4.4, 5.3 | / for home, /?category={slug}, /products/{slug} |
| **FR-NAV-2**: Browser back button support | Epic 4 | 4.3, 4.4 | URL-based state management |
| **FR-NAV-3**: Loading states | Epic 4, 6 | 4.2, 6.3 | Skeleton screens, loading.tsx |
| **FR-SEARCH-1**: Search UI (Optional) | Epic 6 | 6.1 | Search bar placeholder in header, disabled |
| **FR-SEARCH-2**: Search functionality (Optional) | - | Deferred | Not implemented in Phase 1 |
| **NFR-PERF**: Performance < 2s | All Epics | All stories | Next.js optimization, images, static data |
| **NFR-RESP**: Responsive design | Epic 2, 4, 5, 6 | All stories | Mobile/tablet/desktop breakpoints |
| **NFR-A11Y**: WCAG AA accessibility | Epic 2 | All stories | shadcn/ui, semantic HTML, ARIA labels |
| **NFR-DESIGN**: Trust Blue theme | Epic 2 | 2.1, 2.2 | Tailwind config, shadcn/ui styling |

---

## Summary

**Epic Breakdown Complete!**

**Total Stories**: 18 implementable stories across 6 epics

**Epic Summary**:
- **Epic 1** (1 story): Foundation - Next.js project initialization
- **Epic 2** (5 stories): Design System - Trust Blue theme, shadcn/ui, reusable components
- **Epic 3** (2 stories): Product Data - TypeScript types, 24-product catalog
- **Epic 4** (4 stories): Homepage - Hero banner, category filter, product grid
- **Epic 5** (3 stories): Product Detail - Detail view, breadcrumbs, related products
- **Epic 6** (3 stories): Navigation & Polish - Header/footer, loading, error handling

**All Functional Requirements Covered**: Every FR from the PRD is mapped to specific stories with detailed acceptance criteria.

**Context Incorporated**:
- ✅ **PRD Requirements**: All functional and non-functional requirements covered
- ✅ **UX Design Patterns**: Trust Blue theme, responsive breakpoints, interaction patterns, accessibility
- ✅ **Architecture Decisions**: Next.js 14+, TypeScript, component structure, naming conventions, implementation patterns

**Ready for Implementation**: Each story includes:
- User story format (As a... I want... So that...)
- BDD-style acceptance criteria (Given/When/Then)
- Technical notes referencing Architecture sections
- Prerequisites showing story dependencies
- No forward dependencies (only backward references)

**Next Steps**:
1. Run **Implementation Readiness** workflow to validate cohesion
2. Begin **Sprint Planning** to prioritize and assign stories
3. Start implementation with Story 1.1 (Foundation)

---

_For implementation: Use the `dev-story` workflow to implement individual stories from this epic breakdown._

_This document incorporates PRD + UX Design + Architecture for complete implementation guidance._


