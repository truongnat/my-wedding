'use client';

import dynamic from 'next/dynamic';

/**
 * Dynamic imports for code splitting (heavy components)
 *
 * These components are loaded on-demand to reduce initial bundle size:
 * - Gallery: Heavy carousel library (embla-carousel-react) and image handling
 * - MusicPlayer: Audio playback with complex state management
 * - VideoSection: YouTube iframe embeds and video player controls
 *
 * Requirements: 2.5 (Code splitting for optimal bundle sizes)
 */

export const Gallery = dynamic(
  () => import('@/components/client/gallery.client').then((mod) => mod.Gallery),
  {
    ssr: false,
    loading: () => (
      <section id="gallery" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-playfair text-4xl font-bold text-gray-900">
            Gallery
          </h2>
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600" />
          </div>
        </div>
      </section>
    ),
  }
);

export const MusicPlayer = dynamic(
  () =>
    import('@/components/client/music-player.client').then((mod) => ({
      default: mod.MusicPlayer,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-4 right-4 w-16 h-16 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg z-50 flex items-center justify-center">
        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
      </div>
    ),
  }
);

export const VideoSection = dynamic(
  () => import('@/components/client/video-section.client').then((mod) => mod.VideoSection),
  {
    ssr: false,
    loading: () => (
      <section id="videos" className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-pink-600">Our Wedding Videos</h2>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
            </div>
          </div>
        </div>
      </section>
    ),
  }
);
