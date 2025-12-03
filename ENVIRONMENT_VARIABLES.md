# Environment Variables Reference

Complete reference for all environment variables used in the wedding website.

## Overview

This application uses environment variables for configuration. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser, while others are server-side only.

## Required Variables

These variables MUST be set for the application to function:

### `NEXT_PUBLIC_SITE_URL`

- **Type**: String (URL)
- **Required**: Yes
- **Exposed to Browser**: Yes
- **Description**: The public URL of your website
- **Used For**: SEO metadata, sitemap generation, canonical URLs
- **Example**: 
  - Development: `http://localhost:3000`
  - Production: `https://yourwedding.com`

### `NEXT_PUBLIC_SUPABASE_URL`

- **Type**: String (URL)
- **Required**: Yes
- **Exposed to Browser**: Yes
- **Description**: Your Supabase project URL
- **Used For**: Database connections, API calls
- **Where to Find**: Supabase Dashboard → Settings → API → Project URL
- **Example**: `https://abcdefghijklmnop.supabase.co`

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **Type**: String (JWT)
- **Required**: Yes
- **Exposed to Browser**: Yes
- **Description**: Supabase anonymous/public API key
- **Used For**: Client-side database queries (protected by RLS)
- **Where to Find**: Supabase Dashboard → Settings → API → anon/public key
- **Security**: Safe to expose (protected by Row Level Security policies)
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Optional Variables

These variables enhance functionality but are not required:

### `TELEGRAM_BOT_TOKEN`

- **Type**: String
- **Required**: No
- **Exposed to Browser**: No (server-side only)
- **Description**: Telegram bot authentication token
- **Used For**: Sending guest message notifications to Telegram
- **Where to Find**: Create bot with [@BotFather](https://t.me/botfather)
- **Example**: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
- **Setup Guide**: See [docs/TELEGRAM_SETUP.md](./docs/TELEGRAM_SETUP.md)

### `TELEGRAM_CHAT_ID`

- **Type**: String or Number
- **Required**: No (required if using Telegram)
- **Exposed to Browser**: No (server-side only)
- **Description**: Telegram chat or group ID to send notifications to
- **Used For**: Specifying where to send guest message notifications
- **Where to Find**: Use [@userinfobot](https://t.me/userinfobot) or check Telegram API
- **Example**: 
  - Personal chat: `123456789`
  - Group chat: `-987654321` (negative for groups)

### `NEXT_PUBLIC_GA_MEASUREMENT_ID`

- **Type**: String
- **Required**: No
- **Exposed to Browser**: Yes
- **Description**: Google Analytics measurement ID
- **Used For**: Website analytics tracking
- **Where to Find**: Google Analytics → Admin → Data Streams
- **Example**: `G-XXXXXXXXXX`

## Development vs Production

### Development (.env.local)

```bash
# Development environment
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

### Production

Set these in your deployment platform:

**Vercel**:
- Project Settings → Environment Variables
- Set for Production, Preview, and Development

**Netlify**:
- Site Settings → Environment Variables

**Docker**:
- Use `.env` file or pass via `-e` flags
- Or use `docker-compose.yml` with environment section

## Environment File Priority

Next.js loads environment variables in this order (later overrides earlier):

1. `.env` - Shared across all environments
2. `.env.local` - Local overrides (gitignored)
3. `.env.development` - Development-specific
4. `.env.development.local` - Local development overrides
5. `.env.production` - Production-specific
6. `.env.production.local` - Local production overrides

**Recommendation**: Use `.env.local` for local development

## Security Best Practices

### ✅ DO

- Use `.env.local` for local development
- Add `.env*.local` to `.gitignore`
- Use `NEXT_PUBLIC_` prefix only for truly public data
- Rotate keys if accidentally committed
- Use different keys for development and production
- Store production secrets in deployment platform

### ❌ DON'T

- Commit `.env.local` or `.env.production` to git
- Use `NEXT_PUBLIC_` for sensitive data
- Share production keys in documentation
- Use production keys in development
- Hardcode secrets in source code

## Validation

### Check Environment Variables

```bash
# Run the environment checker
bun run check:env
```

This script validates:
- All required variables are set
- URLs are properly formatted
- Supabase connection works
- Telegram credentials are valid (if provided)

### Manual Validation

```bash
# Check if variables are loaded
bun run dev

# In browser console:
console.log(process.env.NEXT_PUBLIC_SITE_URL)
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

## Troubleshooting

### Variables Not Loading

**Problem**: Environment variables are undefined

**Solutions**:
1. Ensure file is named `.env.local` (not `.env.txt`)
2. Restart development server after changes
3. Check for syntax errors (no spaces around `=`)
4. Verify file is in project root

### Client-Side Variables Undefined

**Problem**: `NEXT_PUBLIC_*` variables are undefined in browser

**Solutions**:
1. Ensure variable has `NEXT_PUBLIC_` prefix
2. Restart dev server (variables are embedded at build time)
3. Check browser console for the value
4. Rebuild application: `bun run build`

### Supabase Connection Fails

**Problem**: Cannot connect to Supabase

**Solutions**:
1. Verify URL format: `https://[project-id].supabase.co`
2. Check anon key is correct (long JWT string)
3. Test connection: `bun run test:db`
4. Verify Supabase project is active

### Telegram Not Sending

**Problem**: Telegram notifications not working

**Solutions**:
1. Verify bot token is correct
2. Check chat ID (may be negative for groups)
3. Ensure bot is added to the group
4. Test with Telegram API directly
5. Check server logs for errors

## Platform-Specific Setup

### Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable with its value
3. Select environments: Production, Preview, Development
4. Redeploy to apply changes

### Netlify

1. Go to Site Settings → Environment Variables
2. Click "Add a variable"
3. Enter key and value
4. Redeploy to apply changes

### Docker

**Option 1: Environment file**
```bash
docker run --env-file .env.production -p 3000:3000 wedding-website
```

**Option 2: Individual variables**
```bash
docker run \
  -e NEXT_PUBLIC_SITE_URL=https://yoursite.com \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  -p 3000:3000 \
  wedding-website
```

**Option 3: Docker Compose**
```bash
# Uses .env file automatically
docker-compose up
```

## Testing

### Test All Variables

```bash
# Check environment setup
bun run check:env

# Test database connection
bun run test:db

# Build with current environment
bun run build
```

### Test Specific Features

```bash
# Test Supabase connection
curl -X POST http://localhost:3000/api/guest-messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","message":"Test message"}'

# Check if Telegram is configured
# (Check server logs after submitting a guest message)
```

## Reference

### Complete .env.local Template

```bash
# =============================================================================
# ENVIRONMENT VARIABLES - LOCAL DEVELOPMENT
# =============================================================================

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Telegram Bot Configuration (Optional)
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-987654321

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Variable Summary Table

| Variable | Required | Public | Used For |
|----------|----------|--------|----------|
| `NEXT_PUBLIC_SITE_URL` | ✅ Yes | ✅ Yes | SEO, metadata |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | ✅ Yes | Database connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | ✅ Yes | Database queries |
| `TELEGRAM_BOT_TOKEN` | ❌ No | ❌ No | Telegram notifications |
| `TELEGRAM_CHAT_ID` | ❌ No | ❌ No | Telegram notifications |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ❌ No | ✅ Yes | Analytics |

---

**Last Updated**: December 2025
