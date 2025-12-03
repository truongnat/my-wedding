# Gallery Component

## Overview

The Gallery component has been successfully migrated to Next.js with the following features:

- ✅ "use client" directive for client-side interactivity
- ✅ Embla carousel implementation for smooth image browsing
- ✅ Next.js Image optimization with responsive sizes
- ✅ Loading skeleton for better UX
- ✅ Modal view for full-size images
- ✅ Framer Motion animations
- ✅ Accessibility features (ARIA labels)

## Requirements Satisfied

- **Requirement 2.5**: Code splitting with dynamic import support
- **Requirement 5.1**: Client component with "use client" directive

## Usage

### Basic Usage

```tsx
import { Gallery } from '@/components/client/gallery.client';

export default function Page() {
  return <Gallery />;
}
```

### With Dynamic Import (Recommended for Code Splitting)

```tsx
import dynamic from 'next/dynamic';
import { Skeleton } from '@/src/components/ui/skeleton';

const Gallery = dynamic(
  () => import('@/components/client/gallery.client').then((mod) => mod.Gallery),
  {
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
    ssr: false, // Optional: disable SSR if needed
  }
);

export default function Page() {
  return <Gallery />;
}
```

### With Custom Images

```tsx
import { Gallery } from '@/components/client/gallery.client';

const customImages = [
  {
    src: '/images/photo1.jpg',
    alt: 'Custom photo 1',
    category: 'ceremony',
  },
  {
    src: '/images/photo2.jpg',
    alt: 'Custom photo 2',
    category: 'reception',
  },
];

export default function Page() {
  return <Gallery images={customImages} />;
}
```

### With Loading State

```tsx
import { Gallery } from '@/components/client/gallery.client';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return <Gallery isLoading={isLoading} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `GalleryImage[]` | Default images | Array of gallery images |
| `isLoading` | `boolean` | `false` | Show loading skeleton |

### GalleryImage Type

```typescript
interface GalleryImage {
  src: string;      // Image URL
  alt: string;      // Alt text for accessibility
  category: string; // Category badge text
}
```

## Features

### Carousel Navigation
- Embla carousel with smooth scrolling
- Previous/Next buttons
- Keyboard navigation support
- Loop mode enabled
- Responsive breakpoints (1 column on mobile, 2 on tablet, 3 on desktop)

### Image Optimization
- Next.js Image component with automatic optimization
- Responsive image sizes
- Blur placeholder support
- Fallback image handling
- AVIF/WebP format support

### Modal View
- Click any image to view full-size
- Download and like buttons
- Close button with keyboard support
- Backdrop blur effect
- Click outside to close

### Loading States
- Skeleton components for better perceived performance
- Smooth transitions
- Maintains layout during loading

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Alt text on all images

## File Location

- Component: `components/client/gallery.client.tsx`
- Example: `components/client/gallery-dynamic-example.tsx`

## Dependencies

- `embla-carousel-react`: Carousel functionality
- `motion/react`: Animations
- `lucide-react`: Icons
- `next/image`: Image optimization

## Next Steps

1. Import the Gallery component in `app/page.tsx`
2. Use dynamic import for code splitting
3. Customize images as needed
4. Delete the example file (`gallery-dynamic-example.tsx`) once integrated
