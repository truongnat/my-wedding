# Implementation Plan

- [x] 1. Initialize Next.js 16 project with Bun and configure tooling





  - Install Next.js 16 using Bun
  - Configure TypeScript with strict mode
  - Set up Biome for linting and formatting
  - Configure path aliases (@/* for src/*)
  - Create initial project structure with kebab-case naming
  - _Requirements: 1.1, 4.4, 4.5, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [x] 2. Set up Supabase and TanStack Query infrastructure





  - Install Supabase client library
  - Create Supabase client configuration
  - Set up environment variables for Supabase
  - Install TanStack Query
  - Configure QueryClient with optimal defaults
  - Create Providers component for QueryClientProvider
  - _Requirements: 12.1, 12.4, 13.1, 13.4_

- [x] 3. Create database schema in Supabase





  - Create rsvp_submissions table with schema
  - Create guest_messages table with schema
  - Enable Row Level Security (RLS) on tables
  - Create RLS policies for public access
  - Test database connection and queries
  - _Requirements: 13.2, 13.3_

- [x] 4. Set up root layout with metadata and fonts





  - Create app/layout.tsx with root layout
  - Configure next/font for Google Fonts
  - Implement comprehensive metadata using Metadata API
  - Add Open Graph and Twitter card metadata
  - Set up global styles with Tailwind CSS
  - _Requirements: 2.4, 3.1, 3.2_

- [x] 5. Create SEO and sitemap infrastructure




  - Create app/sitemap.ts for sitemap generation
  - Create app/robots.ts for robots.txt
  - Add structured data (JSON-LD) for wedding event
  - Verify semantic HTML structure
  - _Requirements: 3.3, 3.4, 3.5, 3.6_
-

- [x] 6. Migrate and optimize UI component library




  - Rename all UI components to kebab-case
  - Update component imports throughout
  - Verify all shadcn/ui components work with Next.js
  - Update utility functions for Next.js compatibility
  - _Requirements: 4.1, 4.2, 11.5_

- [x] 7. Create server components for static sections





  - Create components/server/about-section.tsx
  - Create components/server/wedding-details.tsx
  - Create components/server/timeline.tsx
  - Create components/server/footer.tsx
  - Create components/server/venue-map.tsx
  - Ensure no "use client" directive in these components
  - _Requirements: 1.5, 4.1_

- [x] 8. Create optimized image component wrapper





  - Create components/ui/image-with-optimization.tsx using Next.js Image
  - Add blur placeholder support
  - Configure responsive image sizes
  - Add fallback image handling
  - _Requirements: 2.1, 2.2, 2.3, 8.4_

- [ ]* 8.1 Write property test for image alt text
  - **Property 1: Image Alt Text Completeness**
  - **Validates: Requirements 7.2**
-

- [x] 9. Migrate Navigation component to client component



  - Create components/client/navigation.client.tsx
  - Add "use client" directive
  - Implement smooth scroll behavior
  - Add ARIA labels for accessibility
  - _Requirements: 5.1, 7.1_

- [x] 10. Migrate HeroSection component to client component





  - Create components/client/hero-section.client.tsx
  - Add "use client" directive
  - Integrate Framer Motion animations
  - Use optimized Image component
  - _Requirements: 5.1, 5.5_

- [x] 11. Implement CountdownTimer client component





  - Create components/client/countdown-timer.client.tsx
  - Add "use client" directive
  - Implement time calculation utility function
  - Use useEffect for timer updates
  - Prevent hydration errors with proper initialization
  - _Requirements: 5.1, 5.2_

- [ ]* 11.1 Write property test for countdown timer accuracy
  - **Property 2: Countdown Timer Accuracy**
  - **Validates: Requirements 5.2**

- [x] 12. Migrate Gallery component with dynamic import



  - Create components/client/gallery.client.tsx
  - Add "use client" directive
  - Implement carousel with embla-carousel-react
  - Use dynamic import for code splitting
  - Add loading skeleton
  - _Requirements: 2.5, 5.1_
-

- [x] 13. Migrate VideoSection component to client component



  - Create components/client/video-section.client.tsx
  - Add "use client" directive
  - Implement video player controls
  - Add accessibility labels
  - _Requirements: 5.1, 5.3_
-

- [x] 14. Implement Telegram integration for guest messages




  - Create lib/telegram/client.ts for Telegram Bot API
  - Implement sendTelegramMessage function
  - Add environment variables for Telegram bot token and chat ID
  - Create API route for guest message submission with Telegram
  - Ensure database save happens before Telegram notification
  - Handle Telegram API failures gracefully
  - _Requirements: 13.3, 14.1, 14.2, 14.3, 14.4_
- [x] 15. Implement GuestMessages component with TanStack Query




- [ ] 15. Implement GuestMessages component with TanStack Query

  - Create components/client/guest-messages.client.tsx
  - Create hooks/use-guest-messages.ts for data fetching
  - Use TanStack Query useQuery hook
  - Implement loading and error states
  - Display approved messages from Supabase
  - _Requirements: 12.1, 12.2, 13.3_


- [x] 16. Implement RSVPSection component with form handling




  - Create components/client/rsvp-section.client.tsx
  - Create hooks/use-rsvp-mutation.ts for mutations
  - Use TanStack Query useMutation hook
  - Implement form validation with Zod
  - Add proper label associations for accessibility
  - _Requirements: 5.4, 7.3, 12.3, 13.2_

- [x] 17. Implement optimistic updates for RSVP submission




  - Add optimistic update logic to RSVP mutation
  - Invalidate queries on success
  - Handle rollback on error
  - Show success/error toast notifications
  - _Requirements: 12.5_


- [x] 18. Migrate MusicPlayer component with dynamic import



  - Create components/client/music-player.client.tsx
  - Add "use client" directive
  - Use dynamic import with ssr: false
  - Implement audio playback with browser APIs
  - Add accessibility controls
  - _Requirements: 2.5, 5.1, 5.3, 7.1_

-

- [x] 19. Create main page component with all sections



  - Create app/page.tsx as server component
  - Import and compose all section components
  - Add structured data script tag
  - Ensure proper section IDs for navigation
  - _Requirements: 1.2, 1.3_

- [x] 20. Implement error handling and loading states





  - Create app/error.tsx for error boundary
  - Create app/loading.tsx for loading state
  - Create app/not-found.tsx for 404 page
  - Add Suspense boundaries around async components
  - Implement try-catch in API routes
  - _Requirements: 8.1, 8.2, 8.3, 8.5_

- [ ]* 20.1 Write property test for hydration consistency
  - **Property 3: Hydration Consistency**
  - **Validates: Requirements 10.5**
-

- [x] 21. Configure Next.js for optimal performance



  - Configure next.config.js with image optimization
  - Enable optimizePackageImports for large libraries
  - Configure remote image patterns
  - Set up image formats (AVIF, WebP)
  - _Requirements: 2.1, 2.6_

- [x] 22. Implement caching strategies





  - Add revalidate to API routes where appropriate
  - Configure TanStack Query cache times
  - Implement ISR for dynamic content
  - Set up stale-while-revalidate patterns
  - _Requirements: 6.2, 6.4, 6.5_

- [ ] 23. Set up testing infrastructure




  - Install Vitest and React Testing Library
  - Install fast-check for property-based testing
  - Configure test scripts in package.json
  - Create test utilities and helpers
  - _Requirements: 10.1_

- [ ]* 24. Write unit tests for utility functions
  - Test time calculation functions
  - Test form validation logic
  - Test data transformation functions
  - _Requirements: 10.1_

- [ ]* 25. Write component smoke tests
  - Test all components render without errors
  - Test server components render correctly
  - Test client components with "use client" directive
  - _Requirements: 10.1_

- [ ] 26. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.
- [x] 27. Perform accessibility audit



- [ ] 27. Perform accessibility audit

  - Verify all images have alt text
  - Check ARIA labels on interactive elements
  - Test keyboard navigation
  - Verify form label associations
  - _Requirements: 7.1, 7.2, 7.3_




- [-] 28. Optimize bundle size and performance




  - Analyze bundle with @next/bundle-analyzer
  - Implement dynamic imports for heavy components
  - Verify code splitting is working



  - Check First Load JS size
  - _Requirements: 2.5_

- [x] 29. Verify TypeScript and linting


  - Run TypeScript type checking (bun run tsc --noEmit)
  - Run Biome linting (bun biome check .)
  - Fix any type errors or linting issues
  - Verify strict mode is enabled
  - _Requirements: 10.2, 10.3_

- [x] 30. Create deployment configuration





  - Set up environment variables template
  - Create deployment documentation
  - Configure build scripts
  - Test production build
  - _Requirements: 1.4_

- [-] 31. Final verification and testing



  - Test all navigation links
  - Verify smooth scrolling works
  - Test RSVP form submission end-to-end
  - Test Telegram integration for guest messages
  - Verify images load with optimization
  - Check metadata in browser dev tools
  - Test on multiple devices/browsers
  - _Requirements: 1.2, 1.3, 2.1, 3.1, 14.1_

- [ ] 32. Final Checkpoint - Production readiness

  - Ensure all tests pass, ask the user if questions arise.
