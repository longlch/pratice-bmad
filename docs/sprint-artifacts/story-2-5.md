# Story 2.5: Create ErrorMessage Component for User Feedback

Status: drafted

## Story

As a user,
I want clear error messages with retry options when something goes wrong,
So that I understand the issue and can take action to resolve it.

## Acceptance Criteria

### AC-1: Component File and Props Interface
**Given** base UI components exist (Story 2.2 complete)
**When** I create the ErrorMessage component
**Then** src/components/ui/error-message.tsx exists with:
- TypeScript interface ErrorMessageProps:
  - message: string (required) - user-friendly error message
  - onRetry?: () => void (optional) - retry callback
  - className?: string (optional)
- Named export: `export function ErrorMessage`
- Semantic HTML structure (<div> with role="alert")

### AC-2: Error Display Styling
**And** the component displays error state:
- Centered layout with flexbox
- Error icon or emoji (⚠️ or 🚫)
- Error message text in red-600 color
- Clear, user-friendly message (not technical stack traces)
- Proper spacing (padding, margins)
- Background: bg-red-50 (light red tint)
- Border: border border-red-200
- Rounded corners: rounded-lg
- Proper padding: p-4 or p-6

### AC-3: Optional Retry Functionality
**And** optional retry functionality:
- If onRetry provided, show "Try Again" button
- Button uses shadcn/ui Button component (variant="default")
- Click calls onRetry callback
- Button is keyboard accessible
- Loading state during retry (optional enhancement)

### AC-4: Accessibility Implementation
**And** accessibility is implemented:
- role="alert" for screen reader announcement
- aria-live="polite" for dynamic errors
- Error message is descriptive (not just "Error")
- Retry button has aria-label="Retry loading"

### AC-5: Common Error Scenarios
**And** common error scenarios are handled:
- "Unable to load products" → generic data loading error
- "Product not found" → specific product error
- "Connection issue. Please try again." → network error
- "Something went wrong" → unknown error fallback

### AC-6: Visual Verification
**And** I can verify it works:
- Render with message="Unable to load products"
- Shows red error with message
- Render with onRetry prop → shows "Try Again" button
- Click button → calls onRetry callback
- Screen reader announces error message

## Tasks / Subtasks

### Task 1: Extend TypeScript Types (AC: #1)
- [ ] Add ErrorMessageProps to src/types/component-props.ts
- [ ] Define all required and optional props
- [ ] Add JSDoc comments for each prop
- [ ] Export interface for use in component

### Task 2: Create ErrorMessage Component Structure (AC: #1)
- [ ] Create src/components/ui/error-message.tsx
- [ ] Import Button from '@/components/ui/button'
- [ ] Import cn utility from '@/lib/utils'
- [ ] Import ErrorMessageProps type
- [ ] Set up component function with proper props destructuring
- [ ] Export named function ErrorMessage

### Task 3: Implement Error Display UI (AC: #2)
- [ ] Create container div with flexbox centering
- [ ] Add role="alert" and aria-live="polite" attributes
- [ ] Apply error styling (bg-red-50, border-red-200, rounded-lg)
- [ ] Add proper padding (p-6) and spacing
- [ ] Create inner flex-col layout for icon and text
- [ ] Add error icon/emoji (⚠️ or 🚫)
- [ ] Style icon with appropriate size (text-4xl or text-5xl)
- [ ] Display message text with text-red-600 color
- [ ] Apply proper text sizing (text-lg or text-xl)
- [ ] Add spacing between icon and text (mb-4)

### Task 4: Implement Optional Retry Button (AC: #3)
- [ ] Check if onRetry prop is provided (conditional rendering)
- [ ] Render Button component if onRetry exists
- [ ] Set variant="default" to use Trust Blue theme
- [ ] Attach onClick handler to call onRetry callback
- [ ] Add "Try Again" text to button
- [ ] Add aria-label="Retry loading" for accessibility
- [ ] Add margin-top spacing (mt-4) between message and button
- [ ] Ensure button is keyboard accessible (Tab, Enter)

### Task 5: Ensure Accessibility Compliance (AC: #4)
- [ ] Verify role="alert" on container
- [ ] Verify aria-live="polite" on container
- [ ] Ensure message is descriptive and user-friendly
- [ ] Add aria-label to retry button
- [ ] Test with screen reader (message announced)
- [ ] Verify keyboard navigation works
- [ ] Check Tab order is logical

### Task 6: Create Test Examples (AC: #5, #6)
- [ ] Update src/app/page.tsx with ErrorMessage test section
- [ ] Test basic error (no retry): "Unable to load products"
- [ ] Test error with retry callback
- [ ] Test all common error scenarios:
  - "Unable to load products"
  - "Product not found"
  - "Connection issue. Please try again."
  - "Something went wrong"
- [ ] Test onRetry callback execution
- [ ] Create visual examples with different message lengths
- [ ] Test screen reader announces errors correctly

