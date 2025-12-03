# Modern Wedding Page Design

A modern, performant wedding website built with Next.js 16, React 19, and Supabase.

The original design is available at https://www.figma.com/design/XMVWbBtJD5mFHnH1TWliMa/Modern-Wedding-Page-Design.

## Features

- ✨ Modern, elegant design with smooth animations
- 🚀 Built with Next.js 16 App Router for optimal performance
- 📱 Fully responsive across all devices
- 🎨 Styled with Tailwind CSS and shadcn/ui components
- 🖼️ Optimized images with Next.js Image component
- 📊 RSVP form with Supabase backend
- 💬 Guest messages with optional Telegram notifications
- ⏱️ Live countdown timer to the wedding date
- 🎵 Music player for wedding playlist
- 🖼️ Photo gallery with carousel
- 🗺️ Venue map and details
- 📈 SEO optimized with metadata and structured data
- ♿ Accessible with ARIA labels and semantic HTML

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Runtime**: Bun
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: Supabase (PostgreSQL)
- **Data Fetching**: TanStack Query
- **Animation**: Framer Motion
- **Linting/Formatting**: Biome
- **Testing**: Vitest + React Testing Library + fast-check

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0 or later)
- [Supabase](https://supabase.com) account (for database)
- [Telegram Bot](https://core.telegram.org/bots) (optional, for notifications)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd wedding-website
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   - Supabase URL and API key
   - Site URL
   - Telegram credentials (optional)

4. **Set up the database**:
   - Follow the guide in `DATABASE_SETUP_QUICKSTART.md`
   - Or run the migrations in `supabase/migrations/`

5. **Start the development server**:
   ```bash
   bun run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
bun run dev              # Start development server with Turbopack
bun run build            # Build for production
bun run start            # Start production server
bun run build:analyze    # Build with bundle analyzer

# Code Quality
bun run type-check       # Run TypeScript type checking
bun run lint             # Run Biome linting
bun run lint:fix         # Fix linting issues
bun run format           # Format code with Biome

# Testing
bun run test             # Run tests once
bun run test:watch       # Run tests in watch mode
bun run test:ui          # Run tests with UI
bun run test:coverage    # Run tests with coverage

# Database
bun run check:env        # Check environment variables
bun run test:db          # Test database connection
bun run db:types         # Generate TypeScript types from Supabase
```

## Project Structure

```
wedding-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   └── not-found.tsx      # 404 page
├── components/
│   ├── client/            # Client components
│   ├── server/            # Server components
│   └── ui/                # Shared UI components
├── lib/                   # Utilities and configurations
│   ├── supabase/          # Supabase clients
│   ├── tanstack/          # TanStack Query setup
│   └── telegram/          # Telegram integration
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── test/                  # Test files and utilities
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

1. Click the button above
2. Set environment variables in Vercel dashboard
3. Deploy!

### Environment Variables

Required for production:
- `NEXT_PUBLIC_SITE_URL` - Your production domain
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

Optional:
- `TELEGRAM_BOT_TOKEN` - For guest message notifications
- `TELEGRAM_CHAT_ID` - Telegram group/chat ID

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist
- [Database Setup](./DATABASE_SETUP_QUICKSTART.md) - Database configuration
- [Telegram Integration](./docs/TELEGRAM_SETUP.md) - Telegram bot setup
- [Caching Strategy](./docs/CACHING_STRATEGY.md) - Caching implementation
- [Bundle Optimization](./docs/BUNDLE_OPTIMIZATION.md) - Performance optimization

## Configuration

### Supabase

Database tables required:
- `rsvp_submissions` - RSVP form data
- `guest_messages` - Guest messages with approval system

See `supabase/migrations/` for schema definitions.

### Telegram (Optional)

For real-time guest message notifications:
1. Create a bot with [@BotFather](https://t.me/botfather)
2. Add bot to your group
3. Configure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

See [docs/TELEGRAM_SETUP.md](./docs/TELEGRAM_SETUP.md) for details.

## Contributing

This is a personal wedding website project. Feel free to fork and customize for your own use!

## License

This project is based on the Modern Wedding Page Design from Figma.

## Support

For issues or questions:
1. Check the [Deployment Guide](./DEPLOYMENT.md)
2. Review the [Troubleshooting](./DEPLOYMENT.md#troubleshooting) section
3. Check the spec documents in `.kiro/specs/nextjs-migration/`
  