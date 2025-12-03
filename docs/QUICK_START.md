# Quick Start Guide

Get your wedding website up and running in minutes!

## 🚀 Fast Track (5 minutes)

### 1. Install Dependencies

```bash
bun install
```

### 2. Set Up Environment

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your values
# Minimum required:
# - NEXT_PUBLIC_SITE_URL
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 3. Set Up Database

Follow the quick guide: [DATABASE_SETUP_QUICKSTART.md](./DATABASE_SETUP_QUICKSTART.md)

Or manually run the migrations in `supabase/migrations/`

### 4. Start Development

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Production (10 minutes)

### Option 1: Vercel (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Add environment variables
   - Click Deploy!

### Option 2: Other Platforms

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Netlify
- Self-hosted with Docker
- PM2 deployment

## ✅ Pre-Deployment Checklist

Quick checks before going live:

```bash
# 1. Type check
bun run type-check

# 2. Build test
bun run build

# 3. Test production locally
bun run start
```

Visit [http://localhost:3000](http://localhost:3000) and verify:
- [ ] Homepage loads
- [ ] RSVP form works
- [ ] Guest messages work
- [ ] Images display
- [ ] Navigation works

## 🔧 Common Tasks

### Update Content

Edit these files to customize your site:
- `app/page.tsx` - Main content
- `components/server/` - Static sections
- `components/client/` - Interactive sections
- `lib/constants.ts` - Site-wide constants

### Add Images

1. Place images in `public/images/`
2. Use the optimized Image component:
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/images/photo.jpg"
     alt="Description"
     width={800}
     height={600}
   />
   ```

### Customize Styling

- Edit `app/globals.css` for global styles
- Modify Tailwind classes in components
- Update `tailwind.config.ts` for theme changes

### Test Database Connection

```bash
bun run test:db
```

### Generate Database Types

```bash
# Update types from Supabase schema
bun run db:types
```

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
bun install
bun run build
```

### Environment Variables Not Working

- Ensure `.env.local` exists (not `.env`)
- Restart dev server after changes
- Use `NEXT_PUBLIC_` prefix for client-side variables

### Database Connection Issues

```bash
# Test connection
bun run test:db

# Check environment variables
bun run check:env
```

### Images Not Loading

- Check file paths are correct
- Verify images are in `public/` directory
- Check `next.config.ts` for remote patterns

## 📚 Full Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Detailed checklist
- [DATABASE_SETUP_QUICKSTART.md](./DATABASE_SETUP_QUICKSTART.md) - Database setup
- [docs/TELEGRAM_SETUP.md](./docs/TELEGRAM_SETUP.md) - Telegram integration

## 🎯 Next Steps

1. ✅ Customize content and images
2. ✅ Test all features locally
3. ✅ Set up Supabase database
4. ✅ Configure environment variables
5. ✅ Deploy to production
6. ✅ Test production deployment
7. ✅ Submit sitemap to Google
8. ✅ Share your beautiful wedding website!

---

**Need Help?** Check the [Troubleshooting](./DEPLOYMENT.md#troubleshooting) section in DEPLOYMENT.md
