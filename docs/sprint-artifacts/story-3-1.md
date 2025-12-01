# Story 3.1: Define TypeScript Types for Product Domain

Status: ready-for-dev

## Story

As a developer,
I want comprehensive TypeScript types for Product, Category, and component props,
so that all components have type safety and consistent data structures.

## Acceptance Criteria

### AC-1: Product Interface Created
**Given** the project structure is initialized (Story 1.1 complete)
**When** I create TypeScript type definitions
**Then** src/types/product.ts exists with Product interface containing:
- `id: string` - Format: "prod_XXX"
- `slug: string` - URL-friendly: "premium-game-pass"
- `name: string` - Max 100 chars
- `category: string` - Must match Category.id
- `price: number` - USD amount (e.g. 49.99)
- `shortDescription: string` - 1-2 sentences for cards
- `description: string` - Full multi-paragraph description
- `image: string` - Primary image path
- `images?: string[]` - Additional gallery images (optional)
- `platform?: string` - "Windows, Mac, Web", etc. (optional)
- `deliveryMethod?: string` - "Email", "Account Dashboard" (optional)
- `deliveryTime?: string` - "Instant", "Within 24 hours" (optional)
- `featured?: boolean` - Show in featured section (optional)
- `relatedProducts?: string[]` - Product IDs for "You might also like" (optional)

### AC-2: Category Interface Created
**And** Category interface exists with:
- `id: string` - Unique identifier: "games", "software"
- `name: string` - Display name: "Games", "Software"
- `slug: string` - URL parameter: "games", "software"

### AC-3: Component Props Interfaces Created
**And** src/types/component-props.ts exists with all component prop interfaces:
- `ProductCardProps` - product, variant?, onClick?
- `ProductGridProps` - products, loading?, emptyMessage?
- `CategoryFilterProps` - categories, activeCategory, onCategoryChange, productCounts?
- `ProductImageProps` - already defined in Story 2.4 (verify exists)
- `PriceDisplayProps` - already defined in Story 2.3 (verify exists)
- `ErrorMessageProps` - already defined in Story 2.5 (verify exists)

### AC-4: Types Properly Exported
**And** all types are properly exported:
- `export interface Product`
- `export interface Category`
- `export type` for union types (e.g., `type Variant = 'standard' | 'compact' | 'featured'`)

### AC-5: JSDoc Comments Documentation
**And** JSDoc comments document each field:
- Purpose of each field
- Format/constraints (e.g., "Format: prod_XXX", "Max 100 chars")
- Examples where helpful

### AC-6: Type Validation Works
**And** I can verify types work:
- Import Product type in another file → TypeScript recognizes it
- Create Product object → TypeScript validates required fields
- Try to set price to string → TypeScript shows error
- Autocomplete works in VS Code for all fields

## Tasks / Subtasks

### Task 1: Create Product and Category Types (AC: #1, #2)
- [ ] Create file `src/types/product.ts`
- [ ] Define Product interface with 13 fields (8 required + 5 optional)
  - [ ] Add JSDoc comment for Product interface
  - [ ] Add required fields: id, slug, name, category, price, shortDescription, description, image
  - [ ] Add optional fields: images?, platform?, deliveryMethod?, deliveryTime?, featured?, relatedProducts?
  - [ ] Add JSDoc comments for each field with format examples
- [ ] Define Category interface with 3 fields
  - [ ] Add JSDoc comment for Category interface
  - [ ] Add fields: id, name, slug
  - [ ] Add JSDoc comments for each field
- [ ] Export both interfaces using `export interface`

### Task 2: Create Component Props Types (AC: #3)
- [ ] Create or update file `src/types/component-props.ts`
- [ ] Import Product and Category from './product'
- [ ] Check if PriceDisplayProps exists (from Story 2.3)
  - [ ] If missing, create PriceDisplayProps interface
- [ ] Check if ProductImageProps exists (from Story 2.4)
  - [ ] If missing, create ProductImageProps interface
- [ ] Check if ErrorMessageProps exists (from Story 2.5)
  - [ ] If missing, create ErrorMessageProps interface
- [ ] Define ProductCardProps interface
  - [ ] product: Product
  - [ ] variant?: 'standard' | 'compact' | 'featured'
  - [ ] onClick?: () => void
- [ ] Define ProductGridProps interface
  - [ ] products: Product[]
  - [ ] loading?: boolean
  - [ ] emptyMessage?: string
