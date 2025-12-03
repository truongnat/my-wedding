import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { sendTelegramMessage } from '@/lib/telegram/client';

// Validation schema for guest messages
const messageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  message: z.string().min(1, 'Message is required').max(500, 'Message too long'),
});

/**
 * POST /api/guest-messages
 * Handles guest message submission with Telegram notification
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validated = messageSchema.parse(body);

    // Save to database first (critical operation)
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('guest_messages')
      .insert({
        name: validated.name,
        message: validated.message,
        approved: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    // Send to Telegram (non-blocking, best effort)
    // We don't await this to avoid blocking the response
    sendTelegramMessage(validated.name, validated.message)
      .then((result) => {
        if (!result.success) {
          console.error('Telegram notification failed:', result.error);
          // Log but don't fail the request - message is already saved
        }
      })
      .catch((err) => {
        console.error('Telegram notification error:', err);
        // Log but don't fail the request - message is already saved
      });

    return NextResponse.json(
      {
        success: true,
        message: 'Message submitted successfully',
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/guest-messages
 * Retrieves approved guest messages
 *
 * Caching Strategy (Requirements 6.2, 6.4, 6.5):
 * - ISR revalidation every 5 minutes
 * - CDN cache for 5 minutes (s-maxage)
 * - Stale-while-revalidate for 10 minutes (serve stale while fetching fresh)
 * - Browser cache for 1 minute (max-age)
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('guest_messages')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, data },
      {
        status: 200,
        headers: {
          // Comprehensive caching strategy:
          // - public: can be cached by CDN and browsers
          // - max-age=60: browser cache for 1 minute
          // - s-maxage=300: CDN cache for 5 minutes
          // - stale-while-revalidate=600: serve stale for 10 minutes while revalidating
          'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Route segment config for ISR
 * Revalidate this route every 5 minutes
 */
export const revalidate = 300; // 5 minutes
