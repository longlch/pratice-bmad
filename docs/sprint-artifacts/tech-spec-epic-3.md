# Epic Technical Specification: Product Data & Type System

Date: 2025-12-01
Author: Winston (BMAD Architect)
Epic ID: epic-3
Status: Draft

---

## Overview

Epic 3 establishes the complete data foundation for the ecommerce-shop Phase 1 UI by defining TypeScript types and creating a realistic product catalog. This epic delivers the Product and Category type system, sample data for 24 digital products across 5 categories, and data access functions that enable all product browsing features in Epics 4-6.

This epic creates the "content layer" - the actual products users will browse. While Epic 1 created the technical foundation and Epic 2 built the UI components, Epic 3 provides the realistic data that makes the marketplace functional and demonstrates the product browsing experience.

**Success Criteria:** A developer can import `getAllProducts()` from `src/lib/product-data.ts`, receive 24 type-safe Product objects, and render them in any component without TypeScript errors. All products have compelling, realistic content suitable for demonstration.

---

## Objectives and Scope

**In Scope:**

- Product TypeScript interface with 13 fields (id, slug, name, category, price, descriptions, images, metadata)
- Category TypeScript interface (id, name, slug)
- Component prop interfaces for ProductCard, ProductGrid, CategoryFilter
- Sample product catalog with 24 digital products (JSON format)
  - 6-8 Games products
  - 6-8 Software products  
  - 4-6 AI Tools products
  - 4-6 Education products
  - 4-6 Entertainment products
- Category definitions for 6 categories (All, Games, Software, AI Tools, Education, Entertainment)
- Data loading functions (getAllProducts, getProductBySlug, getProductsByCategory, getRelatedProducts, searchProducts)
- Product content quality: realistic names, compelling descriptions, proper pricing
- Related products configuration (2-4 per product)
- Featured products designation (4-6 products marked as featured)
- Placeholder image paths configuration

**Out of Scope (Deferred to Later Epics or Phases):**

- Actual product images (placeholder URLs used in Phase 1)
- Backend API integration (Phase 2)
- Database schema (Phase 2)
- User-generated content (reviews, ratings) (Phase 3)
- Product inventory tracking (Phase 2)
- Dynamic pricing or discounts (Phase 3)
- Product search indexing (advanced search in Phase 2)
- Product categories taxonomy beyond 5 categories (Phase 2)

**Epic Boundaries:**

This epic stops after the data layer is complete and tested. Components should be able to import and use product data without errors. Epic 4 will consume this data to implement the homepage product grid and category filtering.

---

## System Architecture Alignment

This epic implements the architectural decisions from the Architecture Document (architecture.md):

**Section 3: Data Architecture**
- Implements Section 3.1: Product Data Model (JSON structure with all 13 fields)
- Implements Section 3.2: Category Data Model (6-category structure)
- Implements Section 3.3: Data Loading Functions (product-data.ts with all helper functions)

**Section 4: TypeScript Type System**
- Implements Section 4.1: Core Types (Product and Category interfaces)
- Implements Section 4.2: Component Props (ProductCardProps, ProductGridProps, etc.)
- Implements Section 4.2: Type Safety Guidelines (strict typing, no `any`)

**Section 5: Naming Conventions**
- Implements Section 5.3: Slug Format (lowercase-with-hyphens for all product slugs)
- Follows Section 5.1: File Naming (kebab-case: product.ts, product-data.ts, component-props.ts)

**PRD Alignment:**
- Fulfills Section 7.1: Product Categories (exactly 5 categories as specified)
- Fulfills Section 7.2: Product Content Guidelines (24 products with realistic content)
- Fulfills Section 3.1.2 REQ-HP-008: Sample Products (12-24 diverse products with varied pricing)

**Architectural Constraints:**

1. **Must use JSON files for data storage** - Phase 1 has no backend, static JSON is correct choice
2. **Must provide type-safe data loading functions** - No `any` types, all functions must return typed data
3. **Product IDs must follow `prod_XXX` format** - Enables future migration to database auto-increment IDs
4. **Slugs must be URL-safe** - lowercase-with-hyphens, no spaces or special characters
5. **Related products must reference IDs, not nested objects** - Prevents circular JSON issues

**Why These Choices:**

- **Static JSON:** Simplest Phase 1 implementation, easily replaced with API calls in Phase 2 without changing component interfaces
- **TypeScript interfaces:** Catch data structure errors at compile time, provide autocomplete for developers/AI agents
- **Centralized data functions:** Single source of truth for data access, makes Phase 2 migration to API straightforward
- **Realistic content:** Demonstrates product quality standards, serves as template for future content entry
- **ID-based relationships:** Simplifies JSON structure, matches standard relational database patterns for Phase 2 migration

---

## Detailed Design

### Services and Modules

This epic creates the data layer and type system:

| Module | Responsibility | Location | Dependencies |
|--------|---------------|----------|--------------|
| **Product Types** | TypeScript interfaces for Product, Category | `src/types/product.ts` | None |
| **Component Props** | TypeScript interfaces for component props | `src/types/component-props.ts` | product.ts |
| **Product Data** | JSON catalog of 24 products | `src/data/products.json` | None |
| **Category Data** | JSON list of 6 categories | `src/data/categories.json` | None |
| **Data Access Layer** | Helper functions for loading/filtering products | `src/lib/product-data.ts` | product.ts, JSON files |

**Module Dependencies:**

