'use client';

import { useEffect } from 'react';
import { Button } from '@/src/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary component for the application
 * Catches and displays errors that occur during rendering
 * Provides a retry mechanism for users
 */
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    // In production, this could send to an error tracking service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="mb-2 font-playfair text-4xl font-bold text-rose-900">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-gray-600">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-left">
            <p className="mb-2 font-semibold text-red-800">Error Details:</p>
            <p className="text-sm text-red-700">{error.message}</p>
            {error.digest && <p className="mt-2 text-xs text-red-600">Error ID: {error.digest}</p>}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="bg-rose-600 hover:bg-rose-700" size="lg">
            Try Again
          </Button>
          <Button
            onClick={() => {
              window.location.href = '/';
            }}
            variant="outline"
            size="lg"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
