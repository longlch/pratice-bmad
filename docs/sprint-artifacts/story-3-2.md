# Story 3.2: Create Sample Product Catalog with 24 Products

Status: drafted

## Story

As a user,
I want to browse a diverse catalog of digital products across multiple categories,
so that I can explore different types of products and understand the marketplace offering.

## Acceptance Criteria

### AC-1: Product Catalog JSON Created with 24 Products
**Given** TypeScript Product and Category types are defined (Story 3.1 complete)
**When** I create the product catalog data
**Then** src/data/products.json exists with 24 sample products:
- 6-8 products in "Games" category (game keys, subscriptions)
- 6-8 products in "Software" category (productivity, design, dev tools)
- 4-6 products in "AI Tools" category (ChatGPT Plus, Midjourney, etc.)
- 4-6 products in "Education" category (courses, learning platforms)
- 4-6 products in "Entertainment" category (streaming, music subscriptions)

### AC-2: Category Definitions JSON Created
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

### AC-3: Products Have Realistic High-Quality Content
**And** each product has realistic content:
- Unique id (prod_001, prod_002, ..., prod_024)
- URL-friendly slug (e.g., "premium-game-pass", "chatgpt-plus-subscription")
- Compelling product name (max 100 chars)
- Category matching one of 5 categories (not "all")
- Price range: $5 - $200 (varied price points)
- Short description: 1-2 engaging sentences
- Full description: 3-5 paragraphs covering:
  * What it is
  * Key features (bullet points in text)
  * Who it's for
  * What's included
  * How it works/activation
- Primary image path: "/images/products/{slug}.jpg"
- Platform info: "Windows, Mac", "Web-based", etc.
- Delivery method: "Email", "Instant", "Account Dashboard"
- Delivery time: "Instant", "Within 5 minutes", "Within 24 hours"

### AC-4: Featured Products Designated
**And** 4-6 products are marked as featured:
- featured: true flag
- Mix of categories (not all from one category)
- Range of price points

### AC-5: Related Products Configured
**And** each product has 2-4 related products:
- relatedProducts array with product IDs
- Products from same or complementary categories
- No circular references that break (product A → B → C is fine)

### AC-6: Content Quality Standards Met
**And** product content is high quality:
- No Lorem Ipsum or obvious placeholders
- Descriptions are realistic and compelling
- Product names sound like real offerings
- No typos or grammatical errors
- Professional tone matching e-commerce marketplace

### AC-7: Data Helper Functions Created
**And** src/lib/product-data.ts exists with helper functions:
- `getAllProducts(): Product[]` - returns all products
- `getProductBySlug(slug: string): Product | undefined` - find by slug
- `getProductsByCategory(categorySlug: string): Product[]` - filter by category
- `getRelatedProducts(productId: string, limit?: number): Product[]` - get related products
- `getAllCategories(): Category[]` - returns all categories
- `searchProducts(query: string): Product[]` - search by name/description

### AC-8: Data Validation Successful
**And** I can verify data works:
- Import and call getAllProducts() → returns 24 products
- Call getProductsByCategory('games') → returns 6-8 games
- Call getProductBySlug('premium-game-pass') → returns that product
- All products pass TypeScript type checking
- No duplicate IDs or slugs
- All category references are valid

## Tasks / Subtasks

### Task 1: Create Product Catalog JSON (AC: #1, #3)
- [ ] Create directory `src/data/` if it doesn't exist
- [ ] Create file `src/data/products.json`
- [ ] Create 24 product objects following Product interface structure
  - [ ] Create 6-8 Games products (prod_001 - prod_008)
    - [ ] Example: Premium Game Pass, Steam Wallet, Xbox Game Pass, PlayStation Plus, Epic Games Gift Card, Nintendo eShop Card
  - [ ] Create 6-8 Software products (prod_009 - prod_016)
    - [ ] Example: Adobe Creative Cloud, Microsoft Office 365, Figma Professional, VS Code Extensions Pack, Notion Team, Slack Business
  - [ ] Create 4-6 AI Tools products (prod_017 - prod_022)
    - [ ] Example: ChatGPT Plus, Midjourney Subscription, GitHub Copilot, Jasper AI, Copy.ai
  - [ ] Create 4-6 Education products (prod_023 - prod_024 or more if total < 24)
    - [ ] Example: Coursera Plus, Udemy Business, LinkedIn Learning, Skillshare Premium