### Task 7: Testing and Validation
- [ ] Verify TypeScript compilation (0 errors)
- [ ] Verify ESLint passes (0 errors)
- [ ] Run production build successfully
- [ ] Test on mobile device or responsive view
- [ ] Test screen reader announcements (VoiceOver/NVDA)
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Verify button click triggers callback
- [ ] Check visual consistency with design system

### Task 8: Documentation
- [ ] Add comprehensive JSDoc to component
- [ ] Include usage examples in JSDoc
- [ ] Document accessibility features
- [ ] Document common error message patterns
- [ ] Add notes to completion record

## Dev Notes

### Implementation Details

**Component Structure:**
```typescript
export function ErrorMessage({
  message,
  onRetry,
  className
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6",
        "bg-red-50 border border-red-200 rounded-lg",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="text-5xl mb-4">⚠️</div>
      <p className="text-red-600 text-lg text-center mb-4">{message}</p>
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

**Common Error Messages:**
```typescript
// Suggested constants file (optional):
export const ERROR_MESSAGES = {
  PRODUCTS_LOAD_FAILED: "Unable to load products",
  PRODUCT_NOT_FOUND: "Product not found",
  NETWORK_ERROR: "Connection issue. Please try again.",
  UNKNOWN_ERROR: "Something went wrong",
} as const;
```

### Architectural Alignment

**Architecture Section 9.2: Error Display Components**
- User-friendly error messages (not technical)
- Retry functionality for recoverable errors
- Semantic colors (red for errors)
- Accessibility-first design

**Architecture Section 13.5: Error Handling Patterns**
- Graceful error display
- Clear user communication
- Action buttons for recovery
- No technical stack traces exposed to users

**Architecture Section 13.6: Accessibility Pattern Rules**
- WCAG AA compliant
- role="alert" for screen reader announcements
- Descriptive error messages
- Keyboard accessible retry actions

**UX Design Section 6.2: Component Accessibility**
- Error states must be clearly communicated
- Interactive elements must be keyboard accessible
- Color must not be the only indicator (icon + text)
- Minimum 44x44px touch targets for buttons

### Trust Blue Theme Usage

**Error Color Palette:**
- Background: `bg-red-50` (#fef2f2)
- Border: `border-red-200` (#fecaca)
- Text: `text-red-600` (#dc2626)
- Contrast ratio: 8.05:1 ✅ (exceeds WCAG AA 4.5:1)

**Button Styling:**
- Uses Trust Blue (default Button variant)
- Background: `bg-primary` (#2563eb)
- Hover: `hover:bg-primary-hover` (#1d4ed8)
- Maintains brand consistency even in error states

### Dependencies

**Required:**
- @/components/ui/button (shadcn/ui Button from Story 2.2)
- @/lib/utils (cn() function)
- @/types/component-props (ErrorMessageProps interface)
- TypeScript 5.x

**Optional:**
- lucide-react (for icon instead of emoji, if preferred)

### Learnings from Previous Stories

**From Story 2.3 (PriceDisplay) & Story 2.4 (ProductImage):**

- **Type Definitions Pattern**
  - Add ErrorMessageProps to existing src/types/component-props.ts
  - Follow JSDoc documentation pattern
  - Use optional properties with `?` suffix

- **Trust Blue Theme Consistency**
  - ErrorMessage uses red-600 for error state (semantic color)
  - Retry button uses Trust Blue (bg-primary) for brand consistency
  - Background tints (red-50) provide subtle context

- **Component Structure Pattern**
  - Props destructuring with defaults
  - cn() utility for className merging
  - Named exports (export function ComponentName)
  - Comprehensive JSDoc with usage examples

- **Accessibility First**
  - Required ARIA attributes (role, aria-label, aria-live)
  - Semantic HTML (<div> with proper role)
  - Keyboard navigation support
  - Screen reader testing

- **Test Page Integration**
  - src/app/page.tsx used for component testing
  - Add clear sections for each component
  - Test all variants and edge cases
  - Include visual examples and notes

**From Epic 2 Tech Spec (tech-spec-epic-2.md):**

- **Error Message Component Specification (Section: APIs and Interfaces)**
  - Three props: message (required), onRetry (optional), className (optional)
  - role="alert" and aria-live="polite" for accessibility
  - Red color palette for error state
  - Optional retry button using shadcn/ui Button
  - User-friendly messages (no technical errors)

### Project Structure Notes

**Expected File Structure After Story 2.5:**
```
src/
  types/
    component-props.ts ← EXTEND (add ErrorMessageProps)
  components/
    ui/
      button.tsx ← EXISTS (from Story 2.2)
      card.tsx ← EXISTS (from Story 2.2)
      badge.tsx ← EXISTS (from Story 2.2)
      skeleton.tsx ← EXISTS (from Story 2.2)
      error-message.tsx ← NEW (Story 2.5)
    product/
      price-display.tsx ← EXISTS (from Story 2.3)
      product-image.tsx ← EXISTS (from Story 2.4)
