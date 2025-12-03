# Story 5.2: Create Breadcrumb Navigation Component

**Story ID:** 5.2
**Story Key:** 5-2-create-breadcrumb-navigation-component
**Epic:** Epic 5 - Product Detail Pages
**Status:** ready-for-dev
**Created:** 2025-12-03
**Priority:** High
**Estimated Complexity:** Small

---

## Story

As a **user**,
I want **breadcrumb navigation showing my current location**,
So that **I can easily navigate back to previous pages**.

---

## Acceptance Criteria

### AC1: Component File and TypeScript Interfaces
**Given** product detail page functionality needs breadcrumb navigation
**When** I create the Breadcrumb component
**Then** `src/components/layout/breadcrumb.tsx` exists with:
- TypeScript interface `BreadcrumbProps: { items: BreadcrumbItem[] }`
- TypeScript type `BreadcrumbItem: { label: string, href?: string }`
- Named export: `export function Breadcrumb`
- Accepts array of breadcrumb items as prop

### AC2: Breadcrumb Display Styling
**Given** the Breadcrumb component renders
**When** displaying breadcrumb items
**Then** it shows:
- Horizontal layout: `flex items-center gap-2`
- Text size: `text-sm`
- Default text color: `text-slate-600`
- Links: `text-blue-600 hover:text-blue-700 hover:underline`
- Current page (no href): `text-slate-900 font-semibold`
- Separator between items: "/" or "›" character with `text-slate-400`

### AC3: Breadcrumb Structure for Product Pages
**Given** breadcrumb is used on product detail page
**When** breadcrumb items are provided
**Then** it displays structure:
- Pattern: Home > {Category Name} > {Product Name}
- Example: "Home > Games > Premium Game Pass"
- Home link navigates to `/`
- Category link navigates to `/?category=games`
- Product Name is plain text (current page, not clickable)

### AC4: Semantic HTML and Accessibility
**Given** the Breadcrumb component renders
**When** inspecting HTML structure
**Then** it uses:
- `<nav>` element with `aria-label="Breadcrumb"`
- `<ol>` ordered list for breadcrumb items (semantic hierarchy)
- `<li>` for each breadcrumb item
- `aria-current="page"` on current page item (last item without href)
- Each link has proper `href` attribute
- Keyboard accessible (Tab navigation, Enter to activate)

### AC5: Responsive Behavior
**Given** the breadcrumb displays on different screen sizes
**When** viewed on mobile or desktop
**Then** it adapts:
- **Mobile:** May truncate long product names using `line-clamp-1` if needed
- **Desktop:** Show full breadcrumb without truncation
- Proper vertical spacing: `py-4` or similar padding
- Breadcrumb stays readable on all screen sizes

### AC6: Visual and Functional Verification
**Given** the Breadcrumb component is complete
**When** I test it on product detail page
**Then** I can verify:
- Breadcrumb displays "Home > Games > Product Name" pattern
- Clicking "Home" navigates to `/`
- Clicking category name navigates to `/?category=games`
- Current page (product name) is not clickable
- Screen reader announces breadcrumb navigation with "Breadcrumb" label
- Keyboard Tab navigation works through breadcrumb links

---

## Tasks / Subtasks