- [ ] Ensure each product has:
  - [ ] Unique ID (prod_001 to prod_024 format)
  - [ ] URL-friendly slug (lowercase-with-hyphens)
  - [ ] Realistic name (max 100 chars)
  - [ ] Valid category (games, software, ai-tools, education, or entertainment)
  - [ ] Price between $5-$200
  - [ ] Short description (1-2 sentences, engaging)
  - [ ] Full description (3-5 paragraphs, realistic content)
  - [ ] Image path: "/images/products/{slug}.jpg"
  - [ ] Platform info where applicable
  - [ ] Delivery method and time

### Task 2: Create Category Definitions JSON (AC: #2)
- [ ] Create file `src/data/categories.json`
- [ ] Add "all" category (id: "all", name: "All Products", slug: "all")
- [ ] Add "games" category (id: "games", name: "Games", slug: "games")
- [ ] Add "software" category (id: "software", name: "Software", slug: "software")
- [ ] Add "ai-tools" category (id: "ai-tools", name: "AI Tools", slug: "ai-tools")
- [ ] Add "education" category (id: "education", name: "Education", slug: "education")
- [ ] Add "entertainment" category (id: "entertainment", name: "Entertainment", slug: "entertainment")
- [ ] Verify JSON is valid (no syntax errors)

### Task 3: Configure Featured Products and Related Products (AC: #4, #5)
- [ ] Select 4-6 products to mark as featured
  - [ ] Ensure mix of categories (at least 3 different categories)
  - [ ] Include range of price points (low, medium, high)
  - [ ] Add `"featured": true` to selected products
- [ ] Configure related products for each product
  - [ ] Add relatedProducts array with 2-4 product IDs
  - [ ] Choose products from same or complementary categories
  - [ ] Ensure all referenced IDs exist in catalog
  - [ ] Verify no breaking circular references

### Task 4: Create Data Helper Functions (AC: #7)
- [ ] Create file `src/lib/product-data.ts`
- [ ] Import Product and Category types from '@/types/product'
- [ ] Import JSON files from '@/data/products.json' and '@/data/categories.json'
- [ ] Implement getAllProducts()
  ```typescript
  export function getAllProducts(): Product[] {
    return productsData as Product[];
  }
  ```
- [ ] Implement getProductBySlug(slug: string)
  ```typescript
  export function getProductBySlug(slug: string): Product | undefined {
    return productsData.find(p => p.slug === slug);
  }
  ```
- [ ] Implement getProductsByCategory(categorySlug: string)
  - Handle "all" category → return all products
  - Filter by category field for specific categories
- [ ] Implement getRelatedProducts(productId: string, limit?: number)
  - Find product by ID
  - Get relatedProducts array
  - If empty/undefined, fallback to same category products
  - Return up to `limit` products (default 4)
- [ ] Implement getAllCategories()
  ```typescript
  export function getAllCategories(): Category[] {
    return categoriesData as Category[];
  }
  ```
- [ ] Implement searchProducts(query: string)
  - Search name, shortDescription, and description fields
  - Case-insensitive search
  - Return matching products

### Task 5: Validate Data Quality and Structure (AC: #6, #8)
- [ ] Content quality check:
  - [ ] No Lorem Ipsum text
  - [ ] All product names are realistic
  - [ ] Descriptions are compelling and realistic
  - [ ] No typos or grammatical errors
  - [ ] Professional e-commerce tone throughout
