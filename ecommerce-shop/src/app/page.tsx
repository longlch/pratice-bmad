import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceDisplay } from "@/components/product/price-display";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <main className="mx-auto max-w-6xl space-y-8">
        {/* Trust Blue Theme Verification Header */}
        <div className="space-y-4">
          <h1 className="text-h1 text-foreground">Trust Blue Theme - Stories 1.1 & 2.3 Complete ✓</h1>
          <p className="text-lg text-muted-foreground">
            Next.js 16 with TypeScript, Tailwind CSS v4, shadcn/ui, and PriceDisplay component.
          </p>
        </div>

        {/* Story 2.3: PriceDisplay Component Test */}
        <Card className="border-blue-600">
          <CardHeader>
            <CardTitle>Story 2.3: PriceDisplay Component</CardTitle>
            <CardDescription>Currency formatting with Trust Blue styling and accessibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Size Variants */}
            <div className="space-y-3">
              <h3 className="text-h4">Size Variants (USD)</h3>
              <div className="flex items-end gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Small</p>
                  <PriceDisplay amount={49.99} size="small" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Large (Default)</p>
                  <PriceDisplay amount={49.99} size="large" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">XLarge</p>
                  <PriceDisplay amount={49.99} size="xlarge" />
                </div>
              </div>
            </div>

            {/* Currency Formatting */}
            <div className="space-y-3">
              <h3 className="text-h4">Currency Support</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">USD (Default)</p>
                  <PriceDisplay amount={49.99} currency="USD" />
                  <PriceDisplay amount={5.00} currency="USD" size="small" />
                  <PriceDisplay amount={199.99} currency="USD" size="small" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">EUR</p>
                  <PriceDisplay amount={49.99} currency="EUR" />
                  <PriceDisplay amount={5.00} currency="EUR" size="small" />
                  <PriceDisplay amount={199.99} currency="EUR" size="small" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">GBP</p>
                  <PriceDisplay amount={49.99} currency="GBP" />
                  <PriceDisplay amount={5.00} currency="GBP" size="small" />
                  <PriceDisplay amount={199.99} currency="GBP" size="small" />
                </div>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="space-y-3">
              <h3 className="text-h4">Product Card Examples</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="h-32 bg-slate-200 rounded"></div>
                    <h4 className="font-semibold">Premium Software License</h4>
                    <PriceDisplay amount={99.99} size="large" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="h-32 bg-slate-200 rounded"></div>
                    <h4 className="font-semibold">Game Key - AAA Title</h4>
                    <PriceDisplay amount={59.99} size="large" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="h-32 bg-slate-200 rounded"></div>
                    <h4 className="font-semibold">AI Tool Subscription</h4>
                    <PriceDisplay amount={29.99} size="large" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Accessibility Note */}
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                <strong>✓ Accessibility:</strong> Each price includes an ARIA label (e.g., "Price: $49.99") 
                for screen readers. Inspect the element to see the aria-label attribute.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Typography Scale Test */}
        <Card>
          <CardHeader>
            <CardTitle>Typography Scale</CardTitle>
            <CardDescription>Trust Blue theme custom typography classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-display">Display Text (3rem)</div>
            <div className="text-h1">Heading 1 (2.25rem)</div>
            <div className="text-h2">Heading 2 (1.875rem)</div>
            <div className="text-h3">Heading 3 (1.5rem)</div>
            <div className="text-h4">Heading 4 (1.25rem)</div>
          </CardContent>
        </Card>

        {/* Component Test */}
        <Card>
          <CardHeader>
            <CardTitle>shadcn/ui Components with Trust Blue</CardTitle>
            <CardDescription>Testing Button, Badge, Card, and Skeleton components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Buttons */}
            <div className="space-y-2">
              <h3 className="text-h4">Buttons</h3>
              <div className="flex gap-4">
                <Button>Primary Button (Trust Blue)</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-2">
              <h3 className="text-h4">Badges</h3>
              <div className="flex gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            {/* Skeleton */}
            <div className="space-y-2">
              <h3 className="text-h4">Skeleton Loading</h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Card Hover Test */}
        <Card className="product-card-hover">
          <CardHeader>
            <CardTitle>Product Card Hover Effect</CardTitle>
            <CardDescription>Hover over this card to see the Trust Blue shadow effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2">
              This card demonstrates the custom .product-card-hover class with Trust Blue shadow.
              Notice the smooth transition and elevated shadow when you hover.
            </p>
          </CardContent>
        </Card>

        {/* Hero Gradient Test */}
        <div className="hero-gradient rounded-lg p-8 text-white">
          <h2 className="text-h2">Hero Gradient Background</h2>
          <p className="mt-2">Trust Blue gradient from #2563eb to its darker variant</p>
        </div>

        {/* Color Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Trust Blue Color Palette</CardTitle>
            <CardDescription>Primary colors from the theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <div className="h-16 rounded bg-primary"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">#2563eb</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded bg-secondary"></div>
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-muted-foreground">Slate-100</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded bg-accent"></div>
                <p className="text-sm font-medium">Accent</p>
                <p className="text-xs text-muted-foreground">Blue-50</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded bg-destructive"></div>
                <p className="text-sm font-medium">Destructive</p>
                <p className="text-xs text-muted-foreground">Red-500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <Card className="border-primary">
          <CardContent className="pt-6">
            <p className="text-center text-lg font-medium text-foreground">
              ✅ All Acceptance Criteria Met - Story 1.1 Complete
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