- [ ] **Task 1:** Create Breadcrumb component file with TypeScript types (AC: #1)
  - [ ] Create `src/components/layout/breadcrumb.tsx`
  - [ ] Define `BreadcrumbItem` type: `{ label: string, href?: string }`
  - [ ] Define `BreadcrumbProps` interface: `{ items: BreadcrumbItem[] }`
  - [ ] Import Next.js Link component
  - [ ] Export named function: `export function Breadcrumb`

- [ ] **Task 2:** Implement breadcrumb layout and styling (AC: #2, #3)
  - [ ] Create `<nav>` wrapper with `aria-label="Breadcrumb"`
  - [ ] Add `<ol>` ordered list with flex layout
  - [ ] Map over items array to render each breadcrumb item in `<li>`
  - [ ] Render links (with href) using Next.js Link
  - [ ] Render current page (no href) as plain `<span>`
  - [ ] Add separator "/" or "›" between items
  - [ ] Apply Tailwind classes for styling (text-sm, text-slate-600, hover states)

- [ ] **Task 3:** Implement semantic HTML and accessibility (AC: #4)
  - [ ] Use `<nav aria-label="Breadcrumb">` wrapper
  - [ ] Use `<ol>` for semantic ordered list
  - [ ] Use `<li>` for each breadcrumb item
  - [ ] Add `aria-current="page"` to current page item
  - [ ] Ensure all links have proper `href` attribute
  - [ ] Test keyboard navigation (Tab through links)

- [ ] **Task 4:** Add responsive behavior (AC: #5)
  - [ ] Apply `py-4` vertical padding
  - [ ] Add optional `line-clamp-1` for mobile long product names
  - [ ] Test on mobile (<640px) to verify readability
  - [ ] Test on desktop (≥1024px) to verify full breadcrumb display

- [ ] **Task 5:** Visual testing and verification (AC: #6)
  - [ ] Render breadcrumb with sample items: `[{label: 'Home', href: '/'}, {label: 'Games', href: '/?category=games'}, {label: 'Product Name'}]`
  - [ ] Click "Home" link → verify navigation to `/`
  - [ ] Click category link → verify navigation to `/?category=games`
  - [ ] Verify current page (last item) is not clickable
  - [ ] Test keyboard Tab navigation
  - [ ] Test screen reader announcements
  - [ ] Verify visual styling matches design (Trust Blue links)

---

## Dev Notes

### Architecture Compliance

**Component Structure (Architecture Section 11.2):**
- File location: `src/components/layout/breadcrumb.tsx`
- Named export pattern: `export function Breadcrumb`
- Props interface defined in component file (small component, inline types OK)
- Follows domain-based organization (layout/ folder for navigation components)

**Routing & Navigation (Architecture Section 8.1):**
- Use Next.js Link for all internal navigation
- Import from 'next/link'
- Links to homepage: `href="/"`
- Links to category filter: `href="/?category={slug}"`

**Semantic HTML (Architecture Section 13.6):**
- `<nav>` with `aria-label="Breadcrumb"` for navigation landmark
- `<ol>` ordered list (hierarchical navigation structure)
- `<li>` for each item (list semantics)
- `aria-current="page"` on current page item
- Keyboard accessible (all links focusable)

**Trust Blue Theme:**
- Links use `text-blue-600` (Trust Blue #2563eb)
- Hover state: `hover:text-blue-700 hover:underline`
- Current page: `text-slate-900 font-semibold`
- Separator: `text-slate-400`

### Technical Requirements

**TypeScript:**
- Define `BreadcrumbItem` type in component file:
  ```typescript
  interface BreadcrumbItem {
    label: string;
    href?: string; // undefined = current page
  }
  ```
- Define `BreadcrumbProps` interface:
  ```typescript
  interface BreadcrumbProps {
    items: BreadcrumbItem[];
  }
  ```

**Component Implementation Pattern:**
```typescript
// src/components/layout/breadcrumb.tsx

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-slate-900 font-semibold"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-slate-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

**Usage Example (in Product Detail Page):**
```typescript
// In src/app/products/[slug]/page.tsx (Story 5.3)

import { Breadcrumb } from '@/components/layout/breadcrumb';

// Build breadcrumb items from product data
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: categoryName, href: `/?category=${product.category}` },
  { label: product.name } // No href = current page
];

// Render breadcrumb
<Breadcrumb items={breadcrumbItems} />
```

### Library & Framework Requirements

**Next.js 14+ (Architecture Section 1.1):**
- Use Next.js Link component for navigation
- Import: `import Link from 'next/link'`
- Link handles client-side navigation automatically
- No page reload on breadcrumb clicks

**Tailwind CSS:**
- Flexbox layout: `flex items-center gap-2`
- Text styling: `text-sm`, `text-slate-600`, `text-blue-600`
- Hover states: `hover:text-blue-700 hover:underline`
- Current page: `font-semibold`
- Responsive padding: `py-4`

**TypeScript 5.x:**
- Inline type definitions (small component)
- Optional href prop: `href?:string`
- Array mapping with proper key prop

### File Structure Requirements

**Component File:**
- Path: `src/components/layout/breadcrumb.tsx`
- Types: Inline in same file (BreadcrumbItem, BreadcrumbProps)
- Export: Named export `export function Breadcrumb`

**No Additional Files Needed:**
- Types are small, keep inline
- No external dependencies beyond Next.js Link
- Standalone component (no sub-components)

### Testing Requirements

**Manual Testing Checklist:**
1. Render breadcrumb with test data:
   ```typescript
   const testItems = [
     { label: 'Home', href: '/' },
     { label: 'Games', href: '/?category=games' },
     { label: 'Premium Game Pass' }
   ];
   ```
2. Verify visual layout (horizontal, separated by "/")
3. Click "Home" link → navigate to `/`
4. Click "Games" link → navigate to `/?category=games`
5. Verify "Premium Game Pass" is not clickable
6. Test keyboard navigation (Tab through links, Enter to activate)
7. Test on mobile (verify no layout break)
8. Test with long product name (verify truncation if needed)

**Accessibility Testing:**
- Tab through breadcrumb with keyboard
- Verify focus indicators visible
- Test with screen reader (NVDA, VoiceOver, JAWS)
- Verify "Breadcrumb" navigation landmark announced
- Verify current page has `aria-current="page"`
- Check semantic HTML structure with DevTools

### Project Structure Notes

**Component Organization:**
- Location: `src/components/layout/` (navigation/layout components)
- Related components: Header, Footer (will be created in Epic 6)
- Standalone component (no dependencies on other custom components)

**No Conflicts with Existing Code:**
- New component (no modifications to existing files)
- Uses only Next.js Link (built-in)
- Follows established naming and organization patterns

**Naming Conventions (Architecture Section 5):**
- File: `breadcrumb.tsx` (kebab-case)
- Component: `Breadcrumb` (PascalCase)
- Types: `BreadcrumbItem`, `BreadcrumbProps` (PascalCase)
- CSS classes: Use Tailwind utilities only

### References

**Source Documents:**
- [Architecture Section 8.1: Routing & Navigation](docs/architecture.md#8.1)
- [Architecture Section 13.6: Accessibility Pattern Rules](docs/architecture.md#13.6)
- [Epic 5 Tech Context: Breadcrumb Specification](docs/sprint-artifacts/epic-5-tech-context.md#3.2)
- [Epics Document: Story 5.2 Acceptance Criteria](docs/epics.md#1106-1170)

**Prerequisites:**
- None (standalone component)
- Will be used in Story 5.3 (Product detail page)

---

## Previous Story Intelligence

**Lessons from Story 5.1 (ProductDetail):**
- Use semantic HTML for SEO and accessibility
- Apply Trust Blue theme for links (#2563eb)
- Test responsive behavior at all breakpoints
- Verify keyboard accessibility
- Use Tailwind utility classes for styling

**Patterns Established in Epic 4:**
- Consistent use of Trust Blue for interactive elements
- Named exports for all components
- TypeScript interfaces for props
- ARIA labels for accessibility
- Mobile-first responsive design

**Common Patterns:**
- Flexbox for horizontal layouts
- gap-2 for spacing between items
- text-sm for secondary text
- hover states for interactive elements

---

## Latest Tech Information

**Next.js 14+ Link Component:**
- Automatic prefetching on hover
- Client-side navigation (no page reload)
- Back button works correctly
- Preserves scroll position
- Import: `import Link from 'next/link'`

**Breadcrumb Navigation Best Practices:**
- Use `<nav>` with `aria-label="Breadcrumb"`
- Use `<ol>` for semantic hierarchy
- Add `aria-current="page"` to current page
- Don't make current page clickable
- Use "/" or "›" separator for clarity
- Keep breadcrumb simple and linear

**WCAG AA Accessibility:**
- Text color contrast ratio ≥4.5:1
- Keyboard navigation required
- Screen reader announces navigation landmark
- Focus indicators visible
- Links have descriptive text

---

## Project Context Reference

**Phase 1 Scope:**
- Product browsing UI with breadcrumb navigation
- Breadcrumb helps users understand location in site hierarchy
- Simple, clean design matching Trust Blue theme

**Trust Blue Theme:**
- Link color: #2563eb (blue-600)
- Hover: #1d4ed8 (blue-700)
- Used consistently across all navigation elements

**Component Hierarchy:**
```
Breadcrumb (this story)
└── Next.js Link (built-in)
```

**Will be used in:**
- Story 5.3: Product detail page at `/products/[slug]`
- Displays: Home > Category > Product Name

---

## Definition of Done

✅ **Story 5.2 is DONE when:**

1. **Code Complete:**
   - [ ] `src/components/layout/breadcrumb.tsx` created
   - [ ] `BreadcrumbItem` and `BreadcrumbProps` types defined
   - [ ] Component uses Next.js Link for navigation
   - [ ] TypeScript compiles without errors
   - [ ] No linting warnings

2. **Functionality Complete:**
   - [ ] All 6 acceptance criteria (AC1-AC6) met
   - [ ] Breadcrumb displays horizontal layout with separators
   - [ ] Links navigate to correct pages
   - [ ] Current page is not clickable
   - [ ] Keyboard navigation works
   - [ ] Responsive on mobile and desktop

3. **Quality Complete:**
   - [ ] Semantic HTML with `<nav>`, `<ol>`, `<li>`
   - [ ] `aria-label="Breadcrumb"` on nav
   - [ ] `aria-current="page"` on current item
   - [ ] WCAG AA accessibility compliance
   - [ ] Trust Blue link styling applied
   - [ ] Lighthouse accessibility score ≥90

4. **Testing Complete:**
   - [ ] Manual testing with sample breadcrumb items
   - [ ] Click testing (Home, Category links work)
   - [ ] Keyboard navigation testing
   - [ ] Screen reader testing
   - [ ] Responsive testing on mobile/desktop
   - [ ] Visual verification of styling

5. **Documentation Complete:**
   - [ ] Dev notes updated with completion details
   - [ ] File list updated with created files
   - [ ] Any learnings documented for Story 5.3

---

## Dev Agent Record

### Context Reference

Story context engine analysis completed - comprehensive developer guide created.

**Key Context Sources:**
- Epic 5 technical context document (Section 3.2)
- Architecture sections 8.1 (Routing), 13.6 (Accessibility)
- Epics.md Story 5.2 detailed acceptance criteria
- Epic 4 established navigation patterns

### Agent Model Used

_To be filled by dev agent during implementation_

### Debug Log References

_To be filled by dev agent during implementation_

### Completion Notes List

_To be filled by dev agent during implementation_

### File List

**Files to be created:**
- `src/components/layout/breadcrumb.tsx` - Breadcrumb navigation component

**Files to be imported:**
- `next/link` - Next.js Link component (built-in)

**Files that will import this component (future):**
- `src/app/products/[slug]/page.tsx` - Product detail page (Story 5.3)

---

**Story Status:** ready-for-dev
**Last Updated:** 2025-12-03
**Created By:** Bob (Scrum Master) via Ultimate BMad Method Story Context Engine
