# Story 2.4: Create ProductImage Component with Next.js Optimization

Status: ready-for-dev

## Story

As a user,
I want product images to load quickly and look sharp on all devices,
So that I can see products clearly without waiting for slow-loading images.

## Acceptance Criteria

### AC-1: Component File and Props Interface
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

### AC-2: Next.js Image Integration
**And** the component uses Next.js Image with:
- width={800} height={450} for 16:9 ratio (from Architecture)
- fill prop for responsive container sizing
- Proper sizes attribute for responsive images
- priority={true} for above-fold images (hero section)
- lazy loading enabled by default (priority={false} for below-fold)
- className with object-cover for proper aspect ratio
- rounded-lg for consistent border radius

### AC-3: Aspect Ratio Support
**And** aspect ratios are supported:
- 16/9: Most product cards and detail images (800x450px)
- 1/1: Square thumbnails if needed (800x800px)
- 4/3: Alternative layout (800x600px)
- Proper aspect-[16/9] Tailwind class applied to container

### AC-4: Image Loading States
**And** image loading states are handled:
- Shows gradient placeholder while loading (Trust Blue gradient)
- Prevents layout shift with proper width/height
- onError handler shows fallback:
  - Trust Blue gradient background (from-blue-600 to-blue-700)
  - Centered emoji or icon (🖼️ or similar)
  - Alt text displayed if image fails

### AC-5: Accessibility Implementation
**And** accessibility is implemented:
- alt prop is required and descriptive
- Format: `{product.name} - {product.category}`
- Empty alt="" for decorative images
- No missing alt text warnings

### AC-6: Hover Effects for Cards
**And** hover effects (for cards):
- group-hover:scale-105 for subtle zoom on hover
- transition-transform duration-200 for smooth animation
- Contained within overflow-hidden parent

### AC-7: Visual Verification
**And** I can verify it works:
- Render with placeholder URL → shows image
- Render with invalid URL → shows Trust Blue gradient fallback
- Hover over image in card → subtle zoom effect
- Inspector shows Next.js optimized WebP format
- Mobile testing shows responsive image sizing

## Tasks / Subtasks

### Task 1: Extend TypeScript Types (AC: #1)
- [ ] Add ProductImageProps to src/types/component-props.ts
- [ ] Define all required and optional props
- [ ] Add JSDoc comments for each prop
- [ ] Export interface for use in component

### Task 2: Create ProductImage Component Structure (AC: #1, #2)
- [ ] Create src/components/product/product-image.tsx
- [ ] Import Next.js Image from 'next/image'
- [ ] Import cn utility from '@/lib/utils'
- [ ] Import ProductImageProps type
- [ ] Set up component function with proper props destructuring
- [ ] Export named function ProductImage

### Task 3: Implement Aspect Ratio Logic (AC: #3)
- [ ] Define aspectRatioDimensions object mapping:
  - '16/9': { width: 800, height: 450 }
  - '1/1': { width: 800, height: 800 }
  - '4/3': { width: 800, height: 600 }
- [ ] Define aspectRatioClasses for Tailwind:
  - '16/9': 'aspect-[16/9]'
  - '1/1': 'aspect-square'
  - '4/3': 'aspect-[4/3]'
- [ ] Apply correct dimensions based on aspectRatio prop
- [ ] Apply correct Tailwind aspect ratio class to container

### Task 4: Implement Image Loading and Error States (AC: #4)
- [ ] Add useState for error state tracking
- [ ] Implement onError handler to set error state
- [ ] Create Trust Blue gradient fallback component:
  - Background: bg-gradient-to-br from-blue-600 to-blue-700
  - Centered layout with flexbox
  - Display emoji 🖼️ or icon
  - Show alt text as fallback message
- [ ] Add loading placeholder (Trust Blue gradient)
- [ ] Ensure layout stability (no shift during load)

### Task 5: Configure Next.js Image Props (AC: #2)
- [ ] Set src prop from component props
- [ ] Set alt prop from component props (required)
- [ ] Set width/height based on aspectRatio
- [ ] Set priority prop (default false)
- [ ] Configure sizes attribute for responsive:
  - "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
