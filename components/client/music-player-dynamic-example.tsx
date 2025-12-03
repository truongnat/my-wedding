/**
 * Example: How to use MusicPlayer with dynamic import (ssr: false)
 *
 * This demonstrates the proper way to import and use the MusicPlayer component
 * in a Next.js page or component to prevent server-side rendering issues.
 */

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false to prevent server-side rendering
// This is necessary because the MusicPlayer uses browser APIs (Audio, document events)
const MusicPlayer = dynamic(
  () => import('./music-player.client').then((mod) => ({ default: mod.MusicPlayer })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-4 right-4 w-16 h-16 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg z-50 flex items-center justify-center">
        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
      </div>
    ),
  }
);

export function PageWithMusicPlayer() {
  return (
    <div>
      {/* Your page content */}
      <h1>Wedding Website</h1>

      {/* Music player will only render on the client */}
      <MusicPlayer />
    </div>
  );
}

/**
 * Alternative: Direct usage in app/page.tsx
 *
 * // app/page.tsx
 * import dynamic from 'next/dynamic';
 *
 * const MusicPlayer = dynamic(
 *   () => import('@/components/client/music-player.client').then((mod) => ({ default: mod.MusicPlayer })),
 *   { ssr: false }
 * );
 *
 * export default function Home() {
 *   return (
 *     <div>
 *       <main>...</main>
 *       <MusicPlayer />
 *     </div>
 *   );
 * }
 */