```
src/types/product.ts (no dependencies)
    ↓
src/types/component-props.ts (imports Product, Category)
    ↓
src/data/products.json (conforms to Product interface)
src/data/categories.json (conforms to Category interface)
    ↓
src/lib/product-data.ts (imports types, reads JSON files)
    ↓
[Components in Epic 4+] (import data functions)
```

**Data Flow:**

```
JSON Files (products.json, categories.json)
    ↓
Data Access Functions (product-data.ts)
    ↓
Components (ProductCard, ProductGrid, CategoryFilter)
    ↓
User Interface (rendered products)
```

**Phase 2 Migration Path:**

```typescript
// Phase 1: Static JSON
import productsData from '@/data/products.json';

// Phase 2: API calls (same function signature)
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  return res.json();
}

// Components don't change - same import, same usage
```

---

### Data Models

#### Product Interface

**File:** `src/types/product.ts`

```typescript
/**
 * Product represents a digital product in the marketplace.
 * Used for all product displays: cards, grids, detail pages.
 */
export interface Product {
  /** Unique identifier. Format: "prod_001", "prod_002", etc. */
  id: string;
  
  /** URL-friendly identifier for routing. Format: lowercase-with-hyphens. */
  slug: string;
  
  /** Display name shown to users. Max 100 characters. */
  name: string;
  
  /** Category identifier. Must match a Category.id from categories.json. */
  category: string;
  
  /** Price in USD. Use number type for calculations, not string. */
  price: number;
  
  /** Brief 1-2 sentence description for product cards. */
  shortDescription: string;
  
  /** Full multi-paragraph description for product detail pages. */
  description: string;
  
  /** Primary product image path. Format: "/images/products/{slug}.jpg" */
  image: string;
  
  /** Additional product images for gallery view (optional). */
  images?: string[];
  
  /** Platform compatibility info (optional). Example: "Windows, Mac, Web" */
  platform?: string;
  
  /** How product is delivered (optional). Example: "Email", "Account Dashboard" */
  deliveryMethod?: string;
  
  /** Expected delivery timeframe (optional). Example: "Instant", "Within 24 hours" */
  deliveryTime?: string;
  
  /** Whether product should appear in featured section (optional). */
  featured?: boolean;
  
  /** Array of related product IDs for "You might also like" section (optional). */
  relatedProducts?: string[];
}
```

**Field Validation Rules:**

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| id | string | Yes | Format: `prod_\d{3}` | "prod_001" |
| slug | string | Yes | lowercase-with-hyphens, no spaces | "premium-game-pass" |
| name | string | Yes | Max 100 chars | "Premium Game Pass" |
| category | string | Yes | Must match Category.id | "games" |
| price | number | Yes | > 0, max 2 decimals | 49.99 |
| shortDescription | string | Yes | 1-2 sentences, ~50-150 chars | "Access to 100+ premium games instantly." |
| description | string | Yes | Multi-paragraph, ~300-800 chars | (See sample products) |
| image | string | Yes | Valid path | "/images/products/premium-game-pass.jpg" |
| images | string[] | No | Array of valid paths | ["/images/products/..."] |
| platform | string | No | Free text | "Windows, Mac, Web" |
| deliveryMethod | string | No | Free text | "Email" |
| deliveryTime | string | No | Free text | "Instant" |
| featured | boolean | No | true or undefined | true |
| relatedProducts | string[] | No | Array of valid product IDs | ["prod_002", "prod_003"] |

---

#### Category Interface

**File:** `src/types/product.ts`

```typescript
/**
 * Category represents a product category for filtering.
 * Used in category filter component and product organization.
 */
export interface Category {
  /** Unique identifier. Used for filtering. Example: "games", "software" */
  id: string;
  
  /** Display name shown to users. Example: "Games", "Software" */
  name: string;
  
  /** URL parameter value. Should match id for simplicity. Example: "games" */
  slug: string;
}
```

**Category Definitions (Fixed Set for Phase 1):**

| ID | Name | Slug | Purpose |
|----|------|------|---------|
| all | All Products | all | Default view, shows all products |
| games | Games | games | Game keys, subscriptions, passes |
| software | Software | software | Productivity, design, dev tools |
| ai-tools | AI Tools | ai-tools | AI services, subscriptions |
| education | Education | education | Courses, learning platforms |
| entertainment | Entertainment | entertainment | Streaming, music services |

---

#### Component Prop Interfaces

**File:** `src/types/component-props.ts`

```typescript
import { Product, Category } from './product';

/**
 * Props for ProductCard component (Epic 4)
 */
export interface ProductCardProps {
  /** Product to display */
  product: Product;
  
  /** Display variant for different contexts */
  variant?: 'standard' | 'compact' | 'featured';
  
  /** Click handler (optional, defaults to navigate to detail page) */
  onClick?: () => void;
}

/**
 * Props for ProductGrid component (Epic 4)
 */
export interface ProductGridProps {
  /** Array of products to display in grid */
  products: Product[];
  
  /** Whether data is currently loading */
  loading?: boolean;
  
  /** Message to show when products array is empty */
  emptyMessage?: string;
}

/**
 * Props for CategoryFilter component (Epic 4)
 */
export interface CategoryFilterProps {
  /** Available categories for filtering */
  categories: Category[];
  
  /** Currently active/selected category slug */
  activeCategory: string;
  
  /** Callback when user selects a different category */
  onCategoryChange: (categorySlug: string) => void;
  
  /** Optional product count per category for badges */
  productCounts?: Record<string, number>;
}

/**
 * Props for ProductImage component (Epic 2, Story 2.4)
 * Defined here for reference, may already exist
 */
export interface ProductImageProps {
  /** Image source URL */
  src: string;
  
  /** Alt text for accessibility */
  alt: string;
  
  /** Product category for fallback color */
  category?: string;
  
  /** Image aspect ratio */
  aspectRatio?: '16/9' | '1/1' | '4/3';
}

/**
 * Props for PriceDisplay component (Epic 2, Story 2.3)
 * Defined here for reference, may already exist
 */
export interface PriceDisplayProps {
  /** Price amount (USD) */
  amount: number;
  
  /** Currency symbol to display */
  currency?: 'USD' | 'EUR' | 'GBP';
  
  /** Display size variant */
  size?: 'small' | 'large' | 'xlarge';
}

/**
 * Props for ErrorMessage component (Epic 2, Story 2.5)
 * Defined here for reference, may already exist
 */
export interface ErrorMessageProps {
  /** User-friendly error message */
  message: string;
  
  /** Optional retry callback */
  onRetry?: () => void;
  
  /** Additional CSS classes */
  className?: string;
}
```

