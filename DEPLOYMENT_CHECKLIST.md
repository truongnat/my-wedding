# Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment

### Code Quality
- [ ] All TypeScript errors resolved (`bun run type-check`)
- [ ] All linting issues fixed (`bun run lint`)
- [ ] Code formatted consistently (`bun run format`)
- [ ] All tests passing (`bun run test`)

### Configuration
- [ ] `.env.example` is up to date with all required variables
- [ ] Production environment variables prepared
- [ ] `next.config.ts` configured for production
- [ ] Remote image patterns configured (if using external images)

### Database
- [ ] Supabase project created
- [ ] Database tables created (`rsvp_submissions`, `guest_messages`)
- [ ] Row Level Security (RLS) enabled
- [ ] RLS policies configured correctly
- [ ] Database connection tested (`bun run test:db`)

### Optional Services
- [ ] Telegram bot created (if using notifications)
- [ ] Telegram bot added to group
- [ ] Telegram credentials tested
- [ ] Analytics configured (if using)

## Build Testing

### Local Production Build
- [ ] Dependencies installed (`bun install`)
- [ ] Production build successful (`bun run build`)
- [ ] No build warnings or errors
- [ ] Bundle size acceptable (check output)
- [ ] Production server starts (`bun run start`)
- [ ] All pages load correctly on localhost:3000

### Bundle Analysis (Optional)
- [ ] Run bundle analyzer (`bun run build:analyze`)
- [ ] Review bundle sizes
- [ ] Identify any optimization opportunities

## Deployment

### Platform Setup
- [ ] Deployment platform account created (Vercel/Netlify/etc.)
- [ ] Repository connected to platform
- [ ] Build settings configured
- [ ] Environment variables added to platform
- [ ] Custom domain configured (if applicable)

### Initial Deployment
- [ ] Deploy to preview/staging first
- [ ] Test preview deployment thoroughly
- [ ] Deploy to production
- [ ] Verify production deployment successful

## Post-Deployment Verification

### Functionality Testing
- [ ] Homepage loads without errors
- [ ] All sections render correctly
- [ ] Navigation works (smooth scrolling)
- [ ] Images display with optimization
- [ ] Countdown timer updates correctly
- [ ] Gallery carousel functions
- [ ] Music player works (if included)
- [ ] Video section plays (if included)

### Forms and Data
- [ ] RSVP form displays correctly
- [ ] RSVP form validation works
- [ ] RSVP submissions save to database
- [ ] Guest message form works
- [ ] Guest messages save to database
- [ ] Telegram notifications send (if configured)
- [ ] Approved messages display on site

### SEO and Metadata
- [ ] Page title displays correctly
- [ ] Meta description present
- [ ] Open Graph tags present (view page source)
- [ ] Twitter card tags present
- [ ] Favicon displays
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] Structured data present (JSON-LD)

### Performance
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 90
- [ ] Images load with blur placeholders
- [ ] Fonts load without flash
- [ ] No layout shift (CLS)
- [ ] Fast First Contentful Paint (FCP)
- [ ] Fast Largest Contentful Paint (LCP)

### Cross-Browser Testing
- [ ] Chrome/Edge (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (iOS)

### Responsive Design
- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px - 1024px)
- [ ] Large Desktop (1025px+)

### Error Handling
- [ ] 404 page displays correctly
- [ ] Error boundary catches errors
- [ ] API errors handled gracefully
- [ ] Image fallbacks work
- [ ] Loading states display

## Post-Launch

### Monitoring
- [ ] Set up error tracking (optional)
- [ ] Monitor deployment logs
- [ ] Check for any runtime errors
- [ ] Monitor database usage
- [ ] Monitor API rate limits

### SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain in Google Search Console
- [ ] Test social media previews
- [ ] Validate structured data

### Documentation
- [ ] Update README with production URL
- [ ] Document any custom configurations
- [ ] Note any known issues
- [ ] Create runbook for common tasks

### Backup and Security
- [ ] Database backup configured (Supabase automatic)
- [ ] Environment variables secured
- [ ] API keys rotated if needed
- [ ] HTTPS enabled (automatic on most platforms)

## Rollback Plan

In case of issues:
- [ ] Previous deployment URL saved
- [ ] Rollback procedure documented
- [ ] Database backup available
- [ ] Contact information for support

---

**Deployment Date**: _______________

**Deployed By**: _______________

**Production URL**: _______________

**Notes**:
