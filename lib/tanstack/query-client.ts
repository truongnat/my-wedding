import { QueryClient } from '@tanstack/react-query';

/**
 * Creates a new QueryClient with optimized caching configuration
 * Implements Requirements 6.2, 12.2, 12.4
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Unused data is garbage collected after 10 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        // Don't refetch on window focus to reduce unnecessary requests
        refetchOnWindowFocus: false,
        // Retry failed requests once
        retry: 1,
        // Retry delay increases exponentially
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // Retry mutations once on failure
        retry: 1,
        // Shorter retry delay for mutations
        retryDelay: 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