---

### Data Access Layer

**File:** `src/lib/product-data.ts`

```typescript
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { Product, Category } from '@/types/product';

/**
 * Get all products from the catalog.
 * @returns Array of all products
 */
export function getAllProducts(): Product[] {
  return productsData as Product[];
}

/**
 * Get a single product by its slug.
 * @param slug - URL-friendly product identifier
 * @returns Product if found, undefined otherwise
 */
export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find(p => p.slug === slug);
}

/**
 * Get all products in a specific category.
 * @param categorySlug - Category identifier ('all' returns all products)
 * @returns Array of products matching category
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'all') {
    return getAllProducts();
  }
  return productsData.filter(p => p.category === categorySlug);
}

/**
 * Get related products for a given product.
 * Falls back to same-category products if no explicit relations defined.
 * @param productId - Product ID to find relations for
 * @param limit - Maximum number of related products (default 4)
 * @returns Array of related products
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = productsData.find(p => p.id === productId);
  
  if (!product) {
    return [];
  }
  
  // If product has explicit related products, use those
  if (product.relatedProducts && product.relatedProducts.length > 0) {
    return product.relatedProducts
      .map(id => productsData.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, limit);
  }
  
  // Fallback: return other products from same category
  return productsData
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}

/**
 * Get all product categories.
 * @returns Array of all categories
 */
export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

/**
 * Search products by name or description.
 * Case-insensitive search across name, shortDescription, and description fields.
 * @param query - Search query string
 * @returns Array of products matching search query
 */
export function searchProducts(query: string): Product[] {
  if (!query || query.trim() === '') {
    return getAllProducts();
  }
  
  const lowercaseQuery = query.toLowerCase().trim();
  
  return productsData.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Get count of products per category.
 * Useful for CategoryFilter badge display.
 * @returns Object mapping category slug to product count
 */
export function getProductCountsByCategory(): Record<string, number> {
  const counts: Record<string, number> = { all: productsData.length };
  
  categoriesData.forEach(category => {
    if (category.id !== 'all') {
      counts[category.slug] = productsData.filter(p => p.category === category.id).length;
    }
  });
  
  return counts;
}
```

**Function Testing Checklist:**

- ✅ `getAllProducts()` returns 24 products
- ✅ `getProductBySlug('premium-game-pass')` returns correct product
- ✅ `getProductBySlug('nonexistent')` returns undefined
- ✅ `getProductsByCategory('all')` returns all 24 products
- ✅ `getProductsByCategory('games')` returns 6-8 game products
- ✅ `getRelatedProducts('prod_001', 4)` returns 4 related products
- ✅ `getAllCategories()` returns 6 categories
- ✅ `searchProducts('game')` returns products with "game" in name/description
- ✅ `searchProducts('')` returns all products
- ✅ `getProductCountsByCategory()` returns correct counts per category

---

## Implementation Details

### Story 3.1: Define TypeScript Types for Product Domain

**Implementation Steps:**

1. **Create `src/types/product.ts`:**
   - Define Product interface with 13 fields
   - Add JSDoc comments for each field with format examples
   - Define Category interface with 3 fields
   - Export both interfaces

2. **Create/Update `src/types/component-props.ts`:**
   - Import Product and Category from product.ts
   - Define ProductCardProps interface
   - Define ProductGridProps interface
   - Define CategoryFilterProps interface
   - Add/verify ProductImageProps (may exist from Story 2.4)
   - Add/verify PriceDisplayProps (may exist from Story 2.3)
   - Add/verify ErrorMessageProps (may exist from Story 2.5)

3. **Verify TypeScript compilation:**
   - Run `npm run build` or `tsc --noEmit`
   - Ensure no TypeScript errors
   - Verify types are exported correctly

**Acceptance Criteria Verification:**

```typescript
// Test type imports
import { Product, Category } from '@/types/product';
import { ProductCardProps } from '@/types/component-props';

// Test Product type validation
const validProduct: Product = {
  id: "prod_001",
  slug: "test-product",
  name: "Test Product",
  category: "games",
  price: 49.99,
  shortDescription: "Short description",
  description: "Long description",
  image: "/images/products/test.jpg",
};

// TypeScript should error on invalid product
const invalidProduct: Product = {
  id: "prod_001",
  // Missing required fields - TypeScript error expected
};

// Test autocomplete in VS Code
validProduct. // Should show all Product fields with autocomplete
```

---

### Story 3.2: Create Sample Product Catalog with 24 Products

**Implementation Steps:**

1. **Create `src/data/categories.json`:**
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

