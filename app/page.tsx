import { Suspense } from 'react';
import { CountdownTimer } from '@/components/client/countdown-timer.client';
// Dynamic imports for code splitting (heavy components) - wrapped in client component
import { Gallery, MusicPlayer, VideoSection } from '@/components/client/dynamic-sections.client';
import { GuestMessages } from '@/components/client/guest-messages.client';
import { HeroSection } from '@/components/client/hero-section.client';
// Client Components (interactive sections)
import { Navigation } from '@/components/client/navigation.client';
import { RSVPSection } from '@/components/client/rsvp-section.client';
// Server Components (static sections)
import { AboutSection } from '@/components/server/about-section';
import { Footer } from '@/components/server/footer';
import { Timeline } from '@/components/server/timeline';
import { VenueMap } from '@/components/server/venue-map';
import { WeddingDetails } from '@/components/server/wedding-details';
import { getWeddingStructuredData } from '@/lib/structured-data';

/**
 * Incremental Static Regeneration (ISR) configuration
 * Implements Requirements 6.4, 6.5
 *
 * Revalidate every 5 minutes to keep content fresh while maintaining performance
 * This allows the page to be rendered on-demand and cached with periodic updates
 *
 * Using 'force-dynamic' to skip static generation at build time since we need
 * environment variables for Supabase. The page will be rendered on first request,
 * then cached and revalidated every 5 minutes (ISR behavior).
 */
export const revalidate = 300; // 5 minutes

/**
 * Dynamic rendering configuration
 * 'force-dynamic' ensures the page is rendered on-demand, not at build time
 * Combined with revalidate, this gives us ISR behavior without build-time errors
 */
export const dynamic = 'force-dynamic';

// Loading fallback components (now handled by dynamic imports)
function GuestMessagesFallback() {
  return (
    <section id="messages" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-12 text-center font-playfair text-4xl font-bold text-gray-900">
          Guest Messages
        </h2>
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const structuredData = getWeddingStructuredData();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        {/* Navigation */}
        <Navigation />

        <main>
          {/* Hero Section - id="home" */}
          <HeroSection />

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* About/Story Section - id="story" */}
          <AboutSection />

          {/* Wedding Details Section - id="details" */}
          <WeddingDetails />

          {/* Timeline Section - id="timeline" */}
          <Timeline />

          {/* Venue/Location Section - id="location" */}
          <VenueMap />

          {/* Gallery Section - id="gallery" (dynamically loaded) */}
          <Gallery />

          {/* Video Section - id="videos" (dynamically loaded) */}
          <VideoSection />

          {/* RSVP Section - id="rsvp" */}
          <RSVPSection />

          {/* Guest Messages Section - id="messages" */}
          <Suspense fallback={<GuestMessagesFallback />}>
            <GuestMessages />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Music Player (floating, dynamically loaded) */}
        <MusicPlayer />
      </div>
    </>
  );
}