- [ ] Add className with object-cover and rounded-lg
- [ ] Set quality to 85 (balance size/quality)

### Task 6: Implement Hover Effects (AC: #6)
- [ ] Add group class to container div
- [ ] Add overflow-hidden to container for zoom containment
- [ ] Apply hover:scale-105 to Image component
- [ ] Add transition-transform duration-200 for smooth animation
- [ ] Ensure hover only applies in card contexts (via className prop)

### Task 7: Ensure Accessibility (AC: #5)
- [ ] Require alt prop (TypeScript enforces)
- [ ] Add descriptive alt text guidance in JSDoc
- [ ] Support empty alt="" for decorative images
- [ ] Test with screen reader (alt text announced)
- [ ] Verify no console warnings about missing alt

### Task 8: Create Test Examples (AC: #7)
- [ ] Update src/app/page.tsx with ProductImage test section
- [ ] Test with valid placeholder URL (placehold.co)
- [ ] Test with invalid URL (trigger error fallback)
- [ ] Test all three aspect ratios (16/9, 1/1, 4/3)
- [ ] Test priority loading (priority={true})
- [ ] Test hover effect in card context
- [ ] Create product card mockup using ProductImage
- [ ] Verify WebP optimization in browser inspector

### Task 9: Testing and Validation
- [ ] Verify TypeScript compilation (0 errors)
- [ ] Verify ESLint passes (0 errors)
- [ ] Run production build successfully
- [ ] Test on mobile device or responsive view
- [ ] Verify image optimization (WebP format)
- [ ] Check Network tab for image sizing
- [ ] Confirm no layout shift during image load
- [ ] Test error fallback displays correctly

### Task 10: Documentation
- [ ] Add comprehensive JSDoc to component
- [ ] Include usage examples in JSDoc
- [ ] Document aspect ratio dimensions
- [ ] Document hover effect usage pattern
- [ ] Add notes to completion record

## Dev Notes

### Implementation Details

**Aspect Ratio Configuration:**
```typescript
const aspectRatioDimensions = {
  '16/9': { width: 800, height: 450 },
  '1/1': { width: 800, height: 800 },
  '4/3': { width: 800, height: 600 },
} as const;

const aspectRatioClasses = {
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
} as const;
```

**Next.js Image Configuration:**
```typescript
<Image
  src={src}
  alt={alt}
  width={dimensions.width}
  height={dimensions.height}
  priority={priority}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  className={cn(
    "object-cover rounded-lg transition-transform duration-200",
    "group-hover:scale-105",
    className
  )}
  onError={() => setImageError(true)}
  quality={85}
/>
```

**Error Fallback Component:**
```typescript
if (imageError) {
  return (
    <div className={cn(
      "bg-gradient-to-br from-blue-600 to-blue-700",
      "flex items-center justify-center text-white",
      aspectRatioClasses[aspectRatio],
      "rounded-lg",
      className
    )}>
      <div className="text-center">
        <div className="text-4xl mb-2">🖼️</div>
        <p className="text-sm opacity-90">Image unavailable</p>
      </div>
    </div>
  );
}
```

### Architectural Alignment

**Architecture Section 7: Image Strategy**
- Next.js Image component for automatic optimization
- WebP format conversion (automatic by Next.js)
- Lazy loading for below-fold images
- Priority loading for above-fold images (LCP optimization)
- Image dimensions: 800x450px for 16:9 ratio

**Architecture Section 11.2: Core Component Specifications**
- ProductImage component pattern specified
- Error fallback with Trust Blue gradient
- Hover effects for card contexts
- Accessibility requirements (alt text)

**Architecture Section 13.6: Accessibility Pattern Rules**
- WCAG AA compliant
- Required alt text for all images
- Descriptive alt format: "{product.name} - {product.category}"
- Support for empty alt="" for decorative images

**UX Design Section 6.1.2: Image Loading and Error States**
- Trust Blue gradient placeholder while loading
- Trust Blue gradient fallback for failed images
- Smooth transitions without layout shift
- Hover zoom effect for interactive cards

### Trust Blue Theme Usage

**Gradient Fallback:**
- `bg-gradient-to-br from-blue-600 to-blue-700`
- Hex values: #2563eb → #1d4ed8
- Consistent with Trust Blue brand identity
- High contrast white text for accessibility

