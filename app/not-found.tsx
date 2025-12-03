import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

/**
 * 404 Not Found page
 * Displayed when a user navigates to a non-existent route
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          {/* 404 Number */}
          <h1 className="mb-4 font-playfair text-9xl font-bold text-rose-600">404</h1>

          {/* Error message */}
          <h2 className="mb-2 font-playfair text-3xl font-bold text-rose-900">Page Not Found</h2>
          <p className="text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="bg-rose-600 hover:bg-rose-700" size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#rsvp">RSVP</Link>
          </Button>
        </div>

        {/* Decorative element */}
        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Looking for wedding details? Head back to the home page.
          </p>
        </div>
      </div>
    </div>
  );
}
