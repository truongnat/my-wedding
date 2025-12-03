'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type RSVPInsert = Database['public']['Tables']['rsvp_submissions']['Insert'];
type RSVPRow = Database['public']['Tables']['rsvp_submissions']['Row'];

interface RSVPFormData {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  dietary_restrictions?: string;
  message?: string;
}

export function useRSVPMutation() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (data: RSVPFormData) => {
      const insertData: RSVPInsert = {
        name: data.name,
        email: data.email,
        attending: data.attending,
        guests: data.guests,
        dietary_restrictions: data.dietary_restrictions || null,
        message: data.message || null,
      };

      const { data: result, error } = await supabase
        .from('rsvp_submissions')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message || 'Failed to submit RSVP');
      }

      return result;
    },
    // Optimistic update: immediately update the UI before the server responds
    onMutate: async (newRSVP) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['rsvp-submissions'] });

      // Snapshot the previous value
      const previousRSVPs = queryClient.getQueryData<RSVPRow[]>(['rsvp-submissions']);

      // Optimistically update to the new value
      if (previousRSVPs) {
        const optimisticRSVP: RSVPRow = {
          id: `temp-${Date.now()}`, // Temporary ID
          name: newRSVP.name,
          email: newRSVP.email,
          attending: newRSVP.attending,
          guests: newRSVP.guests,
          dietary_restrictions: newRSVP.dietary_restrictions || null,
          message: newRSVP.message || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        queryClient.setQueryData<RSVPRow[]>(['rsvp-submissions'], (old) => [
          ...(old || []),
          optimisticRSVP,
        ]);
      }

      // Return a context object with the snapshotted value
      return { previousRSVPs };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error, _newRSVP, context) => {
      // Rollback to the previous value
      if (context?.previousRSVPs) {
        queryClient.setQueryData(['rsvp-submissions'], context.previousRSVPs);
      }

      // Show error toast
      toast.error('Failed to submit RSVP', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
    },
    // Always refetch after error or success to ensure we have the latest data
    onSuccess: (_data, variables) => {
      // Invalidate and refetch any RSVP-related queries
      queryClient.invalidateQueries({ queryKey: ['rsvp-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['rsvp-count'] });

      // Show success toast
      toast.success('RSVP Submitted Successfully!', {
        description: variables.attending
          ? "We can't wait to celebrate with you! 🎉"
          : "We'll miss you, but thank you for letting us know.",
      });
    },
    onSettled: () => {
      // Always refetch to ensure we have the latest data from the server
      queryClient.invalidateQueries({ queryKey: ['rsvp-submissions'] });
    },
  });
}