2. **Create `src/data/products.json` with 24 products:**
   
   **Category Distribution:**
   - Games: 8 products (prod_001 - prod_008)
   - Software: 7 products (prod_009 - prod_015)
   - AI Tools: 4 products (prod_016 - prod_019)
   - Education: 3 products (prod_020 - prod_022)
   - Entertainment: 2 products (prod_023 - prod_024)
   - **Total: 24 products**

   **Featured Products (6 total):**
   - prod_001 (Games - Premium Game Pass)
   - prod_006 (Games - Gaming Subscription)
   - prod_009 (Software - Adobe Creative Cloud)
   - prod_016 (AI Tools - ChatGPT Plus)
   - prod_020 (Education - Coursera Plus)
   - prod_023 (Entertainment - Spotify Premium)

   **Product Template Example:**
   ```json
   {
     "id": "prod_001",
     "slug": "premium-game-pass",
     "name": "Premium Game Pass - 12 Month Subscription",
     "category": "games",
     "price": 119.99,
     "shortDescription": "Access over 100 high-quality PC and console games with day-one releases.",
     "description": "Transform your gaming experience with Premium Game Pass. Get unlimited access to a growing library of over 100 high-quality games, including day-one releases from major publishers.\n\nWhat's Included:\n• 12 months of full access to Premium Game Pass library\n• Day-one access to new releases from Xbox Game Studios and partners\n• EA Play membership included\n• Cross-platform play on PC and console\n• Cloud gaming on mobile and tablets\n• Exclusive member discounts up to 20% off games in the library\n\nPerfect For: Gamers who want variety and value. Instead of buying individual games at $60-70 each, get access to hundreds of titles for one low monthly rate.\n\nHow It Works: After purchase, you'll receive a 25-character activation code via email within 5 minutes. Redeem at account.microsoft.com/redeem to activate your subscription instantly.",
     "image": "/images/products/premium-game-pass.jpg",
     "platform": "PC, Xbox, Cloud (Mobile/Tablet)",
     "deliveryMethod": "Email (25-character code)",
     "deliveryTime": "Instant (within 5 minutes)",
     "featured": true,
     "relatedProducts": ["prod_002", "prod_003", "prod_007"]
   }
   ```

3. **Create `src/lib/product-data.ts`:**
   - Implement all 7 data access functions
   - Import JSON files and type definitions
   - Add JSDoc comments for each function
   - Ensure TypeScript type safety (no `as any`)

4. **Generate Realistic Product Content:**
   
   **Content Guidelines (from PRD Section 7.2):**
   - Professional tone, no Lorem Ipsum
   - Product names: 50-100 characters, descriptive
   - Short descriptions: 1-2 sentences, 50-150 characters
   - Full descriptions: 3-5 paragraphs, 300-800 characters covering:
     - What it is (1 paragraph)
     - Key features (bullet list as text)
     - Who it's for (1 paragraph)
     - What's included (bullet list or paragraph)
     - How it works / activation process (1 paragraph)
   - Price range: $5 - $200 (varied to show pricing diversity)
   
   **Related Products Logic:**
   - Each product has 2-4 related product IDs
   - Related products are from same or complementary categories
   - Example: Game Pass relates to individual game keys and gaming accessories
   - Example: ChatGPT Plus relates to Midjourney, Notion AI, other AI tools

