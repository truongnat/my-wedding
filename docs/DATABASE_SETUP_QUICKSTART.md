# Database Setup Quick Start

## ✅ Task 3 Complete: Database Schema Created

The database schema has been implemented and is ready for setup.

## 🚀 Quick Start (3 Steps)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your **Project URL** and **anon public key**

### Step 2: Configure Environment
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your credentials:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Run Migrations
**Option A - Supabase Dashboard (Easiest):**
1. Go to SQL Editor in your Supabase dashboard
2. Run `supabase/migrations/001_create_tables.sql`
3. Run `supabase/migrations/002_enable_rls.sql`

**Option B - Supabase CLI:**
```bash
supabase link --project-ref your-project-ref
supabase db push
```

## ✅ Verify Setup

```bash
# Check environment variables
bun run check:env

# Test database connection
bun run test:db
```

## 📚 Detailed Documentation

- **Full Setup Guide**: `supabase/SETUP_GUIDE.md`
- **Schema Documentation**: `supabase/README.md`
- **Implementation Details**: `supabase/IMPLEMENTATION_SUMMARY.md`

## 📋 What Was Created

### Database Tables
- ✅ `rsvp_submissions` - Stores RSVP form data
- ✅ `guest_messages` - Stores guest messages (with approval system)

### Security
- ✅ Row Level Security (RLS) enabled
- ✅ Public insert policies
- ✅ Approved-only read policy for messages

### Type Safety
- ✅ TypeScript types generated (`types/database.ts`)
- ✅ Supabase clients configured with types

### Testing
- ✅ Database connection test script
- ✅ Environment validation script
- ✅ Comprehensive test coverage

## 🎯 Next Steps

After completing the database setup:
1. ✅ Verify with `bun run test:db`
2. Move to **Task 4**: Set up root layout with metadata and fonts
3. Later tasks will use this database for RSVP and guest messages

## ❓ Need Help?

- **Troubleshooting**: See `supabase/SETUP_GUIDE.md` → Troubleshooting section
- **Schema Details**: See `supabase/README.md`
- **Test Issues**: Run `bun run check:env` first to verify configuration

---

**Requirements Validated:**
- ✅ 13.2: RSVP data stored in Supabase database
- ✅ 13.3: Guest messages persisted to Supabase
