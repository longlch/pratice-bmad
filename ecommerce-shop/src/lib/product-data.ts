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
    const related: Product[] = [];
    for (const id of product.relatedProducts) {
      const found = productsData.find(p => p.id === id);
      if (found) {
        related.push(found as Product);
        if (related.length >= limit) break;
      }
    }
    return related;
  }
  
  // Fallback: return other products from same category
  return (productsData as Product[])
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