- [ ] Structural validation:
  - [ ] All 24 products have unique IDs (prod_001 - prod_024)
  - [ ] All slugs are unique
  - [ ] All category values match Category.id values
  - [ ] All prices are valid numbers > 0
  - [ ] All required fields present
  - [ ] Image paths follow pattern: /images/products/{slug}.jpg
- [ ] Data integrity check:
  - [ ] All relatedProducts IDs exist in catalog
  - [ ] Category distribution: 6-8 games, 6-8 software, 4-6 AI tools, 4-6 education, 4-6 entertainment
  - [ ] Featured products: 4-6 marked with featured: true
  - [ ] No duplicate IDs or slugs

### Task 6: Test Data Functions and TypeScript Compilation (AC: #8)
- [ ] Create temporary test file `src/test-product-data.ts`
- [ ] Test getAllProducts()
  ```typescript
  import { getAllProducts } from '@/lib/product-data';
  const products = getAllProducts();
  console.log(`Total products: ${products.length}`); // Should be 24
  ```
- [ ] Test getProductsByCategory()
  ```typescript
  import { getProductsByCategory } from '@/lib/product-data';
  const games = getProductsByCategory('games');
  console.log(`Games: ${games.length}`); // Should be 6-8
  ```
- [ ] Test getProductBySlug()
  ```typescript
  import { getProductBySlug } from '@/lib/product-data';
  const product = getProductBySlug('premium-game-pass');
  console.log(`Found: ${product?.name}`);
  ```
- [ ] Run TypeScript compilation: `npm run build`
  - [ ] Verify zero TypeScript errors
  - [ ] Verify JSON structure matches Product interface
- [ ] Run linter: `npm run lint`
  - [ ] Verify no linting errors
- [ ] Delete test file after verification

## Dev Notes

### Prerequisites
- Story 3.1 complete (TypeScript types defined)
- `src/types/product.ts` exists with Product and Category interfaces
- `src/types/component-props.ts` exists with component prop interfaces
- TypeScript strict mode enabled
- Path aliases configured (@/data, @/lib, @/types)

### Implementation Guide

**File Structure:**
```
src/
  data/
    products.json      # 24-product catalog (NEW)
    categories.json    # 6 categories (NEW)
  lib/
    product-data.ts    # Data helper functions (NEW)
```

**Product JSON Structure Example:**
```json
{
  "id": "prod_001",
  "slug": "premium-game-pass",
  "name": "Premium Game Pass",
  "category": "games",
  "price": 49.99,
  "shortDescription": "Access to 100+ premium games instantly across all platforms.",
  "description": "Premium Game Pass gives you unlimited access to over 100 high-quality games...",
  "image": "/images/products/premium-game-pass.jpg",
  "images": [
    "/images/products/premium-game-pass-1.jpg",
    "/images/products/premium-game-pass-2.jpg"
  ],
  "platform": "Windows, Mac, Xbox",
  "deliveryMethod": "Email",
  "deliveryTime": "Instant",
  "featured": true,
  "relatedProducts": ["prod_002", "prod_003", "prod_004"]
}
```

**Categories JSON Structure:**
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

**Data Functions Example (from Architecture Section 3.3):**
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

### Architectural Constraints

**Product Content Guidelines (from PRD Section 7.2):**
- Product names should be recognizable and realistic
- Descriptions should be compelling and informative
- Pricing should reflect realistic market values
- Content should be professional and error-free
- No placeholder text or Lorem Ipsum

**Placeholder Images (from Architecture Section 7.4):**
- Phase 1 uses placeholder URLs: `https://placehold.co/800x450/2563eb/ffffff?text={product-name}`
- Or local path: `/images/products/{slug}.jpg` (actual images can be added later)
- All image paths should follow consistent pattern

**Data Validation Rules:**
- ID format: `prod_XXX` where XXX is zero-padded number (prod_001, prod_002, etc.)
- Slug format: lowercase-with-hyphens, no spaces or special characters
- Price: Positive number with max 2 decimal places
- Category: Must be one of: games, software, ai-tools, education, entertainment
- Related products: Array of valid product IDs that exist in catalog