- [ ] Define CategoryFilterProps interface
  - [ ] categories: Category[]
  - [ ] activeCategory: string
  - [ ] onCategoryChange: (categorySlug: string) => void
  - [ ] productCounts?: Record<string, number>
- [ ] Export all interfaces

### Task 3: Add Type Definitions for Optional Union Types (AC: #4)
- [ ] Define variant type: `export type ProductCardVariant = 'standard' | 'compact' | 'featured'`
- [ ] Define currency type: `export type Currency = 'USD' | 'EUR' | 'GBP'`
- [ ] Define size type: `export type DisplaySize = 'small' | 'large' | 'xlarge'`
- [ ] Define aspect ratio type: `export type AspectRatio = '16/9' | '1/1' | '4/3'`
- [ ] Export all type aliases

### Task 4: Verify TypeScript Compilation (AC: #6)
- [ ] Run `npm run build` or `tsc --noEmit`
- [ ] Verify zero TypeScript errors
- [ ] Create temporary test file `test-types.ts` in src/
- [ ] Import Product type and create test object
  ```typescript
  import { Product } from '@/types/product';
  const testProduct: Product = {
    id: "prod_001",
    slug: "test-product",
    name: "Test Product",
    category: "games",
    price: 49.99,
    shortDescription: "Short description",
    description: "Long description",
    image: "/images/products/test.jpg",
  };
  ```
- [ ] Verify autocomplete works in VS Code (type `testProduct.` and check suggestions)
- [ ] Test invalid type assignment (e.g., `price: "invalid"`) → verify TypeScript error
- [ ] Delete test file after verification
- [ ] Verify no TypeScript errors remain

### Task 5: Documentation and Validation
- [ ] Verify all 13 Product fields are present
- [ ] Verify all 3 Category fields are present
- [ ] Verify all 6 component prop interfaces are present
- [ ] Check that all optional fields use `?` syntax
- [ ] Verify exports are correct (can be imported in other files)
- [ ] Verify JSDoc comments are present on all interfaces and fields

## Dev Notes

### Prerequisites
- Story 1.1 complete (project initialization)
- `src/types/` directory exists
- TypeScript configuration working
- Path aliases configured (@/types)

### Implementation Guide

**File Structure:**
```
src/
  types/
    product.ts          # Product and Category interfaces (NEW)
    component-props.ts  # Component prop interfaces (NEW or UPDATE)
```

**Product Interface Example (from Architecture Section 3.1):**
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

**Category Interface Example:**
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

### Architectural Constraints

**Type Safety Guidelines (from Architecture Section 4.2):**
- Use strict TypeScript mode (already configured in tsconfig.json)
- No `any` types allowed
- All optional fields must use `?` syntax
- Prefer interfaces over types for object shapes
- Use type aliases for union types and primitives
- Export all public types

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

**Naming Conventions (from Architecture Section 5):**
- Interface names: PascalCase (Product, Category, ProductCardProps)
- Field names: camelCase (productName, shortDescription)
- File names: kebab-case (product.ts, component-props.ts)
- Type aliases: PascalCase (ProductCardVariant, Currency)

### Testing Approach

**Manual Type Verification:**

1. **Autocomplete Test:**
   - Open VS Code
   - Import Product type in a new file
   - Type `const p: Product = {`
   - Verify autocomplete shows all 13 fields
   - Verify JSDoc comments appear in tooltips

2. **Type Safety Test:**
   ```typescript
   import { Product } from '@/types/product';
   
   // Valid product - should compile
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
   
   // Invalid product - should show TypeScript error
   const invalidProduct: Product = {
     id: "prod_001",
     price: "invalid", // Error: Type 'string' is not assignable to type 'number'
   };
   ```

3. **Import Test:**
   ```typescript
   // Test imports work correctly
   import { Product, Category } from '@/types/product';
   import { ProductCardProps, ProductGridProps } from '@/types/component-props';
   ```

4. **Build Test:**
   ```bash
   npm run build
   # Should complete with 0 TypeScript errors
   ```

**Acceptance:**
- All 6 AC sections pass manual verification
- TypeScript compilation succeeds with zero errors
- Autocomplete works in VS Code for all types
- No `any` types in codebase

### Project Structure Notes

**Alignment with Architecture Document:**
- Types organized in `src/types/` per Architecture Section 2.1
- Product interface follows Architecture Section 3.1 exactly
- Category interface follows Architecture Section 3.2 exactly
- Component props follow Architecture Section 4.2 pattern