5. **Placeholder Images Configuration:**
   - Use format: `https://placehold.co/800x450/2563eb/ffffff?text={Product+Name}`
   - Example: `https://placehold.co/800x450/2563eb/ffffff?text=Premium+Game+Pass`
   - Trust Blue background (#2563eb) with white text
   - 16:9 aspect ratio (800x450)
   - Can be replaced with real images later without code changes

**Product Catalog Sample (Abbreviated):**

```json
[
  {
    "id": "prod_001",
    "slug": "premium-game-pass",
    "name": "Premium Game Pass - 12 Month Subscription",
    "category": "games",
    "price": 119.99,
    "shortDescription": "Access over 100 high-quality PC and console games with day-one releases.",
    "description": "...",
    "image": "/images/products/premium-game-pass.jpg",
    "platform": "PC, Xbox, Cloud",
    "deliveryMethod": "Email",
    "deliveryTime": "Instant",
    "featured": true,
    "relatedProducts": ["prod_002", "prod_003", "prod_007"]
  },
  {
    "id": "prod_002",
    "slug": "steam-gift-card-50",
    "name": "Steam Gift Card - $50 USD",
    "category": "games",
    "price": 50.00,
    "shortDescription": "Add $50 to your Steam Wallet to purchase games, DLC, and in-game items.",
    "description": "...",
    "image": "/images/products/steam-gift-card-50.jpg",
    "platform": "PC (Steam)",
    "deliveryMethod": "Email",
    "deliveryTime": "Within 5 minutes",
    "relatedProducts": ["prod_001", "prod_003", "prod_004"]
  }
  // ... 22 more products
]
```

**Acceptance Criteria Verification:**

```typescript
// Test data loading functions
import { getAllProducts, getProductBySlug, getProductsByCategory } from '@/lib/product-data';

// Verify 24 products exist
const allProducts = getAllProducts();
console.assert(allProducts.length === 24, "Should have exactly 24 products");

// Verify category distribution
const gamesProducts = getProductsByCategory('games');
console.assert(gamesProducts.length >= 6 && gamesProducts.length <= 8, "Should have 6-8 games");

// Verify specific product
const gamePass = getProductBySlug('premium-game-pass');
console.assert(gamePass !== undefined, "Premium Game Pass should exist");
console.assert(gamePass?.id === "prod_001", "Product ID should match");
console.assert(gamePass?.price === 119.99, "Price should be correct");

// Verify featured products
const featuredProducts = allProducts.filter(p => p.featured === true);
console.assert(featuredProducts.length >= 4 && featuredProducts.length <= 6, "Should have 4-6 featured");

// Verify no duplicate IDs
const ids = allProducts.map(p => p.id);
const uniqueIds = new Set(ids);
console.assert(ids.length === uniqueIds.size, "All product IDs should be unique");

// Verify all categories are valid
const validCategories = ['games', 'software', 'ai-tools', 'education', 'entertainment'];
allProducts.forEach(p => {
  console.assert(validCategories.includes(p.category), `Invalid category: ${p.category}`);
});
```

---

## Technical Decisions

### Decision 1: Use Static JSON vs. Hardcoded Arrays

**Options Considered:**
1. Hardcode product arrays directly in product-data.ts
2. Use JSON files imported at build time (selected)
3. Use external JSON API (Phase 2)

**Selected: JSON files** (`src/data/products.json`, `src/data/categories.json`)

**Rationale:**
- ✅ Separates data from code (easier for non-developers to update content)
- ✅ Can be edited without TypeScript recompilation
- ✅ JSON structure matches future API response format (easy Phase 2 migration)
- ✅ Standard Next.js pattern for static data
- ✅ Can be validated against TypeScript interfaces

**Trade-offs:**
- Slightly less type safety than hardcoded (but we cast to types in data functions)
- Need to ensure JSON structure matches TypeScript interfaces manually

---

### Decision 2: Related Products - IDs vs. Nested Objects

**Options Considered:**
1. Store full Product objects in relatedProducts array (nested objects)
2. Store product IDs and look up objects at runtime (selected)

**Selected: Product IDs** (`relatedProducts: ["prod_002", "prod_003"]`)

**Rationale:**
- ✅ Avoids circular JSON structure issues
- ✅ Matches relational database foreign key pattern (easier Phase 2 migration)
- ✅ Smaller JSON file size (no duplicate product data)
- ✅ Single source of truth for product data
- ✅ Easy to update related products without duplicating changes

**Trade-offs:**
- Requires lookup function (`getRelatedProducts()`) to resolve IDs to Products
- Slightly more complex data access (but function abstracts this)

---

### Decision 3: Placeholder Image Strategy

**Options Considered:**
1. Use placehold.co URLs directly in JSON
2. Use local paths and create actual placeholder files
3. Use Next.js image placeholders

**Selected: Local paths** (`/images/products/{slug}.jpg`) with future replacement plan

**Rationale:**
- ✅ Consistent with production image structure
- ✅ No external dependencies (placehold.co could go down)
- ✅ Can replace with real images without changing JSON
- ✅ Works with Next.js Image optimization

**Implementation Note:**
- For Phase 1 demo, can use placehold.co as fallback in ProductImage component
- For production, replace with actual product images
- Path structure supports this migration seamlessly

---

### Decision 4: Price Data Type - Number vs. String

**Options Considered:**
1. Store prices as strings ("$49.99")
2. Store prices as numbers (49.99) (selected)

**Selected: Number type** (`"price": 49.99`)

**Rationale:**
- ✅ Enables mathematical operations (sorting, filtering by price range)
- ✅ Formatting is presentation concern (handled by PriceDisplay component)
- ✅ Standard for APIs and databases
- ✅ TypeScript type safety for numeric operations

**Trade-offs:**
- Need PriceDisplay component to format consistently (already exists from Story 2.3)

---

## Testing Strategy

### Story 3.1: TypeScript Types Testing

**Type Safety Tests:**

```typescript
// Test 1: Valid product compiles
const validProduct: Product = {
  id: "prod_test",
  slug: "test-product",
  name: "Test Product",
  category: "games",
  price: 19.99,
  shortDescription: "Test",
  description: "Test description",
  image: "/test.jpg"
};

// Test 2: Invalid product causes TypeScript error
const invalidProduct: Product = {
  id: "prod_test",
  slug: "test",
  price: "invalid" // TypeScript error: Type 'string' is not assignable to type 'number'
};

// Test 3: Optional fields work
const minimalProduct: Product = {
  id: "prod_minimal",
  slug: "minimal",
  name: "Minimal",
  category: "games",
  price: 9.99,
  shortDescription: "Min",
  description: "Minimal",
  image: "/min.jpg"
  // No optional fields - should compile
};
```

**Manual Verification:**
- Open VS Code or IDE
- Create new .ts file importing Product type
- Type `const p: Product = {` and verify autocomplete shows all fields
- Try assigning wrong type to a field, verify TypeScript shows error
- Verify JSDoc comments appear in autocomplete hints

---

### Story 3.2: Product Catalog Data Testing

**Data Integrity Tests:**

```typescript
import { getAllProducts, getProductsByCategory, getAllCategories } from '@/lib/product-data';

// Test Suite
describe('Product Data Integrity', () => {
  test('has exactly 24 products', () => {
    const products = getAllProducts();
    expect(products.length).toBe(24);
  });

  test('all products have valid required fields', () => {
    const products = getAllProducts();
    products.forEach(p => {
      expect(p.id).toMatch(/^prod_\d{3}$/);
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.shortDescription).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.image).toBeTruthy();
    });
  });

  test('no duplicate IDs', () => {
    const products = getAllProducts();
    const ids = products.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  test('no duplicate slugs', () => {
    const products = getAllProducts();
    const slugs = products.map(p => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  test('all categories are valid', () => {
    const products = getAllProducts();
    const validCategories = ['games', 'software', 'ai-tools', 'education', 'entertainment'];
    products.forEach(p => {
      expect(validCategories).toContain(p.category);
    });
  });

  test('category distribution is correct', () => {
    const games = getProductsByCategory('games');
    const software = getProductsByCategory('software');
    const aiTools = getProductsByCategory('ai-tools');
    
    expect(games.length).toBeGreaterThanOrEqual(6);
    expect(games.length).toBeLessThanOrEqual(8);
    expect(software.length).toBeGreaterThanOrEqual(6);
    expect(software.length).toBeLessThanOrEqual(8);
    expect(aiTools.length).toBeGreaterThanOrEqual(4);
    expect(aiTools.length).toBeLessThanOrEqual(6);
  });

  test('has 4-6 featured products', () => {
    const products = getAllProducts();
    const featured = products.filter(p => p.featured === true);
    expect(featured.length).toBeGreaterThanOrEqual(4);
    expect(featured.length).toBeLessThanOrEqual(6);
  });

  test('related products reference valid IDs', () => {
    const products = getAllProducts();
    const allIds = new Set(products.map(p => p.id));
    
    products.forEach(p => {
      if (p.relatedProducts) {
        p.relatedProducts.forEach(relatedId => {
          expect(allIds.has(relatedId)).toBe(true);
        });
      }
    });
  });

  test('getProductBySlug returns correct product', () => {
    const product = getProductBySlug('premium-game-pass');
    expect(product).toBeDefined();
    expect(product?.id).toBe('prod_001');
  });

  test('searchProducts works', () => {
    const results = searchProducts('game');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(p => {
      const matchesQuery = 
        p.name.toLowerCase().includes('game') ||
        p.shortDescription.toLowerCase().includes('game') ||
        p.description.toLowerCase().includes('game');
      expect(matchesQuery).toBe(true);
    });
  });
});
```

**Manual Testing Checklist:**

- [ ] Import getAllProducts() in a test component → returns 24 products
- [ ] Import getProductsByCategory('games') → returns 6-8 game products
- [ ] Import getProductBySlug('premium-game-pass') → returns correct product
- [ ] Verify all products have realistic, professional content (no Lorem Ipsum)
- [ ] Verify prices are varied ($5 - $200 range)
- [ ] Verify featured products are from different categories
- [ ] Verify each product has 2-4 related products
- [ ] Verify product descriptions are 3-5 paragraphs with detailed content
- [ ] Run `npm run build` → no TypeScript errors
- [ ] Check console for any import errors

---

## Dependencies and Prerequisites

### Epic Dependencies

**Must Complete Before Starting Epic 3:**
- ✅ **Epic 1 (Foundation):** Project structure must exist
  - `src/types/` directory created
  - `src/data/` directory created
  - `src/lib/` directory created
  - TypeScript configuration working
  - Path aliases (@/types, @/lib, @/data) configured

**Optional But Helpful:**
- ⚠️ **Epic 2 (Design System):** Some component prop types may already exist
  - If Story 2.3 complete: PriceDisplayProps may exist in component-props.ts
  - If Story 2.4 complete: ProductImageProps may exist in component-props.ts
  - If Story 2.5 complete: ErrorMessageProps may exist in component-props.ts
  - **Action:** Check if component-props.ts exists before creating, merge types if needed

**Epics That Depend on Epic 3:**
- ⏳ **Epic 4 (Homepage Product Listing):** ALL stories require Product and Category types
  - Story 4.1: ProductCard needs Product type and ProductCardProps
  - Story 4.2: ProductGrid needs Product[] and ProductGridProps
  - Story 4.3: CategoryFilter needs Category type and CategoryFilterProps
  - Story 4.4: Homepage needs getAllProducts(), getProductsByCategory()
- ⏳ **Epic 5 (Product Detail Pages):** ALL stories require Product data
  - Story 5.1: ProductDetail component needs Product type
  - Story 5.3: Product detail page needs getProductBySlug(), getRelatedProducts()
- ⏳ **Epic 6 (Navigation & Polish):** Loading states need Product data for testing

**Risk:** If Epic 3 is delayed or incomplete, Epics 4-6 are completely blocked. This is the critical path.

---

### Story Dependencies

#### Story 3.1: Define TypeScript Types

**Prerequisites:**
- Epic 1 Story 1.1 complete (project initialization)
- `src/types/` directory exists
- TypeScript configuration working

**Blocks:**
- Story 3.2 (needs Product interface to structure JSON)
- All Epic 4 stories (need types for components)
- All Epic 5 stories (need types for product detail)

**Estimated Duration:** 1 hour (small story, mostly typing)

---

#### Story 3.2: Create Sample Product Catalog

**Prerequisites:**
- Story 3.1 complete (need Product and Category interfaces)
- `src/data/` directory exists
- `src/lib/` directory exists

**Blocks:**
- All Epic 4 stories (need actual products to display)
- All Epic 5 stories (need products for detail pages)

**Estimated Duration:** 3-4 hours (content creation is time-consuming)

**Content Creation Breakdown:**
- 24 products × 10 minutes each = 4 hours for quality content
- Can be parallelized (multiple people write different category products)
- Can use AI assistance for initial drafts, then human review

---

## Risks and Mitigations

### Risk 1: Content Quality - Poor Product Descriptions

**Risk Level:** Medium  
**Impact:** High (affects demo quality and sets wrong content standards)

**Scenario:** AI agents or developers write low-quality product descriptions with placeholder text, generic features, or unprofessional tone.

**Mitigation:**
1. Provide detailed content guidelines in Story 3.2 acceptance criteria
2. Include 2-3 complete product examples as templates
3. Review all 24 products before marking story complete
4. Checklist: No Lorem Ipsum, no "TODO", no placeholder text
5. Content quality gate: each product reviewed by PM or human reviewer

**Success Criteria:** All 24 products have realistic, compelling content that could be used in production.

---

### Risk 2: TypeScript Type Mismatches

**Risk Level:** Low  
**Impact:** Medium (causes runtime errors despite TypeScript)

**Scenario:** JSON data doesn't match TypeScript interfaces (e.g., price as string instead of number, missing required fields).

**Mitigation:**
1. Use JSON Schema validation or write validation function
2. Test data loading functions with TypeScript strict mode
3. Create test component that imports and renders all 24 products
4. Build-time validation: `npm run build` should catch type errors
5. Consider using Zod or similar runtime validation library (optional Phase 2)

**Detection:** 
```typescript
// Validation function
function validateProduct(p: any): p is Product {
  return typeof p.id === 'string' &&
         typeof p.slug === 'string' &&
         typeof p.price === 'number' &&
         // ... all required fields
}

const products = getAllProducts();
products.forEach(p => {
  if (!validateProduct(p)) {
    console.error('Invalid product:', p);
  }
});
```

---

### Risk 3: Placeholder Images Breaking Layout

**Risk Level:** Low  
**Impact:** Low (visual only, doesn't break functionality)

**Scenario:** Placeholder image URLs return 404 or have wrong aspect ratios, breaking ProductCard/ProductImage layouts.

**Mitigation:**
1. Use consistent placeholder URL pattern with correct dimensions
2. ProductImage component should handle missing images gracefully
3. Consider using Next.js Image component with fallback
4. Test with network throttling to ensure placeholder experience is good

**Future Fix:** Epic 6 story or Phase 2 can replace all placeholders with real images without changing JSON structure.

---

### Risk 4: Related Products Circular References

**Risk Level:** Low  
**Impact:** Low (affects "You might also like" section quality)

**Scenario:** Related products create circular loops (A → B → A) or dead-end references (product references non-existent ID).

**Mitigation:**
1. Validate all relatedProducts IDs exist in products.json
2. Write test: `relatedProducts.forEach(id => expect(allIds).toContain(id))`
3. Document that circular references are OK (A → B → A is fine, just shows related products bidirectionally)
4. Ensure getRelatedProducts() has fallback to same-category products if relations missing

**Test:**
```typescript
const products = getAllProducts();
const allIds = new Set(products.map(p => p.id));

products.forEach(p => {
  if (p.relatedProducts) {
    p.relatedProducts.forEach(relatedId => {
      if (!allIds.has(relatedId)) {
        console.error(`Product ${p.id} references non-existent related product: ${relatedId}`);
      }
    });
  }
});
```

---

## Success Metrics

### Story 3.1 Success Metrics

**Technical Metrics:**
- ✅ `npm run build` completes with 0 TypeScript errors
- ✅ All types exported correctly (can import in other files)
- ✅ VS Code autocomplete works for all Product fields
- ✅ No `any` types in product.ts or component-props.ts

**Quality Metrics:**
- ✅ All fields have JSDoc comments
- ✅ Product interface has 13 fields (11 required + 2 optional metadata + 2 optional arrays)
- ✅ Category interface has 3 fields
- ✅ 6 component prop interfaces defined

**Time Metric:**
- ⏱️ Story completed in < 2 hours (small typing task)

---

### Story 3.2 Success Metrics

**Data Metrics:**
- ✅ Exactly 24 products in products.json
- ✅ Category distribution: 6-8 games, 6-8 software, 4-6 AI tools, 4-6 education, 4-6 entertainment
- ✅ 4-6 products marked as featured
- ✅ All 24 products have 2-4 related products
- ✅ Price range: $5 - $200 with variety
- ✅ 0 duplicate IDs
- ✅ 0 duplicate slugs

**Content Quality Metrics:**
- ✅ 0 products with Lorem Ipsum or placeholder text
- ✅ 0 products with "TODO" or "TBD" content
- ✅ All descriptions are 300-800 characters (3-5 paragraphs)
- ✅ All short descriptions are 50-150 characters (1-2 sentences)
- ✅ Professional tone throughout (human review)

**Technical Metrics:**
- ✅ All 7 data access functions work correctly
- ✅ TypeScript compilation succeeds
- ✅ All relatedProducts IDs reference valid products (0 broken references)
- ✅ All category references are valid (no orphaned products)

**Functional Metrics:**
- ✅ `getAllProducts()` returns 24 products
- ✅ `getProductsByCategory('games')` returns correct subset
- ✅ `getProductBySlug('premium-game-pass')` returns correct product
- ✅ `searchProducts('game')` returns relevant results
- ✅ `getRelatedProducts('prod_001')` returns 4 valid products

**Time Metric:**
- ⏱️ Story completed in < 4 hours (content creation)

---

### Epic 3 Overall Success

**Completion Criteria:**
- Both stories (3.1 and 3.2) marked as "done" in sprint-status.yaml
- All acceptance criteria met for both stories
- All tests pass (manual verification checklist complete)
- Epic 4 can begin immediately without blockers

**Demonstration:**
- Developer can create test page that imports getAllProducts() and renders product names
- No TypeScript errors when building project
- All 24 products display correctly
- Product data quality reviewed and approved by PM/stakeholder

---

## Phase 2 Migration Path

Epic 3 is designed for easy migration from static JSON to dynamic API in Phase 2:

### Migration Steps

**Current (Phase 1):**
```typescript
// src/lib/product-data.ts
import productsData from '@/data/products.json';

export function getAllProducts(): Product[] {
  return productsData as Product[];
}
```

**Future (Phase 2):**
```typescript
// src/lib/product-data.ts - SAME FILE, DIFFERENT IMPLEMENTATION

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
```

**Component Changes Required:** 
- Change from synchronous to async/await in Server Components
- Add loading states in Client Components
- **No changes to Product interface or component props**

**Database Schema (Phase 2):**
```sql
CREATE TABLE products (
  id VARCHAR(20) PRIMARY KEY,        -- prod_001, prod_002, etc.
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  platform VARCHAR(100),
  delivery_method VARCHAR(100),
  delivery_time VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_relations (
  product_id VARCHAR(20) REFERENCES products(id),
  related_product_id VARCHAR(20) REFERENCES products(id),
  PRIMARY KEY (product_id, related_product_id)
);

CREATE TABLE categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);
```

**Benefits of This Design:**
- TypeScript interfaces match database schema exactly
- JSON structure can be bulk-imported to database
- Component code doesn't change (same import, same usage)
- Data loading functions abstract the data source (JSON vs. API)

---

## Appendix

### Appendix A: Complete Product Type Definition

```typescript
// src/types/product.ts
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

---

### Appendix B: Sample Product (Complete Example)

```json
{
  "id": "prod_001",
  "slug": "premium-game-pass",
  "name": "Premium Game Pass - 12 Month Subscription",
  "category": "games",
  "price": 119.99,
  "shortDescription": "Access over 100 high-quality PC and console games with day-one releases.",
  "description": "Transform your gaming experience with Premium Game Pass. Get unlimited access to a growing library of over 100 high-quality games, including day-one releases from major publishers.\n\nWhat's Included:\n• 12 months of full access to Premium Game Pass library\n• Day-one access to new releases from Xbox Game Studios and partners\n• EA Play membership included\n• Cross-platform play on PC and console\n• Cloud gaming on mobile and tablets\n• Exclusive member discounts up to 20% off games in the library\n\nPerfect For: Gamers who want variety and value. Instead of buying individual games at $60-70 each, get access to hundreds of titles for one low monthly rate.\n\nHow It Works: After purchase, you'll receive a 25-character activation code via email within 5 minutes. Redeem at account.microsoft.com/redeem to activate your subscription instantly.",
  "image": "/images/products/premium-game-pass.jpg",
  "images": [
    "/images/products/premium-game-pass-1.jpg",
    "/images/products/premium-game-pass-2.jpg"
  ],
  "platform": "PC, Xbox, Cloud (Mobile/Tablet)",
  "deliveryMethod": "Email (25-character code)",
  "deliveryTime": "Instant (within 5 minutes)",
  "featured": true,
  "relatedProducts": ["prod_002", "prod_003", "prod_007", "prod_008"]
}
```

---

### Appendix C: Data Access Functions Quick Reference

```typescript
// Get all products
const products = getAllProducts(); // Product[]

// Get single product by slug
const product = getProductBySlug('premium-game-pass'); // Product | undefined

// Get products by category
const games = getProductsByCategory('games'); // Product[]
const allProducts = getProductsByCategory('all'); // Product[]

// Get related products
const related = getRelatedProducts('prod_001', 4); // Product[]

// Get all categories
const categories = getAllCategories(); // Category[]

// Search products
const results = searchProducts('game'); // Product[]

// Get product counts per category
const counts = getProductCountsByCategory(); // Record<string, number>
// Example: { all: 24, games: 8, software: 7, ... }
```

---

### Appendix D: Content Creation Template

**Use this template when creating each product:**

```
Product Name: [50-100 characters, descriptive and compelling]

Category: [games | software | ai-tools | education | entertainment]

Price: $[X.XX] (varied: $5-200 range)

Short Description: [1-2 sentences, 50-150 characters, highlights main benefit]

Full Description:
Paragraph 1 - What it is:
[2-3 sentences explaining what the product is and core value proposition]

What's Included (bullet list as text):
• Feature 1
• Feature 2
• Feature 3
• Feature 4

Paragraph 2 - Who it's for:
[2-3 sentences describing target user and use cases]

Paragraph 3 - How it works:
[2-3 sentences explaining delivery, activation, and getting started]

Platform: [Optional: "Windows, Mac", "Web-based", etc.]

Delivery Method: [Optional: "Email", "Account Dashboard", "Instant Download"]

Delivery Time: [Optional: "Instant", "Within 5 minutes", "Within 24 hours"]

Featured: [true if this is a top product, otherwise omit]

Related Products: [2-4 product IDs from same or complementary category]
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-01 | Winston (BMAD Architect) | Initial draft - Epic 3 technical specification |

---

## Approval and Sign-off

**Architect:** Winston (BMAD) - Drafted 2025-12-01  
**PM Review:** _(Pending)_  
**SM Review:** _(Pending)_  

**Status:** Draft - Ready for review and Epic 3 implementation

---

**Next Steps:**
1. SM reviews this tech spec
2. Architect marks epic-3 as "contexted" in sprint-status.yaml
3. SM drafts Story 3.1 using create-story workflow
4. Dev implements Story 3.1
5. SM drafts Story 3.2 using create-story workflow
6. Dev implements Story 3.2
7. SM conducts Epic 3 retrospective (optional)




