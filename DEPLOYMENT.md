# Deployment Guide

This guide covers deploying the Next.js wedding website to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Build Configuration](#build-configuration)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [Self-Hosted](#self-hosted)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

1. ✅ **Supabase Project**: Set up and configured with tables and RLS policies
2. ✅ **Environment Variables**: All required variables configured
3. ✅ **Production Build**: Tested locally without errors
4. ✅ **Domain Name**: (Optional) Custom domain for your wedding website
5. ✅ **Telegram Bot**: (Optional) Configured for guest message notifications

## Environment Variables

### Required Variables

These variables MUST be set in your production environment:

```bash
# Site URL (your production domain)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Optional Variables

```bash
# Telegram Bot (for guest message notifications)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Setting Up Environment Variables

1. **Copy the template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your values**:
   - Get Supabase credentials from: https://app.supabase.com/project/_/settings/api
   - Set your production URL
   - Add Telegram credentials if using notifications

3. **Never commit `.env.local`** to version control (it's in `.gitignore`)

## Build Configuration

### Local Production Build Test

Before deploying, test the production build locally:

```bash
# Install dependencies
bun install

# Run type checking
bun run type-check

# Run linting
bun run lint

# Build for production
bun run build

# Start production server locally
bun run start
```

### Build Output

A successful build should show:

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         120 kB
├ ○ /_not-found                          871 B          85 kB
└ ○ /api/guest-messages                  0 B            0 B
```

### Build Scripts

Available build commands:

```bash
# Standard production build
bun run build

# Build with bundle analysis
bun run build:analyze

# Type checking only
bun run type-check

# Linting
bun run lint
bun run lint:fix

# Format code
bun run format
```

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform for Next.js applications, offering zero-configuration deployment.

#### Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   bun add -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

#### Deploy with Git Integration

1. **Push to GitHub/GitLab/Bitbucket**

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your repository
   - Configure project settings

3. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all required variables from `.env.example`
   - Set variables for Production, Preview, and Development

4. **Deploy**:
   - Vercel automatically deploys on every push to main branch
   - Preview deployments for pull requests

#### Vercel Configuration

The project includes optimal settings for Vercel:

- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `bun run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `bun install`
- **Node Version**: 20.x or later

### Netlify

#### Deploy with Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   bun add -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Initialize**:
   ```bash
   netlify init
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "bun run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Self-Hosted

#### Using Docker

1. **Create Dockerfile**:

```dockerfile
FROM oven/bun:1 AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
```

2. **Build and run**:

```bash
# Build image
docker build -t wedding-website .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  wedding-website
```

#### Using PM2

1. **Install PM2**:
   ```bash
   bun add -g pm2
   ```

2. **Build the application**:
   ```bash
   bun run build
   ```

3. **Start with PM2**:
   ```bash
   pm2 start bun --name "wedding-website" -- run start
   pm2 save
   pm2 startup
   ```

## Post-Deployment

### Verification Checklist

After deployment, verify:

- [ ] **Homepage loads** without errors
- [ ] **Images display** correctly with optimization
- [ ] **Navigation works** with smooth scrolling
- [ ] **RSVP form submits** successfully to Supabase
- [ ] **Guest messages save** to database
- [ ] **Telegram notifications** send (if configured)
- [ ] **Countdown timer** displays and updates
- [ ] **Gallery carousel** functions properly
- [ ] **Music player** works (if included)
- [ ] **SEO metadata** appears in page source
- [ ] **Sitemap** accessible at `/sitemap.xml`
- [ ] **Robots.txt** accessible at `/robots.txt`
- [ ] **Mobile responsive** on various devices
- [ ] **Performance scores** acceptable (Lighthouse)

### Testing Production

```bash
# Test the deployed site
curl -I https://yourdomain.com

# Check sitemap
curl https://yourdomain.com/sitemap.xml

# Check robots.txt
curl https://yourdomain.com/robots.txt

# Test API endpoint
curl -X POST https://yourdomain.com/api/guest-messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","message":"Test message"}'
```

### Performance Monitoring

1. **Lighthouse Audit**:
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for Performance, Accessibility, SEO

2. **Core Web Vitals**:
   - Monitor in Google Search Console
   - Check Vercel Analytics (if using Vercel)

3. **Error Tracking**:
   - Monitor Vercel logs
   - Set up error tracking (Sentry, LogRocket, etc.)

### SEO Verification

1. **Google Search Console**:
   - Add and verify your domain
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Social Media Preview**:
   - Test Open Graph tags: https://www.opengraph.xyz/
   - Test Twitter cards: https://cards-dev.twitter.com/validator

3. **Structured Data**:
   - Validate JSON-LD: https://search.google.com/test/rich-results

## Troubleshooting

### Build Failures

**Issue**: Build fails with TypeScript errors

```bash
# Solution: Run type checking locally
bun run type-check

# Fix any type errors before deploying
```

**Issue**: Build fails with missing dependencies

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
bun run build
```

### Runtime Errors

**Issue**: Environment variables not working

- Ensure variables are set in deployment platform
- Verify `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding variables

**Issue**: Images not loading

- Check `next.config.ts` remote patterns
- Verify image paths are correct
- Check browser console for errors

**Issue**: API routes failing

- Check Supabase connection
- Verify environment variables
- Check API route logs

### Database Issues

**Issue**: RSVP submissions not saving

- Verify Supabase URL and key
- Check RLS policies in Supabase
- Test database connection with `bun run test:db`

**Issue**: Guest messages not appearing

- Check `approved` field in database
- Verify RLS policy allows reading approved messages
- Check TanStack Query cache settings

### Telegram Issues

**Issue**: Telegram notifications not sending

- Verify bot token is correct
- Check chat ID is correct (may be negative for groups)
- Ensure bot is added to the group
- Check server logs for errors

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## Support

For issues specific to this project:
1. Check the troubleshooting section above
2. Review the requirements and design documents in `.kiro/specs/nextjs-migration/`
3. Check application logs in your deployment platform
4. Verify all environment variables are correctly set

---

**Last Updated**: December 2025
