import type { NextConfig } from 'next';

// Bundle analyzer configuration
// Enable with: ANALYZE=true bun run build
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Image optimization configuration
  // Requirements: 2.1, 2.6
  images: {
    // Enable modern image formats for better compression and quality
    formats: ['image/avif', 'image/webp'],

    // Configure remote image patterns for external image sources
    // Add patterns as needed for CDNs, user uploads, etc.
    remotePatterns: [
      // Example: Supabase storage
      // {
      //   protocol: 'https',
      //   hostname: '*.supabase.co',
      //   pathname: '/storage/v1/object/public/**',
      // },
      // Example: Common CDNs
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.example.com',
      // },
    ],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 75, 85, 96, 128, 256, 384],

    // Minimum cache TTL for optimized images (in seconds)
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year

    // Disable static imports for better control
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for performance optimization
  experimental: {
    // Optimize package imports for large libraries to reduce bundle size
    // This enables tree-shaking for libraries that don't support it natively
    optimizePackageImports: [
      // Icon libraries
      'lucide-react',

      // UI component libraries
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',

      // Data fetching and state management
      '@tanstack/react-query',

      // Animation libraries
      'motion',
      'framer-motion',

      // Chart libraries
      'recharts',

      // Carousel libraries
      'embla-carousel-react',

      // Form libraries
      'react-hook-form',

      // Utility libraries
      'react-day-picker',
      'date-fns',
      'lodash',
      'lodash-es',
    ],
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
          exclude: ['error', 'warn'],
        }
        : false,
  },

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Compression
  compress: true,

  // Power optimizations
  poweredByHeader: false,
};

export default withBundleAnalyzer(nextConfig);