**Phase 2 Migration Notes:**
- JSON structure matches future API response format
- Data functions can be replaced with async fetch calls
- Component interfaces remain unchanged
- Type safety preserved through migration

### Testing Approach

**Manual Data Verification:**

1. **Structure Test:**
   - Open `src/data/products.json` in VS Code
   - Verify JSON is valid (no syntax errors)
   - Count total products (should be 24)
   - Verify all required fields present in each product

2. **Category Distribution:**
   - Count products per category
   - Games: 6-8 products
   - Software: 6-8 products
   - AI Tools: 4-6 products
   - Education: 4-6 products
   - Entertainment: 4-6 products

3. **Content Quality:**
   - Read through product descriptions
   - Verify realistic and compelling content
   - Check for typos or placeholder text
   - Verify professional tone

4. **TypeScript Validation:**
   ```bash
   npm run build
   # Should complete with 0 errors
   # JSON should conform to Product interface
   ```

5. **Function Testing:**
   ```typescript
   import { getAllProducts, getProductsByCategory, getProductBySlug } from '@/lib/product-data';
   
   // Test getAllProducts
   const allProducts = getAllProducts();
   console.assert(allProducts.length === 24, 'Should have 24 products');
   
   // Test category filtering
   const games = getProductsByCategory('games');
   console.assert(games.length >= 6 && games.length <= 8, 'Should have 6-8 games');
   
   // Test slug lookup
   const product = getProductBySlug('premium-game-pass');
   console.assert(product !== undefined, 'Should find product by slug');
   console.assert(product?.category === 'games', 'Should be in games category');
   ```

**Acceptance:**
- All 8 AC sections pass verification
- 24 products with realistic content
- 6 categories defined
- All data functions work correctly
- TypeScript compilation succeeds with zero errors
- No duplicate IDs or slugs
- All related product references valid

### Project Structure Notes

**Alignment with Architecture Document:**
- JSON data files in `src/data/` per Architecture Section 3.1-3.2
- Data helper functions in `src/lib/` per Architecture Section 3.3
- Follows exact product structure from Architecture Section 3.1
- Follows exact category structure from Architecture Section 3.2

**Epic 3 Context:**
- Story 3.1 created TypeScript types (complete)
- Story 3.2 creates JSON data and helper functions (current story)
- Epic 4 will consume this data to build product browsing UI

**Files Created by This Story:**
- `src/data/products.json` (NEW) - 24-product catalog
- `src/data/categories.json` (NEW) - 6 categories
- `src/lib/product-data.ts` (NEW) - Data access functions

### Learnings from Previous Story

**From Story 3.1 (Status: done)**

Story 3.1 successfully created the TypeScript type foundation for the product data layer. Key learnings that directly inform Story 3.2:

- **New Files Created:**
  - `src/types/product.ts` (NEW) - Contains Product and Category interfaces
  - Story 3.2 MUST import these types: `import { Product, Category } from '@/types/product'`

- **Modified Files:**
  - `src/types/component-props.ts` (MODIFIED) - Component prop interfaces added
  - Story 3.2 does not need to modify this file

- **Type Structure Established:**
  - Product interface has 13 fields (8 required + 5 optional)
  - Category interface has 3 fields (all required)
  - Story 3.2 JSON data MUST conform exactly to these interface definitions

- **Required Product Fields (from Product interface):**
  - id, slug, name, category, price, shortDescription, description, image
  - Story 3.2 MUST include all 8 required fields in every product object

- **Optional Product Fields:**
  - images, platform, deliveryMethod, deliveryTime, featured, relatedProducts
  - Story 3.2 SHOULD include these for realistic products, but they're optional

- **Field Validation Rules (from Story 3.1 notes):**
  - id: Format `prod_\d{3}` (e.g., prod_001)
  - slug: lowercase-with-hyphens (e.g., premium-game-pass)
  - price: number type (not string)
  - category: must match Category.id (games, software, ai-tools, education, entertainment)