**Placeholder Strategy:**
- Phase 1: Use placeholder.co with Trust Blue background
- URL format: `https://placehold.co/800x450/2563eb/ffffff?text=Product`
- Phase 2+: Replace with actual product images

### Dependencies

**Required:**
- next/image (Next.js Image component)
- @/lib/utils (cn() function)
- @/types/component-props (ProductImageProps interface)
- React (useState for error state)
- TypeScript 5.x

**Optional:**
- category prop for badge overlay (future enhancement)

### Learnings from Previous Story (2.3: PriceDisplay)

**From Story 2.3 (Status: completed)**

- **Type Definitions Pattern Established**
  - Add ProductImageProps to existing src/types/component-props.ts
  - Follow same JSDoc documentation pattern
  - File created in Story 2.3, ready for extension

- **Trust Blue Theme Consistency**
  - Use text-blue-600 / bg-blue-600 for Trust Blue elements
  - ProductImage fallback MUST use Trust Blue gradient
  - Maintain color consistency across all Epic 2 components

- **Component Structure Pattern**
  - Props destructuring with defaults
  - cn() utility for className merging
  - Named exports (export function ComponentName)
  - Comprehensive JSDoc with usage examples

- **Test Page Growing**
  - src/app/page.tsx being used for component testing
  - Consider organizing test sections clearly
  - Each story adds test section for visual verification

- **Architectural Decisions to Follow**
  - Centralized type definitions in component-props.ts
  - Accessibility first (ARIA labels, semantic HTML)
  - Variant patterns using object mapping
  - TypeScript strict mode (no any types)

[Source: docs/sprint-artifacts/story-2-3.md#Dev-Agent-Record]

### Project Structure Notes

**Expected File Structure After Story 2.4:**
```
src/
  types/
    component-props.ts ← EXTEND (add ProductImageProps)
  components/
    product/
      price-display.tsx ← EXISTS (from Story 2.3)
      product-image.tsx ← NEW (Story 2.4)
    ui/
      (shadcn/ui components from Story 1.1)
```

**Integration Points:**
- ProductImage will be used in ProductCard (Epic 4)
- ProductImage will be used in ProductDetail (Epic 5)
- ProductImage will be used in HeroBanner (Epic 6)

### References

**Architecture Document:**
- Section 7: Image Strategy (Next.js Image, dimensions, optimization)
- Section 11.2: Core Component Specifications (ProductImage pattern)
- Section 13.3: Component Structure Pattern
- Section 13.6: Accessibility Pattern Rules

**Technical Specification (Epic 2):**
- docs/sprint-artifacts/tech-spec-epic-2.md
- Story 2.4: Complete acceptance criteria and implementation details
- Section: Image Optimization Strategy
- Section: Error Handling Patterns

**Epic Breakdown:**
- docs/epics.md: Story 2.4 (lines 368-441)
- Epic 2 Overview: Design System & UI Components
- Prerequisites: Stories 2.1-2.3 complete

**UX Design Specification:**
- Section 6.1.2: Image Loading and Error States
- Section 3.1: Color System (Trust Blue gradient fallback)
- Section 6.2: Accessibility Requirements (alt text)

**Next.js Documentation:**
- next/image API reference
- Image optimization best practices
- Responsive images with sizes attribute
- Priority loading for LCP optimization

## Dev Agent Record

### Context Reference

**Story Context:** Epic 2, Story 2.4
**Dependencies:** Stories 1.1 (Next.js setup), 2.1-2.3 (complete)
**Integration:** Will be used in Epic 4 (ProductCard), Epic 5 (ProductDetail)

### Agent Model Used

<!-- To be filled by dev agent -->

### Debug Log References

<!-- To be filled during development -->

### Completion Notes List

<!-- To be filled after implementation -->

### File List

<!-- To be filled with actual files created/modified -->

**Expected Files:**
- EXTEND: `ecommerce-shop/src/types/component-props.ts` (add ProductImageProps)
- NEW: `ecommerce-shop/src/components/product/product-image.tsx`
- MODIFY: `ecommerce-shop/src/app/page.tsx` (add test examples)