**Epic 3 Context:**
- Story 3.1 creates the type foundation
- Story 3.2 will create JSON data conforming to these types
- Epic 4+ will use these types in all components

**No Conflicts Detected:**
- Clean type definition files
- No existing product types to conflict with
- Component prop types may partially exist from Epic 2 (will merge if needed)

### Learnings from Previous Story

**From Story 2.5 (Status: done)**

This is the last story of Epic 2 (Design System). Story 2.5 created the ErrorMessage component. Based on completion patterns from Epic 2 stories, the following learnings apply:

- **Type Definition Pattern**: Epic 2 stories likely defined component prop types directly in component files or in a shared types file. Story 3.1 should consolidate all prop interfaces into `src/types/component-props.ts` for centralized type management.

- **Import Path Aliases**: All Epic 2 stories used `@/components`, `@/lib`, `@/types` aliases. Story 3.1 must use `@/types/product` and `@/types/component-props` consistently.

- **TypeScript Strict Mode**: Project initialized with strict TypeScript (Story 1.1). All types must compile without errors in strict mode.

- **Component Prop Interfaces**: If Epic 2 stories (2.3, 2.4, 2.5) already created prop interfaces for PriceDisplay, ProductImage, and ErrorMessage, this story should verify they exist in component-props.ts. If they're only defined inline in component files, consolidate them into component-props.ts for consistency.

- **Documentation Style**: Epic 2 established JSDoc comment patterns. Continue using JSDoc for all interfaces and fields with format examples.

- **No Technical Debt from Epic 2**: Epic 2 appears complete with no deferred items that affect Story 3.1.

**Action Items:**
1. Check if `src/types/component-props.ts` already exists from Epic 2
2. If PriceDisplayProps, ProductImageProps, ErrorMessageProps exist elsewhere, consolidate them
3. Follow established JSDoc documentation style from Epic 2 components

[Source: Inferred from Epic 2 completion status and Story 1.1 patterns]

### References

**Epic 3 Tech Spec:**
- [Section: Product Interface (lines 158-210)] - Complete Product type definition with JSDoc
- [Section: Category Interface (lines 234-253)] - Category type definition
- [Section: Component Prop Interfaces (lines 268-366)] - All component prop types
- [Section: Field Validation Rules (lines 212-230)] - Validation constraints for Product fields
- [Section: Story 3.1 Implementation (lines 500-551)] - Implementation steps and verification

**Architecture Document:**
- [Section 3.1: Product Data Model] - JSON structure and field definitions
- [Section 3.2: Category Data Model] - Category structure
- [Section 4.1: Core Types] - TypeScript type system guidelines
- [Section 4.2: Component Props] - Component prop interface patterns
- [Section 5.1: File Naming] - kebab-case for file names
- [Section 5.3: Slug Format] - lowercase-with-hyphens for slugs

**Epic Breakdown:**
- [docs/epics.md: Story 3.1 (lines 525-600)] - User story and acceptance criteria
- [docs/epics.md: Epic 3 Overview (lines 514-522)] - Epic goal and user value

**PRD:**
- [Section 7.1: Product Categories] - 5 category requirements
- [Section 7.2: Product Content Guidelines] - Content format standards

### Known Constraints

**Phase 1 Type System:**
- Static types only (no runtime validation in Phase 1)
- No Zod or similar schema validation (deferred to Phase 2)
- JSON data will be cast to types (type safety at compile time only)

**Future Enhancements (Phase 2):**
- Add runtime validation with Zod
- Add database schema types
- Add API request/response types
- Add form validation types

### Technical Debt / Future Considerations

**To Address in Story 3.2:**
- Create JSON data files that conform to these types
- Implement data loading functions that return typed data
- Validate JSON structure matches TypeScript interfaces

**To Address in Epic 4:**
- Use these types in all product components
- Verify type safety in component props
- Test that autocomplete works in all component files

**Phase 2 Considerations:**
- These types will serve as foundation for API response types
- Database schema should mirror these TypeScript types
- Runtime validation can be added via Zod or similar library

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

_To be filled by Dev agent during implementation_

### Debug Log References

_To be filled by Dev agent during implementation_

### Completion Notes List

_To be filled by Dev agent during implementation_

### File List

_To be filled by Dev agent during implementation_