- **Type Safety Achievement:**
  - Story 3.1 achieved 100% type safety (no `any` types)
  - Story 3.2 must maintain this by using proper type casts: `productsData as Product[]`

- **Import Pattern to Use:**
  ```typescript
  import { Product, Category } from '@/types/product';
  import productsData from '@/data/products.json';
  import categoriesData from '@/data/categories.json';
  ```

- **JSDoc Documentation Style:**
  - Story 3.1 established comprehensive JSDoc for all types
  - Story 3.2 should add JSDoc to data functions in product-data.ts

- **Build Success Pattern:**
  - Story 3.1 verified TypeScript compilation with `npm run build`
  - Story 3.2 must also verify with same command to ensure JSON data matches types

**Critical Action Items from Story 3.1:**
1. Use Product and Category types from `src/types/product.ts` (already exists)
2. Ensure JSON data has all 8 required Product fields
3. Match slug format: lowercase-with-hyphens (established in Story 3.1)
4. Match id format: prod_XXX (established in Story 3.1)
5. Use type casting: `productsData as Product[]` in data functions
6. Run `npm run build` to verify JSON structure matches TypeScript types

[Source: docs/sprint-artifacts/story-3-1.md#Completion-Notes-List and #Dev-Agent-Record]

### References

**Epic 3 Tech Spec:**
- [Section: Product Data Model (lines 154-230)] - Complete product JSON structure and validation rules
- [Section: Category Data Model (lines 232-264)] - Category JSON structure
- [Section: Data Access Layer (lines 369-460)] - Implementation of all data helper functions
- [Section: Story 3.2 Implementation (lines 552-725)] - Detailed implementation steps and product examples

**Architecture Document:**
- [Section 3.1: Product Data Model] - JSON structure specification
- [Section 3.2: Category Data Model] - Category JSON specification
- [Section 3.3: Data Loading Functions] - Complete code examples for all data functions
- [Section 7.4: Placeholder Strategy] - Placeholder image URL patterns

**Epic Breakdown:**
- [docs/epics.md: Story 3.2 (lines 602-695)] - Complete user story and acceptance criteria
- [docs/epics.md: Epic 3 Overview (lines 514-522)] - Epic goal and boundaries

**PRD:**
- [Section 7.1: Product Categories] - Required 5 categories
- [Section 7.2: Product Content Guidelines] - Content quality standards
- [Section 3.1.2 REQ-HP-008] - Sample product requirements

**Previous Story:**
- [docs/sprint-artifacts/story-3-1.md] - TypeScript types created in previous story

### Known Constraints

**Phase 1 Data Approach:**
- Static JSON files only (no database)
- No runtime validation (TypeScript compile-time only)
- Placeholder image URLs (real images added later)
- Hardcoded related products (no algorithm)

**Content Creation Constraints:**
- Must create 24 unique products manually
- Must write compelling descriptions manually
- Must ensure realistic pricing and categorization
- Must avoid copyrighted or trademarked product names

**Technical Limitations:**
- JSON import requires type casting (`as Product[]`)
- No JSON schema validation at runtime
- Changes to JSON require rebuild
- All data loaded at once (no pagination needed for 24 products)

### Technical Debt / Future Considerations

**To Address in Epic 4:**
- Actual product images (replace placeholder URLs)
- Test data functions in component context
- Verify category filtering UI works with this data

**Phase 2 Enhancements:**
- Replace JSON imports with API calls
- Add database for product storage
- Implement product search indexing
- Add pagination for larger catalogs
- Add runtime validation with Zod or similar
- Dynamic related products algorithm
- Product inventory tracking

**Content Expansion (Future):**
- Add more products (50+)
- Add product variations/options
- Add customer reviews and ratings
- Add product recommendations based on browsing
- Multilingual product descriptions

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