```

**Integration Points:**
- ErrorMessage will be used in ProductGrid loading errors (Epic 4)
- ErrorMessage will be used in Product Detail 404 pages (Epic 5)
- ErrorMessage will be used in error.tsx boundary (Epic 6)
- ErrorMessage will be used in data loading failures across all pages

### References

**Architecture Document:**
- Section 9.2: Error Display Components (ErrorMessage pattern)
- Section 13.5: Error Handling Patterns
- Section 13.6: Accessibility Pattern Rules
- Section 13.3: Component Structure Pattern

**Technical Specification (Epic 2):**
- docs/sprint-artifacts/tech-spec-epic-2.md
- Story 2.5: Complete acceptance criteria and implementation details
- Section: Error Handling Strategy
- Section: Accessibility Requirements

**Epic Breakdown:**
- docs/epics.md: Story 2.5 (lines 442-513)
- Epic 2 Overview: Design System & UI Components
- Prerequisites: Story 2.2 (Button component) complete

**UX Design Specification:**
- Section 6.2: Component Accessibility Requirements
- Section 3.1: Color System (semantic error colors)
- Section 6.1: Component Interaction Patterns

**WCAG 2.1 Guidelines:**
- 1.4.3 Contrast (Minimum) - Level AA
- 2.1.1 Keyboard - Level A
- 4.1.3 Status Messages - Level AA (role="alert")

## Dev Agent Record

### Context Reference

**Story Context:** Epic 2, Story 2.5 (Final story in Epic 2)
**Dependencies:** Stories 1.1 (Next.js setup), 2.2 (Button component) complete
**Integration:** Will be used in Epic 4 (ProductGrid), Epic 5 (ProductDetail), Epic 6 (error boundaries)

### Prerequisites Checklist

**✅ Completed Prerequisites:**
- [x] Story 1.1: Next.js project initialized with TypeScript and Tailwind
- [x] Story 2.1: Tailwind configured with Trust Blue theme
- [x] Story 2.2: shadcn/ui Button component installed and styled
- [x] Story 2.3: PriceDisplay component created (pattern reference)
- [x] Story 2.4: ProductImage component created (pattern reference)
- [x] src/types/component-props.ts exists and ready for extension
- [x] src/lib/utils.ts cn() utility available
- [x] Trust Blue theme colors defined and accessible

**🔍 Verification Commands:**
```bash
# Check Button component exists
ls src/components/ui/button.tsx

# Check types file exists
ls src/types/component-props.ts

# Check cn() utility exists
ls src/lib/utils.ts

# Check Tailwind config has semantic colors
grep -A 5 "error:" tailwind.config.ts
```

### Agent Model Used

**Model:** _To be filled by implementing agent_
**Implementation Date:** _To be filled_
**Session Duration:** _To be filled_
**Tool Calls:** _To be filled_

### Debug Log References

_To be filled by implementing agent_

### Completion Notes List

_To be filled by implementing agent upon completion_

### File List

**NEW FILES:**
- `ecommerce-shop/src/components/ui/error-message.tsx` - ErrorMessage component

**MODIFIED FILES:**
- `ecommerce-shop/src/types/component-props.ts` - Added ErrorMessageProps interface
- `ecommerce-shop/src/app/page.tsx` - Added ErrorMessage test section

**NO FILES DELETED**

**Directory Structure:**
```
src/
  types/
    component-props.ts ← EXTENDED (Story 2.5 - added ErrorMessageProps)
  components/
    ui/
      button.tsx ← EXISTS (from Story 2.2)
      error-message.tsx ← NEW (Story 2.5)
    product/
      price-display.tsx ← EXISTS (from Story 2.3)
      product-image.tsx ← EXISTS (from Story 2.4)
```

---

## Epic 2 Completion Status

**Story 2.5 is the FINAL story in Epic 2: Design System & UI Components**

Upon completion of Story 2.5:
- [ ] Update sprint-status.yaml: `2-5-create-errormessage-component-for-user-feedback: done`
- [ ] Verify all Epic 2 stories are done (2.1, 2.2, 2.3, 2.4, 2.5)
- [ ] Run Epic 2 retrospective (optional but recommended)
- [ ] Begin Epic 3: Product Data & Type System

**Epic 2 Summary:**
- ✅ Story 2.1: Tailwind CSS configured with Trust Blue theme
- ✅ Story 2.2: shadcn/ui components installed (Button, Card, Badge, Skeleton)
- ✅ Story 2.3: PriceDisplay component created
- ✅ Story 2.4: ProductImage component created
- ⏳ Story 2.5: ErrorMessage component (current story)

**Epic 2 Deliverables:**
1. Complete Trust Blue design system
2. 8 reusable UI components (Button, Card, Badge, Skeleton, PriceDisplay, ProductImage, ErrorMessage)
3. Type-safe component props (component-props.ts)
4. Accessible, WCAG AA compliant components
5. Responsive, mobile-first design patterns

---

_This story was generated using the BMAD BMM create-story workflow v1.0_  
_Date: 2025-12-01_  
_Scrum Master: BMAD SM Agent_  
_Project: ecommerce-shop Phase 1: UI Foundation_

