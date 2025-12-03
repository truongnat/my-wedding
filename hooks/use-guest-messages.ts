'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { GuestMessage } from '@/types';

/**
 * Custom hook to fetch approved guest messages using TanStack Query
 * Implements Requirements 12.1, 12.2, 13.3, 6.2
 *
 * Caching Strategy:
 * - staleTime: 5 minutes - messages don't change frequently
 * - gcTime: 15 minutes - keep in cache longer for better UX
 * - refetchOnMount: false - use cached data if available
 */
export function useGuestMessages() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['guest-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guest_messages')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch guest messages: ${error.message}`);
      }

      // Transform database rows to application types
      return (data || []).map(
        (row): GuestMessage => ({
          id: row.id,
          name: row.name,
          message: row.message,
          approved: row.approved,
          createdAt: new Date(row.created_at),
        })
      );
    },
    // Guest messages are relatively static - cache for 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Keep in cache for 15 minutes even if unused
    gcTime: 15 * 60 * 1000, // 15 minutes
    // Don't refetch on mount if we have cached data
    refetchOnMount: false,
  });
}
