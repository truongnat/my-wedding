# MusicPlayer Component

## Overview

The `MusicPlayer` component is a fully-featured audio player for the wedding website, migrated from React/Vite to Next.js 16 with proper client-side rendering.

## Features

- ✅ **Client-side only rendering** with "use client" directive
- ✅ **Browser Audio API** for playback control
- ✅ **Accessibility controls** with ARIA labels and keyboard navigation
- ✅ **Auto-play support** (after user interaction)
- ✅ **Playlist management** with multiple songs
- ✅ **Volume control** with mute functionality
- ✅ **Minimizable UI** for better UX
- ✅ **Progress tracking** with visual feedback

## Usage

### With Dynamic Import (Recommended)

The MusicPlayer must be imported dynamically with `ssr: false` to prevent server-side rendering issues:

```tsx
import dynamic from 'next/dynamic';

const MusicPlayer = dynamic(
  () => import('@/components/client/music-player.client').then((mod) => ({ default: mod.MusicPlayer })),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed bottom-4 right-4 w-16 h-16 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg z-50 flex items-center justify-center">
        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
      </div>
    )
  }
);

export default function Home() {
  return (
    <div>
      <main>Your content here</main>
      <MusicPlayer />
    </div>
  );
}
```

## Accessibility Features

- **ARIA labels** on all interactive controls
- **Keyboard navigation** support (Enter/Space for minimize toggle)
- **Role attributes** for semantic HTML
- **Screen reader friendly** with descriptive labels
- **Progress indicators** with proper ARIA attributes

## Browser API Usage

The component uses the following browser APIs:
- **HTMLAudioElement** for audio playback
- **Document events** for user interaction detection
- **useEffect hooks** for lifecycle management

## Requirements Satisfied

- ✅ **Requirement 2.5**: Code splitting with dynamic import
- ✅ **Requirement 5.1**: Client component with "use client" directive
- ✅ **Requirement 5.3**: Audio playback with browser APIs
- ✅ **Requirement 7.1**: ARIA labels and accessibility controls

## Customization

To customize the playlist, edit the `weddingSongs` array in the component:

```tsx
const weddingSongs = [
  {
    title: 'Your Song Title',
    artist: 'Artist Name',
    url: 'https://your-audio-url.mp3',
  },
  // Add more songs...
];
```

## Notes

- The component requires user interaction before auto-playing (browser policy)
- Audio files should be hosted on a CDN or in the public directory
- The component is positioned fixed at bottom-right by default
- Volume is set to 30% by default to avoid startling users
