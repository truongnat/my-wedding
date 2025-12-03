# Caching Strategy Documentation

This document outlines the comprehensive caching strategy implemented in the wedding website application, addressing Requirements 6.2, 6.4, and 6.5.

## Overview

The application implements a multi-layered caching strategy to optimize performance and reduce server load:

1. **Browser Caching** - Client-side HTTP cache
2. **CDN Caching** - Edge network caching with Vercel/CDN
3. **TanStack Query Caching** - Client-side data cache
4. **Next.js ISR** - Incremental Static Regeneration
5. **Stale-While-Revalidate** - Serve stale content while fetching fresh data

## Caching Layers

### 1. TanStack Query Cache (Client-Side)

**Location:** `lib/tanstack/query-client.ts`

**Configuration:**
```typescript
{
  staleTime: 5 * 60 * 1000,      // 5 minutes - data is fresh
  gcTime: 10 * 60 * 1000,         // 10 minutes - garbage collection
  refetchOnWindowFocus: false,    // Don't refetch on focus
  retry: 1                        // Retry once on failure
}
```

**Benefits:**
- Reduces unnecessary API calls
- Improves perceived performance
- Automatic background refetching
- Optimistic updates for mutations

**Query-Specific Configuration:**

#### Guest Messages
```typescript
{
  staleTime: 5 * 60 * 1000,       // 5 minutes
  gcTime: 15 * 60 * 1000,         // 15 minutes
  refetchOnMount: false           // Use cached data
}
```
*Rationale:* Guest messages are relatively static and don't change frequently.

#### RSVP Submissions
```typescript
{
  staleTime: 2 * 60 * 1000,       // 2 minutes
  gcTime: 5 * 60 * 1000,          // 5 minutes
  refetchOnMount: true            // Always fetch fresh
}
```
*Rationale:* RSVP data is more dynamic and should be fresher.

### 2. Next.js ISR (Incremental Static Regeneration)

**Location:** `app/page.tsx`, `app/api/guest-messages/route.ts`

**Configuration:**
```typescript
export const revalidate = 300; // 5 minutes
```

**How It Works:**
1. Page is statically generated at build time
2. After 5 minutes, the next request triggers regeneration
3. Stale page is served while new page is generated
4. New page replaces the old one after generation

**Benefits:**
- Fast page loads (static HTML)
- Fresh content without full rebuilds
- Reduced server load
- Better SEO (static content)

### 3. HTTP Cache-Control Headers

**Location:** `app/api/guest-messages/route.ts`

**Configuration:**
```
Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600
```

**Breakdown:**
- `public` - Can be cached by CDN and browsers
- `max-age=60` - Browser cache for 1 minute
- `s-maxage=300` - CDN cache for 5 minutes
- `stale-while-revalidate=600` - Serve stale for 10 minutes while revalidating

**Benefits:**
- Reduced API calls to origin server
- Faster response times via CDN
- Graceful degradation during revalidation

## Stale-While-Revalidate Pattern

This is the core pattern used throughout the application.

### How It Works

```
Request → Check Cache → Is Fresh? 
                          ↓ Yes: Return cached
                          ↓ No: Is within SWR window?
                                ↓ Yes: Return stale + fetch fresh in background
                                ↓ No: Fetch fresh + block request
```

### Implementation Points

1. **API Routes:** HTTP Cache-Control header
2. **TanStack Query:** Automatic with staleTime configuration
3. **Next.js ISR:** Built-in with revalidate configuration

### Benefits

- **Performance:** Users get instant responses
- **Reliability:** Graceful degradation if backend is slow
- **Freshness:** Content updates in background
- **UX:** No loading spinners for cached content

## Cache Invalidation

### When to Invalidate

1. **After Mutations**
   - RSVP submission → Invalidate `rsvp-submissions` query
   - Message approval → Invalidate `guest-messages` query

2. **User-Triggered**
   - Manual refresh button
   - Pull-to-refresh on mobile

3. **Time-Based**
   - ISR revalidation period (5 minutes)
   - TanStack Query staleTime expiration

### How to Invalidate

**TanStack Query:**
```typescript
queryClient.invalidateQueries({ queryKey: ['guest-messages'] });
```

**Next.js:**
```typescript
revalidatePath('/');
revalidateTag('guest-messages');
```

## Performance Metrics

### Expected Cache Hit Rates

- **Browser Cache:** 80-90% (for repeat visitors)
- **CDN Cache:** 70-80% (for all visitors)
- **TanStack Query:** 60-70% (for SPA navigation)

### Expected Load Times

- **First Visit:** 1-2s (static HTML + hydration)
- **Cached Visit:** 200-500ms (browser cache)
- **SPA Navigation:** 50-100ms (TanStack Query cache)

## Configuration Reference

All caching configurations are centralized in `lib/cache-config.ts` for easy maintenance and consistency.

### Modifying Cache Times

To adjust cache times:

1. Update `lib/cache-config.ts`
2. Apply changes to relevant files
3. Test with browser DevTools Network tab
4. Monitor cache hit rates in production

### Testing Caching

**Browser DevTools:**
1. Open Network tab
2. Look for `(disk cache)` or `(memory cache)` labels
3. Check `Cache-Control` headers in response

**TanStack Query DevTools:**
1. Open React Query DevTools
2. Check query status (fresh/stale/inactive)
3. Monitor refetch behavior

## Best Practices

1. **Static Content:** Long cache times (1 year for immutable assets)
2. **Dynamic Content:** Shorter cache times (1-5 minutes)
3. **User-Specific:** No caching or very short cache times
4. **API Responses:** Use stale-while-revalidate for better UX
5. **Mutations:** Always invalidate related queries

## Troubleshooting

### Content Not Updating

1. Check ISR revalidate time
2. Verify Cache-Control headers
3. Check TanStack Query staleTime
4. Force invalidation with queryClient.invalidateQueries()

### Too Many API Calls

1. Increase staleTime in TanStack Query
2. Increase max-age in Cache-Control
3. Disable refetchOnWindowFocus
4. Check for unnecessary query invalidations

### Stale Content Served Too Long

1. Decrease stale-while-revalidate window
2. Decrease ISR revalidate time
3. Implement manual refresh button
4. Add real-time updates with Supabase subscriptions

## Future Enhancements

1. **Real-Time Updates:** Supabase subscriptions for instant updates
2. **Service Worker:** Offline caching with Workbox
3. **Prefetching:** Prefetch likely next pages
4. **Cache Warming:** Pre-populate cache on build
5. **Edge Caching:** Vercel Edge Functions for global caching
