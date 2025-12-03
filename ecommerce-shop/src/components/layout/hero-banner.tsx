/**
 * HeroBanner Component
 *
 * Full-width promotional hero section at top of homepage.
 * Features Trust Blue gradient background and centered content.
 *
 * Story 4.4: Implement Homepage with Hero, Filter, and Product Grid
 * Architecture Section 11.2: HeroBanner Component (lines 904-926)
 */

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
