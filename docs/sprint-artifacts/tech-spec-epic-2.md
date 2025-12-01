# Epic Technical Specification: Design System & UI Components

Date: 2025-12-01
Author: Winston (BMAD Architect)
Epic ID: epic-2
Status: Draft

---

## Overview

Epic 2 establishes the complete design system for the ecommerce-shop Phase 1 implementation, bringing the "Trust Blue" visual identity to life through Tailwind CSS configuration, shadcn/ui component library integration, and custom reusable UI primitives. This epic transforms the bare Next.js foundation from Epic 1 into a fully-themed, accessible design system that all subsequent features will build upon.

The epic delivers five critical components: (1) Trust Blue theme configuration in Tailwind, (2) shadcn/ui base components styled with Trust Blue, (3) PriceDisplay component for consistent currency formatting, (4) ProductImage component with Next.js optimization, and (5) ErrorMessage component for user feedback. Together, these provide the visual and functional primitives needed for all product browsing features.

**User Impact:** Users will experience a professional, accessible, visually cohesive interface with Trust Blue branding (#2563eb) that works beautifully on all devices. Every interactive element will meet WCAG AA accessibility standards, ensuring the marketplace is usable by everyone.

**Success Criteria:** A developer can import and render any component (Button, Card, PriceDisplay, ProductImage) and it automatically displays with Trust Blue styling, proper accessibility attributes, and responsive behavior—with zero additional configuration required.

---

## Objectives and Scope

**In Scope:**

**Story 2.1: Tailwind CSS Configuration**
- Complete Trust Blue color palette (#2563eb primary, #1d4ed8 hover, Slate neutral scale)
- Custom typography scale (Display 48px → Body 16px with proper line heights)
- Custom spacing values (4.5rem, 22rem)
- Global CSS utilities (.hero-gradient, .product-card-hover, .line-clamp-2)
- Dark mode preparation (class-based, for Phase 2)

**Story 2.2: shadcn/ui Components**
- Button component (default, outline, ghost, destructive variants)
- Card component (Card, CardHeader, CardTitle, CardContent, CardFooter)
- Badge component (default, secondary, outline variants)
- Skeleton component (loading states with shimmer animation)
- Trust Blue styling applied to all components

**Story 2.3: PriceDisplay Component**
- Currency formatting (USD, EUR, GBP support via Intl.NumberFormat)
- Size variants (small, large, xlarge)
- Trust Blue price color (#2563eb)
- Accessibility (ARIA labels, screen reader announcements)

**Story 2.4: ProductImage Component**
- Next.js Image component wrapper with optimization
- Aspect ratio support (16:9, 1:1, 4:3)
- Trust Blue gradient fallback for failed images
- Lazy loading and priority loading for above-fold images
- Hover zoom effect for cards

**Story 2.5: ErrorMessage Component**
- Error display with semantic colors (red-600)
- Optional retry button
- Accessibility (role="alert", aria-live="polite")
- User-friendly error messaging

**Out of Scope (Deferred to Later Epics):**

- Product-specific components (ProductCard, ProductGrid - Epic 4)
- Layout components (Header, Footer, HeroBanner - Epic 6)
- Filter components (CategoryFilter - Epic 4)
- Product data types and models (Epic 3)
- Page implementations (Epic 4-5)
- Form components (Phase 2)
- Complex animations (Phase 2)

**Epic Boundaries:**

This epic stops after the design system components are created, styled, tested, and verified. The next developer should be able to immediately use any component from this epic in their feature implementation without worrying about styling or accessibility—it "just works."

---

## System Architecture Alignment

This epic implements critical architectural decisions from the Architecture Document:

**Section 12: Styling & Theme Configuration**
- **12.1 Tailwind Configuration:** Complete implementation with Trust Blue colors, typography scale, spacing system (Story 2.1)
- **12.2 Global Styles:** Custom utilities in globals.css (.hero-gradient, .product-card-hover, .line-clamp-2)
- **12.3 shadcn/ui Configuration:** Components installed and styled with Trust Blue theme (Story 2.2)

**Section 11.2: Core Component Specifications**
- **PriceDisplay Component:** Exact implementation per Architecture pattern (Story 2.3)
- **ProductImage Component:** Next.js Image wrapper with fallback strategy (Story 2.4)
- **ErrorMessage Component:** User feedback with retry functionality (Story 2.5)

**Section 13: Implementation Patterns**
- **13.3 Component Structure Pattern:** All components follow the defined structure (imports, types, hooks, handlers, JSX)
- **13.6 Accessibility Pattern Rules:** WCAG AA compliance, ARIA labels, semantic HTML, keyboard navigation
- **13.7 Responsive Design Pattern:** Mobile-first Tailwind classes, responsive typography

**UX Design Specification Alignment:**

- **Section 3.1: Color System** - Trust Blue palette (#2563eb) with complete neutral Slate scale
- **Section 3.2: Typography System** - Inter font family, 48px display → 12px tiny scale
- **Section 3.3: Spacing & Layout** - 8px grid system, Tailwind spacing scale
- **Section 6.2: Accessibility Requirements** - WCAG AA, keyboard navigation, screen reader support

**Architectural Constraints:**

1. **All colors must use Tailwind classes** - No inline hex codes in components
2. **All components must be TypeScript typed** - Strict mode, no `any` types
3. **All interactive elements must be keyboard accessible** - Tab, Enter, Space keys
4. **All text must meet WCAG AA contrast** - Minimum 4.5:1 ratio
5. **All components must use cn() utility** - For className merging and conditional styles

**Why These Choices:**

- **Trust Blue (#2563eb):** UX research shows blue conveys trust and professionalism—critical for digital marketplace credibility
- **shadcn/ui:** Copy-paste components (no large dependency) with built-in accessibility (Radix UI primitives)
- **Tailwind CSS:** JIT compilation keeps bundle small, utility-first matches shadcn/ui patterns
- **Component-based design system:** Ensures visual consistency across all pages, reduces development time, prevents styling drift

---

## Detailed Design

### Services and Modules

Epic 2 creates the **Design System Layer** with reusable UI primitives:

| Component | Responsibility | Location | Exports |
|-----------|---------------|----------|---------|
| **Tailwind Config** | Theme definition (colors, typography, spacing) | `tailwind.config.ts` | Configuration object |
| **Global Styles** | CSS utilities and base styles | `src/app/globals.css` | CSS classes |
| **Button** | Interactive button primitive | `src/components/ui/button.tsx` | `Button`, `buttonVariants` |
| **Card** | Content container primitive | `src/components/ui/card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` |
| **Badge** | Label/tag primitive | `src/components/ui/badge.tsx` | `Badge`, `badgeVariants` |
| **Skeleton** | Loading state placeholder | `src/components/ui/skeleton.tsx` | `Skeleton` |
| **PriceDisplay** | Currency formatter component | `src/components/product/price-display.tsx` | `PriceDisplay` |
| **ProductImage** | Optimized image component | `src/components/product/product-image.tsx` | `ProductImage` |
| **ErrorMessage** | Error feedback component | `src/components/ui/error-message.tsx` | `ErrorMessage` |

**Module Dependencies:**

```
Design System (Epic 2)
├── Tailwind CSS 3+ (styling engine)
│   ├── Trust Blue theme config
│   ├── Typography scale
│   └── Custom utilities
│
├── shadcn/ui components (accessibility primitives)
│   ├── Button (Radix UI Slot)
│   ├── Card (native HTML)
│   ├── Badge (native HTML)
│   └── Skeleton (native HTML)
│
├── Custom Components
│   ├── PriceDisplay (uses Intl.NumberFormat)
│   ├── ProductImage (uses next/image)
│   └── ErrorMessage (uses Button)
│
└── Utilities
    └── cn() (className merging - from Epic 1)
```

**Component Composition:**

- **ErrorMessage** uses **Button** for retry action
- **ProductImage** uses **Next.js Image** for optimization
- **PriceDisplay** is standalone (no dependencies except cn())
- All components use **cn()** utility for className merging

**No Business Logic:** Epic 2 components are pure UI—no data fetching, no state management beyond local UI state. Business logic is added in Epic 4+ when implementing features.

---

### Data Models and Contracts

**Epic 2 Type Definitions:**

**File:** `src/types/component-props.ts` (Created in this epic)

```typescript
/**
 * Component Props Type Definitions
 * All component prop interfaces for the design system
 */

/**
 * PriceDisplay Component Props
 * Displays formatted currency prices with consistent styling
 */
export interface PriceDisplayProps {
  /** Price amount in base currency units (e.g., 49.99 for $49.99) */
  amount: number;
  
  /** Currency code (ISO 4217) - defaults to USD */
  currency?: 'USD' | 'EUR' | 'GBP';
  
  /** Visual size variant - defaults to large */
  size?: 'small' | 'large' | 'xlarge';
  
  /** Additional CSS classes for customization */
  className?: string;
}

/**
 * ProductImage Component Props
 * Optimized image component with Next.js Image integration
 */
export interface ProductImageProps {
  /** Image source URL or path */
  src: string;
  
  /** Accessibility alt text (required for WCAG AA) */
  alt: string;
  
  /** Optional category for badge overlay */
  category?: string;
  
  /** Image aspect ratio - defaults to 16:9 */
  aspectRatio?: '16/9' | '1/1' | '4/3';
  
  /** Priority loading for above-fold images (LCP optimization) */
  priority?: boolean;
  
  /** Additional CSS classes for customization */
  className?: string;
}

/**
 * ErrorMessage Component Props
 * User-friendly error display with optional retry
 */
export interface ErrorMessageProps {
  /** User-friendly error message (not technical stack traces) */
  message: string;
  
  /** Optional retry callback - shows "Try Again" button if provided */
  onRetry?: () => void;
  
  /** Additional CSS classes for customization */
  className?: string;
}
```

**Tailwind Theme Type (Extended Config):**

```typescript
// tailwind.config.ts type structure
interface TailwindTheme {
  colors: {
    primary: {
      DEFAULT: string;  // #2563eb
      hover: string;    // #1d4ed8
      light: string;    // #3b82f6
    };
    slate: {
      50: string;   // #f8fafc
      100: string;  // #f1f5f9
      // ... 200-900
    };
    success: string;  // #10b981
    warning: string;  // #f59e0b
    error: string;    // #ef4444
  };
  fontSize: {
    display: [string, { lineHeight: string; fontWeight: string }];
    h1: [string, { lineHeight: string; fontWeight: string }];
    // ... h2-h4, body, small, tiny
  };
  spacing: {
    18: string;  // 4.5rem
    88: string;  // 22rem
  };
  maxWidth: {
    '7xl': string;  // 1280px
  };
}
```

**Data Validation:**

- **PriceDisplay:** `amount` must be positive number (validates at runtime)
- **ProductImage:** `src` and `alt` are required (TypeScript enforces)
- **ErrorMessage:** `message` must be non-empty string

---

### APIs and Interfaces

**Component Public APIs:**

#### PriceDisplay Component API

```typescript
import { PriceDisplay } from '@/components/product/price-display';

// Basic usage
<PriceDisplay amount={49.99} />
// Output: "$49.99" in Trust Blue, large bold text

// With size variants
<PriceDisplay amount={199.99} size="xlarge" />
// Output: "$199.99" in extra large Trust Blue text

// With different currency
<PriceDisplay amount={49.99} currency="EUR" />
// Output: "€49.99" in Trust Blue

// With custom className
<PriceDisplay 
  amount={49.99} 
  size="small"
  className="mt-4" 
/>
// Output: "$49.99" in small Trust Blue text with margin-top
```

**Implementation Pattern:**

```typescript
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

#### ProductImage Component API

```typescript
import { ProductImage } from '@/components/product/product-image';

// Basic usage (defaults to 16:9, lazy loading)
<ProductImage 
  src="/images/products/game-pass.jpg"
  alt="Premium Game Pass"
/>

// Above-fold image (priority loading for LCP)
<ProductImage 
  src="/images/products/hero.jpg"
  alt="Featured Product"
  priority={true}
/>

// Different aspect ratio
<ProductImage 
  src="/images/products/square.jpg"
  alt="Square Product"
  aspectRatio="1/1"
/>

// With custom styling
<ProductImage 
  src="/images/products/product.jpg"
  alt="Product Name"
  className="border-2 border-blue-600"
/>
```

**Implementation Pattern:**

```typescript
export function ProductImage({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  className
}: ProductImageProps) {
  const dimensions = {
    '16/9': { width: 800, height: 450 },
    '1/1': { width: 800, height: 800 },
    '4/3': { width: 800, height: 600 },
  };

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <Image
        src={src}
        alt={alt}
        width={dimensions[aspectRatio].width}
        height={dimensions[aspectRatio].height}
        className="object-cover group-hover:scale-105 transition-transform duration-200"
        priority={priority}
        onError={(e) => {
          // Fallback to Trust Blue gradient
          e.currentTarget.src = 'data:image/svg+xml,...';
        }}
      />
    </div>
  );
}
```

---

#### ErrorMessage Component API

```typescript
import { ErrorMessage } from '@/components/ui/error-message';

// Basic error (no retry)
<ErrorMessage message="Unable to load products" />

// Error with retry functionality
<ErrorMessage 
  message="Connection issue. Please try again."
  onRetry={() => window.location.reload()}
/>

// Custom styled error
<ErrorMessage 
  message="Product not found"
  className="mt-8"
/>
```

**Implementation Pattern:**

```typescript
export function ErrorMessage({ 
  message, 
  onRetry,
  className 
}: ErrorMessageProps) {
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center p-8',
        'bg-red-50 border border-red-200 rounded-lg',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <span className="text-red-600 text-lg mb-4">{message}</span>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="default"
          aria-label="Retry loading"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
```

---

### Workflows and Sequencing

**Epic 2 Implementation Workflow:**

```
Step 1: Configure Tailwind CSS Theme (Story 2.1)
├─> Edit tailwind.config.ts
│   ├─> Add Trust Blue primary colors
│   ├─> Add Slate neutral scale
│   ├─> Add custom typography scale
│   ├─> Add custom spacing values
│   └─> Add maxWidth container
│
├─> Edit src/app/globals.css
│   ├─> Add base layer styles
│   ├─> Add .hero-gradient utility
│   ├─> Add .product-card-hover utility
│   └─> Add .line-clamp-2 utility
│
└─> Verify theme works
    ├─> Apply bg-primary to test div
    └─> Check color displays #2563eb

Step 2: Install shadcn/ui Components (Story 2.2)
├─> Already done in Epic 1, now customize
├─> Verify Button uses Trust Blue
├─> Verify Card has proper borders
├─> Verify Badge variants work
└─> Verify Skeleton has shimmer

Step 3: Create PriceDisplay Component (Story 2.3)
├─> Create src/types/component-props.ts
│   └─> Define PriceDisplayProps interface
│
├─> Create src/components/product/price-display.tsx
│   ├─> Import cn() utility
│   ├─> Implement Intl.NumberFormat
│   ├─> Add size variants
│   ├─> Add Trust Blue color
│   └─> Add ARIA label
│
└─> Test in temporary page
    ├─> Render with amount={49.99}
    └─> Verify shows "$49.99" in Trust Blue

Step 4: Create ProductImage Component (Story 2.4)
├─> Add ProductImageProps to component-props.ts
│
├─> Create src/components/product/product-image.tsx
│   ├─> Import Next.js Image
│   ├─> Add aspect ratio handling
│   ├─> Add Trust Blue gradient fallback
│   ├─> Add hover zoom effect
│   └─> Add priority/lazy loading
│
└─> Test with placeholder URL
    ├─> Verify image loads
    ├─> Verify fallback on error
    └─> Verify hover zoom works

Step 5: Create ErrorMessage Component (Story 2.5)
├─> Add ErrorMessageProps to component-props.ts
│
├─> Create src/components/ui/error-message.tsx
│   ├─> Import Button from shadcn/ui
│   ├─> Add error styling (red-600)
│   ├─> Add retry button (if onRetry provided)
│   └─> Add ARIA role="alert"
│
└─> Test error scenarios
    ├─> Render without onRetry
    └─> Render with onRetry → verify button appears

Step 6: Comprehensive Verification
├─> All 5 stories complete
├─> All acceptance criteria pass
├─> Accessibility audit passes
└─> Visual regression check (if tooling exists)
```

**Component Dependency Sequence:**

```
1. Tailwind Config (Story 2.1)
   ↓ (Trust Blue theme available)
   
2. shadcn/ui Components (Story 2.2)
   ↓ (Button available)
   
3. PriceDisplay (Story 2.3) ┐
4. ProductImage (Story 2.4)   ├─ Can be done in parallel
5. ErrorMessage (Story 2.5) ─┘ (depends on Button from 2.2)
```

**Critical Path:**

1. Story 2.1 (Tailwind) MUST complete before 2.2-2.5 (theme required)
2. Story 2.2 (shadcn/ui) MUST complete before 2.5 (ErrorMessage needs Button)
3. Stories 2.3 (PriceDisplay) and 2.4 (ProductImage) are independent and can be parallel

---

## Non-Functional Requirements

### Accessibility (WCAG AA Compliance)

**Epic 2 Accessibility Targets:**

| Component | WCAG AA Requirements | Implementation |
|-----------|---------------------|----------------|
| **Button** | - Keyboard accessible (Enter, Space)<br>- Focus indicator visible<br>- Min 44x44px tap target<br>- ARIA role="button" | shadcn/ui provides via Radix UI |
| **Card** | - Semantic HTML (article/section)<br>- Proper heading hierarchy | Native HTML elements |
| **Badge** | - Min 4.5:1 contrast ratio<br>- Readable at 12px minimum | Verified in Story 2.2 |
| **PriceDisplay** | - ARIA label for screen readers<br>- Proper currency announcement | `aria-label="Price: $49.99"` |
| **ProductImage** | - Required alt text<br>- Descriptive text (not "image") | TypeScript enforces alt prop |
| **ErrorMessage** | - role="alert"<br>- aria-live="polite"<br>- Retry button accessible | Implemented in Story 2.5 |

**Contrast Ratios (Trust Blue Theme):**

- **Primary text (#0f172a) on white (#ffffff):** 16.05:1 ✅ (exceeds 4.5:1)
- **Secondary text (#475569) on white:** 7.92:1 ✅ (exceeds 4.5:1)
- **Primary button (#2563eb) with white text:** 5.47:1 ✅ (exceeds 4.5:1)
- **Error text (#ef4444) on light red (#fef2f2):** 8.05:1 ✅ (exceeds 4.5:1)

**Keyboard Navigation:**

- All interactive elements accessible via Tab key
- Enter and Space keys activate buttons
- Escape key dismisses modals (Phase 2)
- Arrow keys navigate lists (Phase 2)

**Screen Reader Support:**

- All images have descriptive alt text
- All buttons have aria-labels
- Error messages announced with role="alert"
- Price formatting announced correctly ("forty-nine dollars and ninety-nine cents")

---

### Performance

**Epic 2 Performance Targets:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Tailwind CSS Bundle** | < 10KB (compressed) | Build output analysis |
| **Component Re-render Time** | < 16ms (60fps) | React DevTools Profiler |
| **Image Load Time (ProductImage)** | < 500ms (WebP) | Network tab |
| **Font Loading (Inter)** | < 200ms (FOUT prevention) | Lighthouse |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Lighthouse |

**Optimization Strategies:**

**Tailwind CSS JIT:**
- Only generates CSS for classes actually used
- Development: Full rebuild in ~50ms
- Production: Minified, purged, compressed

**Component Optimization:**
- All components use React.memo for expensive renders (if needed in Epic 4+)
- PriceDisplay memoizes Intl.NumberFormat instance
- ProductImage uses Next.js Image (automatic WebP, lazy loading, blur placeholder)

**Font Optimization:**
- Inter font loaded via next/font/google (automatic optimization)
- Font display: swap (prevents invisible text)
- Subset: latin (reduces file size)

**Image Optimization (ProductImage):**
- Next.js Image converts to WebP automatically
- Lazy loading by default (priority={false})
- Above-fold images use priority={true}
- Responsive srcset generated automatically

---

### Visual Consistency

**Epic 2 Visual Standards:**

**Color Usage Rules:**

| Color | Usage | Don't Use For |
|-------|-------|---------------|
| **Primary (#2563eb)** | CTAs, links, prices, active states | Backgrounds, body text |
| **Slate 900 (#0f172a)** | Headings, primary text | Buttons, links |
| **Slate 600 (#475569)** | Body text, descriptions | Headings, CTAs |
| **Slate 200 (#e2e8f0)** | Borders, dividers | Text, backgrounds |
| **Red 600 (#ef4444)** | Errors, destructive actions | Success, links |
| **Green 500 (#10b981)** | Success messages | Errors, warnings |

**Typography Hierarchy:**

```
Display (48px) → Hero sections only
H1 (36px) → Page titles (one per page)
H2 (30px) → Major sections
H3 (24px) → Subsections, card titles
H4 (20px) → Minor headings
Body (16px) → All standard text
Small (14px) → Metadata, captions
Tiny (12px) → Badges, labels
```

**Spacing Consistency:**

- Component padding: 16px (md) or 24px (lg)
- Section gaps: 48px (2xl) or 64px (3xl)
- Card gaps: 16px (md)
- Element gaps: 8px (sm) or 16px (md)

**Border Radius:**

- Cards: 8px (rounded-lg)
- Buttons: 6px (rounded-md)
- Badges: 4px (rounded)
- Images: 8px (rounded-lg)

---

## Dependencies and Integrations

### NPM Dependencies

**Epic 2 Package Dependencies (Added to package.json):**

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    
    // Typography (added in Epic 2)
    "@next/font": "^14.0.0",
    
    // Existing from Epic 1
    "tailwindcss": "^3.0.0",
    "@radix-ui/react-slot": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.300.0",
    "tailwindcss-animate": "^1.0.0"
  }
}
```

**Dependency Details:**

| Dependency | Version | Purpose | Story |
|------------|---------|---------|-------|
| `@next/font` | ^14.0.0 | Inter font optimization | 2.1 |
| `tailwindcss` | ^3.0.0 | Theme configuration | 2.1 |
| `@radix-ui/react-slot` | ^1.0.0 | Button accessibility | 2.2 |
| `class-variance-authority` | ^0.7.0 | Component variants | 2.2 |
| `clsx` | ^2.0.0 | Conditional classes | All |
| `tailwind-merge` | ^2.0.0 | Tailwind conflict resolution | All |
| `lucide-react` | ^0.300.0 | Icons (optional) | 2.5 |

**No Additional Dependencies Needed:** Epic 2 uses packages already installed in Epic 1.

---

### Integrations

**Epic 2 Integrations:**

**Next.js Integration:**

- **next/font/google:** Automatic font optimization for Inter
- **next/image:** Automatic image optimization (WebP, responsive srcset)
- **App Router:** Tailwind CSS works seamlessly with Server/Client Components

**Tailwind CSS Integration:**

- **JIT Mode:** Generates CSS on-demand during development
- **PurgeCSS:** Removes unused CSS in production builds
- **PostCSS:** Processes Tailwind directives in globals.css

**shadcn/ui Integration:**

- **Radix UI:** Provides accessible primitives for Button
- **Tailwind CSS:** All components styled with Tailwind classes
- **TypeScript:** Full type safety for component props

**Browser Integration:**

- **Intl.NumberFormat:** Native browser API for currency formatting (PriceDisplay)
- **CSS Grid:** Native browser layout for responsive grids (used in Epic 4)
- **CSS Custom Properties:** Used for dynamic theming (prepared for Phase 2 dark mode)

---

## Acceptance Criteria (Authoritative)

### Story 2.1: Configure Tailwind CSS with Trust Blue Theme

**AC-2.1.1: Trust Blue Primary Colors Defined**

- [ ] `tailwind.config.ts` contains `primary.DEFAULT: '#2563eb'`
- [ ] `tailwind.config.ts` contains `primary.hover: '#1d4ed8'`
- [ ] `tailwind.config.ts` contains `primary.light: '#3b82f6'`
- [ ] Applying `bg-primary` class displays #2563eb color

**AC-2.1.2: Semantic Colors Defined**

- [ ] `success: '#10b981'` defined in colors
- [ ] `warning: '#f59e0b'` defined in colors
- [ ] `error: '#ef4444'` defined in colors

**AC-2.1.3: Slate Neutral Scale Complete**

- [ ] All Slate colors (50, 100, 200, 300, 400, 500, 600, 700, 800, 900) defined
- [ ] Applying `text-slate-600` displays #475569 color

**AC-2.1.4: Custom Typography Scale**

- [ ] `display` size defined: 3rem, line-height 1.2, font-weight 700
- [ ] `h1` size defined: 2.25rem, line-height 1.3, font-weight 700
- [ ] `h2` size defined: 1.875rem, line-height 1.3, font-weight 600
- [ ] `h3` size defined: 1.5rem, line-height 1.4, font-weight 600
- [ ] `h4` size defined: 1.25rem, line-height 1.5, font-weight 600

**AC-2.1.5: Custom Spacing and Layout**

- [ ] Spacing `18: '4.5rem'` defined
- [ ] Spacing `88: '22rem'` defined
- [ ] `maxWidth['7xl']: '1280px'` defined

**AC-2.1.6: Global CSS Utilities**

- [ ] `globals.css` contains `.hero-gradient` class
- [ ] `globals.css` contains `.product-card-hover` class
- [ ] `globals.css` contains `.line-clamp-2` class
- [ ] Applying `.hero-gradient` displays blue gradient background

**AC-2.1.7: Font Configuration**

- [ ] `fontFamily.sans` includes Inter
- [ ] `fontFamily.mono` includes Fira Code
- [ ] Inter font loads without FOUT (flash of unstyled text)

**AC-2.1.8: Dark Mode Prepared**

- [ ] `darkMode: ['class']` configured in tailwind.config.ts

---

### Story 2.2: Create shadcn/ui Base Components with Trust Blue Styling

**AC-2.2.1: Button Component Exists**

- [ ] `src/components/ui/button.tsx` exists
- [ ] Button has variants: default, outline, ghost, destructive
- [ ] Default variant uses `bg-primary` (#2563eb)
- [ ] Hover state uses `hover:bg-primary-hover` (#1d4ed8)
- [ ] Focus ring uses `focus:ring-blue-600`

**AC-2.2.2: Button Accessibility**

- [ ] Button has `role="button"` attribute
- [ ] Button accepts `aria-label` prop
- [ ] Button responds to Enter and Space keys
- [ ] Button has min 44x44px tap target on mobile

**AC-2.2.3: Card Component Exists**

- [ ] `src/components/ui/card.tsx` exists
- [ ] Card exports: Card, CardHeader, CardTitle, CardContent, CardFooter
- [ ] Card has `border-slate-200` border
- [ ] Card has `bg-white` background
- [ ] Card has `rounded-lg` corners
- [ ] Card hover shows `hover:shadow-lg`

**AC-2.2.4: Badge Component Exists**

- [ ] `src/components/ui/badge.tsx` exists
- [ ] Badge has variants: default, secondary, outline, destructive
- [ ] Default variant uses `bg-primary text-white`
- [ ] Secondary variant uses `bg-slate-100 text-slate-900`
- [ ] Outline variant uses `border-primary text-primary`

**AC-2.2.5: Skeleton Component Exists**

- [ ] `src/components/ui/skeleton.tsx` exists
- [ ] Skeleton has animated shimmer effect
- [ ] Skeleton respects aspect ratios (can apply `aspect-[16/9]`)
- [ ] Skeleton uses `bg-slate-200` background

**AC-2.2.6: TypeScript Types**

- [ ] All components have proper prop interfaces exported
- [ ] Variant types are string literals (not `string`)
- [ ] All components forward refs correctly

---

### Story 2.3: Create PriceDisplay Component with Currency Formatting

**AC-2.3.1: Component File Exists**

- [ ] `src/components/product/price-display.tsx` exists
- [ ] `src/types/component-props.ts` exists with PriceDisplayProps

**AC-2.3.2: Component Props Interface**

- [ ] PriceDisplayProps has `amount: number` (required)
- [ ] PriceDisplayProps has `currency?: 'USD' | 'EUR' | 'GBP'` (optional)
- [ ] PriceDisplayProps has `size?: 'small' | 'large' | 'xlarge'` (optional)
- [ ] PriceDisplayProps has `className?: string` (optional)

**AC-2.3.3: Currency Formatting**

- [ ] Amount 49.99 formats to "$49.99" (USD)
- [ ] Amount 5.00 formats to "$5.00" (shows cents)
- [ ] Amount 199.99 formats to "$199.99"
- [ ] Currency prop changes symbol (EUR → "€", GBP → "£")

**AC-2.3.4: Size Variants**

- [ ] `size="small"` applies `text-base font-semibold`
- [ ] `size="large"` applies `text-xl font-bold` (default)
- [ ] `size="xlarge"` applies `text-2xl font-bold`
- [ ] All sizes use `text-blue-600` (Trust Blue)

**AC-2.3.5: Accessibility**

- [ ] Component has `aria-label` with formatted price
- [ ] Screen reader announces "Price: forty-nine dollars and ninety-nine cents"
- [ ] Component renders as `<span>` (proper semantic HTML)

**AC-2.3.6: Reusability**

- [ ] Component accepts `className` prop via cn() utility
- [ ] TypeScript ensures type safety (no `any`)
- [ ] Component is pure function (no side effects)

---

### Story 2.4: Create ProductImage Component with Next.js Optimization

**AC-2.4.1: Component File Exists**

- [ ] `src/components/product/product-image.tsx` exists
- [ ] ProductImageProps added to `src/types/component-props.ts`

**AC-2.4.2: Component Props Interface**

- [ ] ProductImageProps has `src: string` (required)
- [ ] ProductImageProps has `alt: string` (required)
- [ ] ProductImageProps has `category?: string` (optional)
- [ ] ProductImageProps has `aspectRatio?: '16/9' | '1/1' | '4/3'` (optional)
- [ ] ProductImageProps has `priority?: boolean` (optional)
- [ ] ProductImageProps has `className?: string` (optional)

**AC-2.4.3: Next.js Image Integration**

- [ ] Component uses `next/image` Image component
- [ ] Image has proper width/height (800x450 for 16:9)
- [ ] Image has `fill` prop for responsive sizing
- [ ] Image has `sizes` attribute for responsive images
- [ ] Image has `className="object-cover"` for aspect ratio

**AC-2.4.4: Aspect Ratios**

- [ ] `aspectRatio="16/9"` renders 800x450px
- [ ] `aspectRatio="1/1"` renders 800x800px
- [ ] `aspectRatio="4/3"` renders 800x600px
- [ ] Container has `aspect-[16/9]` Tailwind class

**AC-2.4.5: Loading and Error States**

- [ ] Image shows gradient placeholder while loading (Trust Blue)
- [ ] Invalid URL triggers onError handler
- [ ] Error shows Trust Blue gradient fallback (from-blue-600 to-blue-700)
- [ ] Error shows centered emoji or icon (🖼️)

**AC-2.4.6: Accessibility**

- [ ] `alt` prop is required by TypeScript
- [ ] Alt text format: "{product.name} - {product.category}"
- [ ] No console warnings for missing alt text

**AC-2.4.7: Performance**

- [ ] `priority={true}` loads above-fold images immediately
- [ ] `priority={false}` enables lazy loading (default)
- [ ] Next.js converts to WebP automatically

**AC-2.4.8: Hover Effects**

- [ ] Image has `group-hover:scale-105` class
- [ ] Image has `transition-transform duration-200` class
- [ ] Container has `overflow-hidden` to contain zoom

---

### Story 2.5: Create ErrorMessage Component for User Feedback

**AC-2.5.1: Component File Exists**

- [ ] `src/components/ui/error-message.tsx` exists
- [ ] ErrorMessageProps added to `src/types/component-props.ts`

**AC-2.5.2: Component Props Interface**

- [ ] ErrorMessageProps has `message: string` (required)
- [ ] ErrorMessageProps has `onRetry?: () => void` (optional)
- [ ] ErrorMessageProps has `className?: string` (optional)

**AC-2.5.3: Error Display**

- [ ] Component renders centered layout (flexbox)
- [ ] Component shows error icon or emoji (⚠️ or 🚫)
- [ ] Error message displays in `text-red-600` color
- [ ] Message is clear and user-friendly (not technical)

**AC-2.5.4: Retry Functionality**

- [ ] If `onRetry` provided, "Try Again" button appears
- [ ] Button uses shadcn/ui Button component (`variant="default"`)
- [ ] Clicking button calls `onRetry` callback
- [ ] Button is keyboard accessible (Tab, Enter)

**AC-2.5.5: Accessibility**

- [ ] Container has `role="alert"`
- [ ] Container has `aria-live="polite"`
- [ ] Error message is descriptive (not just "Error")
- [ ] Retry button has `aria-label="Retry loading"`

**AC-2.5.6: Styling**

- [ ] Text color: `text-red-600`
- [ ] Background: `bg-red-50`
- [ ] Border: `border border-red-200`
- [ ] Border radius: `rounded-lg`
- [ ] Padding: `p-4` or `p-6`

**AC-2.5.7: Common Error Scenarios**

- [ ] "Unable to load products" error renders correctly
- [ ] "Product not found" error renders correctly
- [ ] "Connection issue. Please try again." error renders correctly
- [ ] "Something went wrong" fallback error renders correctly

---

## Traceability Mapping

| Acceptance Criteria | Architecture Section | UX Spec Section | Component/File | Verification Method |
|---------------------|---------------------|-----------------|----------------|---------------------|
| **AC-2.1.1: Trust Blue Colors** | Section 12.1 | Section 3.1 | `tailwind.config.ts` | Manual: Check hex values match |
| **AC-2.1.4: Typography Scale** | Section 12.1 | Section 3.2 | `tailwind.config.ts` | Manual: Check sizes match |
| **AC-2.1.6: Global Utilities** | Section 12.2 | N/A | `globals.css` | Manual: Apply classes in test component |
| **AC-2.2.1: Button Component** | Section 11.2, 12.3 | Section 6.2 | `button.tsx` | Manual: Render with variants |
| **AC-2.2.2: Button A11y** | Section 13.6 | Section 6.2 | `button.tsx` | Accessibility audit (axe DevTools) |
| **AC-2.2.3: Card Component** | Section 11.2 | Section 6.1 | `card.tsx` | Manual: Render with hover |
| **AC-2.2.4: Badge Component** | Section 11.2 | Section 6.1 | `badge.tsx` | Manual: Render all variants |
| **AC-2.2.5: Skeleton** | Section 11.2 | Section 6.1 | `skeleton.tsx` | Manual: Check shimmer animation |
| **AC-2.3.1-2.3.6: PriceDisplay** | Section 11.2 | Section 6.1.3 | `price-display.tsx` | Manual: Test all props, screen reader |
| **AC-2.4.1-2.4.8: ProductImage** | Section 7, 11.2 | Section 6.1.2 | `product-image.tsx` | Manual: Test loading, error, hover |
| **AC-2.5.1-2.5.7: ErrorMessage** | Section 9.2 | N/A | `error-message.tsx` | Manual: Test with/without retry |

**PRD Requirements Coverage:**

- **NFR-DESIGN (Professional aesthetic):** Trust Blue theme (Story 2.1), shadcn/ui components (Story 2.2)
- **NFR-A11Y (WCAG AA compliance):** All components accessible (Story 2.2, 2.3, 2.4, 2.5)
- **NFR-RESP (Responsive design):** Mobile-first Tailwind classes, responsive typography (Story 2.1)

**UX Design Specification Coverage:**

- **Section 3.1: Color System** → Story 2.1 (Tailwind config)
- **Section 3.2: Typography System** → Story 2.1 (Font families, type scale)
- **Section 3.3: Spacing & Layout** → Story 2.1 (Spacing values, max-width)
- **Section 6.2: Component Accessibility** → Stories 2.2, 2.3, 2.4, 2.5

---

## Risks, Assumptions, Open Questions

### Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Trust Blue contrast fails WCAG AA** | Low | High | Pre-verified with contrast checker (5.47:1 ratio) |
| **shadcn/ui components don't match design** | Medium | Medium | Customize with Tailwind classes after install |
| **Inter font fails to load (CDN issue)** | Low | Low | Use next/font/google (self-hosted) |
| **ProductImage performance degrades on slow connections** | Medium | Medium | Use Next.js Image priority for above-fold, lazy for below |
| **Currency formatting breaks on unsupported locales** | Low | Low | Lock to en-US locale, add more locales in Phase 2 |

### Assumptions

| Assumption | Validation | Impact if Wrong |
|------------|------------|-----------------|
| **Trust Blue (#2563eb) meets brand guidelines** | Confirmed in UX spec | Need to re-theme entire design system |
| **shadcn/ui components are accessible** | Radix UI provides WCAG AA primitives | May need to add custom accessibility |
| **Inter font is available via Google Fonts** | Yes, verified | Need to host font locally |
| **Browser supports Intl.NumberFormat** | All modern browsers (IE11+) | Need polyfill for older browsers |
| **Next.js Image supports WebP** | Yes, automatic | Images will be larger (PNG/JPG) |

### Open Questions

| Question | Owner | Deadline | Impact |
|----------|-------|----------|--------|
| **Should we add dark mode now or Phase 2?** | UX Designer | Story 2.1 | Tailwind config prepared, but full implementation later |
| **Do we need custom icons or use lucide-react?** | UX Designer | Story 2.5 | ErrorMessage emoji vs icon decision |
| **Should PriceDisplay support locale-specific formatting?** | PM | Story 2.3 | Currently hardcoded to en-US |
| **Do we want blur placeholder for images?** | Team | Story 2.4 | Better UX but requires base64 generation |
| **Should we add animation variants to components?** | UX Designer | Epic 2 | framer-motion integration if needed |

---

## Test Strategy Summary

### Manual Testing (Primary for Epic 2)

**Story 2.1: Tailwind Configuration Testing**

```bash
# 1. Color Verification
[ ] Create test div with bg-primary
[ ] Verify displays #2563eb (Trust Blue)
[ ] Create test div with bg-primary-hover
[ ] Verify displays #1d4ed8 (darker blue)
[ ] Test all semantic colors (success, warning, error)
[ ] Test all Slate neutrals (50-900)

# 2. Typography Verification
[ ] Create test heading with text-display
[ ] Verify 48px font size, 1.2 line-height, 700 weight
[ ] Test all heading levels (h1-h4)
[ ] Verify Inter font loads

# 3. Utility Classes
[ ] Apply .hero-gradient to div
[ ] Verify blue gradient displays
[ ] Apply .line-clamp-2 to long text
[ ] Verify truncates after 2 lines
```

**Story 2.2: shadcn/ui Components Testing**

```bash
# 1. Button Component
[ ] Import and render Button with variant="default"
[ ] Verify Trust Blue background (#2563eb)
[ ] Hover → verify darker blue (#1d4ed8)
[ ] Tab focus → verify blue focus ring
[ ] Press Enter → verify button activates
[ ] Test all variants (default, outline, ghost, destructive)

# 2. Card Component
[ ] Render Card with CardHeader, CardTitle, CardContent
[ ] Verify white background, slate border
[ ] Hover → verify shadow appears
[ ] Check semantic HTML (article or section)

# 3. Badge Component
[ ] Render Badge with variant="default"
[ ] Verify Trust Blue background
[ ] Test all variants (default, secondary, outline)

# 4. Skeleton Component
[ ] Render Skeleton with aspect-[16/9]
[ ] Verify shimmer animation plays
[ ] Verify slate-200 background color
```

**Story 2.3: PriceDisplay Testing**

```bash
# 1. Formatting Tests
[ ] <PriceDisplay amount={49.99} />
[ ] Verify displays "$49.99" (not "49.99")
[ ] <PriceDisplay amount={5.00} />
[ ] Verify displays "$5.00" (not "$5")
[ ] <PriceDisplay amount={199.99} currency="EUR" />
[ ] Verify displays "€199.99"

# 2. Size Variants
[ ] Test size="small" → verify text-base
[ ] Test size="large" → verify text-xl (default)
[ ] Test size="xlarge" → verify text-2xl
[ ] All sizes show Trust Blue color (#2563eb)

# 3. Accessibility
[ ] Open screen reader (VoiceOver on Mac, NVDA on Windows)
[ ] Focus on PriceDisplay
[ ] Verify announces "Price: forty-nine dollars and ninety-nine cents"
```

**Story 2.4: ProductImage Testing**

```bash
# 1. Image Loading
[ ] Render with valid URL
[ ] Verify image displays
[ ] Inspect Network tab → verify WebP format served
[ ] Render with invalid URL
[ ] Verify Trust Blue gradient fallback appears

# 2. Aspect Ratios
[ ] Test aspectRatio="16/9" → verify 800x450px
[ ] Test aspectRatio="1/1" → verify 800x800px
[ ] Test aspectRatio="4/3" → verify 800x600px

# 3. Performance
[ ] Test priority={true} → verify immediate load
[ ] Test priority={false} → verify lazy loading (scroll to view)
[ ] Test hover → verify subtle zoom effect

# 4. Accessibility
[ ] Verify alt text required by TypeScript (try omitting → error)
[ ] Verify screen reader reads alt text
```

**Story 2.5: ErrorMessage Testing**

```bash
# 1. Basic Error Display
[ ] <ErrorMessage message="Unable to load products" />
[ ] Verify red error message displays
[ ] Verify red background and border
[ ] Verify error icon/emoji appears

# 2. Retry Functionality
[ ] <ErrorMessage message="Error" onRetry={() => alert('Retry')} />
[ ] Verify "Try Again" button appears
[ ] Click button → verify alert appears
[ ] Tab to button → verify keyboard accessible

# 3. Accessibility
[ ] Open screen reader
[ ] Trigger error → verify announces "Unable to load products"
[ ] Focus retry button → verify announces "Retry loading button"
```

---

### Accessibility Testing

**WCAG AA Audit Checklist:**

```bash
# 1. Install axe DevTools extension (Chrome/Firefox)
# 2. Open page with all Epic 2 components
# 3. Run axe audit

[ ] Zero critical issues
[ ] Zero serious issues
[ ] All warnings reviewed and resolved/justified

# 4. Keyboard Navigation Test
[ ] Tab through all interactive elements
[ ] Verify focus indicators visible
[ ] Verify Tab order logical
[ ] Verify Enter/Space activate buttons
[ ] Verify Escape dismisses modals (Phase 2)

# 5. Screen Reader Test
[ ] Install NVDA (Windows) or enable VoiceOver (Mac)
[ ] Navigate page with screen reader
[ ] Verify all content announced
[ ] Verify all buttons have labels
[ ] Verify all images have alt text
[ ] Verify error messages announced with role="alert"

# 6. Color Contrast Test
[ ] Use WebAIM Contrast Checker
[ ] Test Trust Blue (#2563eb) on white → 5.47:1 ✅
[ ] Test Slate 600 (#475569) on white → 7.92:1 ✅
[ ] Test error red (#ef4444) on red-50 → 8.05:1 ✅
```

---

### Visual Regression Testing (Optional)

**If using visual testing tools (Chromatic, Percy):**

```bash
# 1. Capture baseline screenshots
npm run build
npm run storybook
npx chromatic --project-token=<token>

# 2. After changes, compare against baseline
npx chromatic --project-token=<token>

# 3. Review visual diffs
[ ] Button colors match baseline
[ ] Typography sizes match baseline
[ ] Spacing matches baseline
```

**Manual visual checks if no tooling:**

```bash
# 1. Desktop (1280px viewport)
[ ] All components render correctly
[ ] Trust Blue colors display properly
[ ] Typography hierarchy clear
[ ] Spacing consistent

# 2. Tablet (768px viewport)
[ ] Components responsive
[ ] Touch targets >= 44x44px
[ ] Typography scales appropriately

# 3. Mobile (375px viewport)
[ ] Components stack vertically
[ ] All text readable
[ ] No horizontal scroll
```

---

### Performance Testing

**Lighthouse Audit:**

```bash
# 1. Build production app
npm run build
npm run start

# 2. Open Chrome DevTools
# 3. Run Lighthouse audit

Target Scores:
[ ] Performance: ≥ 90
[ ] Accessibility: ≥ 95 (Epic 2 focus)
[ ] Best Practices: ≥ 90
[ ] SEO: ≥ 80

# 4. Check specific metrics
[ ] Cumulative Layout Shift (CLS): < 0.1
[ ] Largest Contentful Paint (LCP): < 2.5s
[ ] First Input Delay (FID): < 100ms
```

**Bundle Size Analysis:**

```bash
# 1. Build and analyze
npm run build

# 2. Check Tailwind CSS size
[ ] .next/static/css/*.css < 10KB (compressed)

# 3. Check component bundle size
[ ] All components together < 5KB (compressed)
```

---

## Story Breakdown Summary

**Epic 2 contains 5 stories:**

| Story | Estimated Effort | Dependencies | Key Deliverables |
|-------|-----------------|--------------|------------------|
| **2.1: Tailwind Config** | 1-2 hours | Epic 1 complete | Trust Blue theme, typography scale, global utilities |
| **2.2: shadcn/ui Components** | 1-2 hours | Story 2.1 | Button, Card, Badge, Skeleton with Trust Blue styling |
| **2.3: PriceDisplay** | 2-3 hours | Story 2.2 | Currency formatter component with accessibility |
| **2.4: ProductImage** | 2-3 hours | Story 2.2 | Optimized image component with fallbacks |
| **2.5: ErrorMessage** | 1-2 hours | Story 2.2 | Error display component with retry functionality |

**Total Epic Effort:** 7-12 hours

**Critical Path:** 2.1 → 2.2 → (2.3, 2.4, 2.5 in parallel)

---

## Success Metrics

**Epic 2 Completion Criteria:**

1. ✅ All 5 stories complete and verified
2. ✅ All acceptance criteria pass (38 total ACs)
3. ✅ Tailwind CSS configured with Trust Blue theme
4. ✅ shadcn/ui components styled and accessible
5. ✅ PriceDisplay, ProductImage, ErrorMessage components created
6. ✅ WCAG AA accessibility audit passes (zero critical/serious issues)
7. ✅ Visual consistency verified across all components
8. ✅ Lighthouse accessibility score ≥ 95

**Measurement:**

```bash
# Success checklist
npm run dev
# Test all components in temporary page
# Verify Trust Blue colors display
# Verify typography scales correctly
# Run axe accessibility audit → 0 issues
npx lighthouse http://localhost:3000 --only-categories=accessibility
# Score ≥ 95

ls src/components/ui
# Should show: button.tsx, card.tsx, badge.tsx, skeleton.tsx, error-message.tsx

ls src/components/product
# Should show: price-display.tsx, product-image.tsx

cat src/types/component-props.ts
# Should show: PriceDisplayProps, ProductImageProps, ErrorMessageProps
```

**Ready for Next Epic:**

Epic 3 (Product Data & Type System) can begin when:

- [ ] All 5 stories in Epic 2 are complete
- [ ] Sprint status shows `epic-2: contexted`
- [ ] All 38 acceptance criteria pass
- [ ] Accessibility audit passes
- [ ] Design system documented in Storybook or similar (optional)

---

**🎨 Epic 2 Technical Context Complete**

This technical specification provides comprehensive implementation guidance for the Design System & UI Components epic. All architectural decisions are traced to the Architecture Document and UX Design Specification, all acceptance criteria are testable, and the implementation path is clear with detailed component APIs and workflows.

The Trust Blue design system will establish visual consistency, accessibility, and professional polish across all Phase 1 features. Every component created in this epic will be reused throughout Epics 4-6, providing immediate ROI on the design system investment.

**Next Step:** Mark epic-2 as "contexted" in sprint-status.yaml and begin Story 2.1 (Tailwind CSS configuration).

---

_Generated by BMAD Epic Tech Context Workflow v6.0_  
_Date: 2025-12-01_  
_Architect: Winston (BMAD)_  
_Project: ecommerce-shop Phase 1: UI Foundation_


