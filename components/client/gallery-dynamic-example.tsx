/**
 * Example of how to use the Gallery component with dynamic import
 * for code splitting (as per requirement 2.5)
 *
 * This file demonstrates the usage pattern but is not part of the main app.
 * Delete this file once the Gallery is integrated into app/page.tsx
 */

import dynamic from 'next/dynamic';
import { Skeleton } from '@/src/components/ui/skeleton';

// Dynamic import with loading skeleton
const Gallery = dynamic(() => import('./gallery.client').then((mod) => mod.Gallery), {
  loading: () => (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="w-full h-60 sm:h-72 lg:h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  ),
  ssr: false, // Disable SSR if needed for client-only features
});

export default function GallerySection() {
  return <Gallery />;
}
