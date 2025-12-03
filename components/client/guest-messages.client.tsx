'use client';

import { AlertCircle, MessageCircle } from 'lucide-react';
import { useGuestMessages } from '@/hooks/use-guest-messages';
import { Alert, AlertDescription } from '@/src/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';

/**
 * GuestMessages component displays approved guest messages from Supabase
 * Uses TanStack Query for data fetching with loading and error states
 * Implements Requirements 12.1, 12.2, 13.3
 */
export function GuestMessages() {
  const { data: messages, isLoading, isError, error } = useGuestMessages();

  // Loading state
  if (isLoading) {
    return (
      <section id="messages" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Guest Messages</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section id="messages" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Guest Messages</h2>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error
                ? error.message
                : 'Failed to load guest messages. Please try again later.'}
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  // Empty state
  if (!messages || messages.length === 0) {
    return (
      <section id="messages" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Guest Messages</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet. Be the first to leave a message!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Success state with messages
  return (
    <section id="messages" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">Guest Messages</h2>
        <div className="space-y-6">
          {messages.map((message) => (
            <Card key={message.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  {message.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {message.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
