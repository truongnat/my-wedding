/**
 * Centralized caching configuration for the application
 * Implements Requirements 6.2, 6.4, 6.5
 *
 * This file documents all caching strategies used throughout the application
 * for consistency and maintainability.
 */

/**
 * TanStack Query Cache Configuration
 * Used in lib/tanstack/query-client.ts
 */
export const QUERY_CACHE_CONFIG = {
  // Default configuration for all queries
  default: {
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - garbage collection
    refetchOnWindowFocus: false,
    retry: 1,
  },

  // Guest messages - relatively static content
  guestMessages: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes - keep longer
    refetchOnMount: false,
  },

  // RSVP submissions - more dynamic, shorter cache
  rsvpSubmissions: {
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true,
  },
} as const;

/**
 * Next.js ISR (Incremental Static Regeneration) Configuration
 * Used in app/page.tsx and API routes
 */
export const ISR_CONFIG = {
  // Main page revalidation
  homePage: 300, // 5 minutes

  // API routes revalidation
  guestMessagesApi: 300, // 5 minutes
} as const;

/**
 * HTTP Cache-Control Headers Configuration
 * Used in API route responses
 */
export const HTTP_CACHE_CONFIG = {
  // Guest messages API - public, cacheable content
  guestMessages: {
    maxAge: 60, // Browser cache: 1 minute
    sMaxAge: 300, // CDN cache: 5 minutes
    staleWhileRevalidate: 600, // Serve stale for 10 minutes while revalidating
    header: 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  },

  // RSVP submissions - no caching for POST requests
  rsvpPost: {
    header: 'no-store, no-cache, must-revalidate',
  },

  // Static assets - long-term caching
  staticAssets: {
    maxAge: 31536000, // 1 year
    immutable: true,
    header: 'public, max-age=31536000, immutable',
  },
} as const;

/**
 * Stale-While-Revalidate Pattern
 *
 * This pattern allows serving stale content while fetching fresh data in the background.
 * Benefits:
 * - Improved perceived performance
 * - Reduced server load
 * - Better user experience during revalidation
 *
 * Implementation:
 * 1. API Routes: Use Cache-Control header with stale-while-revalidate directive
 * 2. TanStack Query: Automatic background refetching with stale data serving
 * 3. Next.js ISR: Automatic page regeneration with stale page serving
 */

/**
 * Cache Invalidation Strategy
 *
 * When to invalidate caches:
 * 1. After mutations (RSVP submission, message approval)
 * 2. On user-triggered refresh
 * 3. After ISR revalidation period
 *
 * Implementation:
 * - TanStack Query: queryClient.invalidateQueries()
 * - Next.js: revalidatePath() or revalidateTag()
 * - HTTP: Cache-Control headers with appropriate max-age
 */

/**
 * Helper function to generate Cache-Control header
 */
export function generateCacheControlHeader(config: {
  maxAge?: number;
  sMaxAge?: number;
  staleWhileRevalidate?: number;
  isPublic?: boolean;
  immutable?: boolean;
  noStore?: boolean;
}): string {
  const parts: string[] = [];

  if (config.noStore) {
    return 'no-store, no-cache, must-revalidate';
  }

  if (config.isPublic !== false) {
    parts.push('public');
  }

  if (config.maxAge !== undefined) {
    parts.push(`max-age=${config.maxAge}`);
  }

  if (config.sMaxAge !== undefined) {
    parts.push(`s-maxage=${config.sMaxAge}`);
  }

  if (config.staleWhileRevalidate !== undefined) {
    parts.push(`stale-while-revalidate=${config.staleWhileRevalidate}`);
  }

  if (config.immutable) {
    parts.push('immutable');
  }

  return parts.join(', ');
}
