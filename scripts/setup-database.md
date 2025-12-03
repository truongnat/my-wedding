# Database Setup Instructions

This document provides instructions for setting up the Supabase database schema for the wedding website.

## Prerequisites

1. A Supabase project created at [supabase.com](https://supabase.com)
2. Environment variables configured in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Setup Methods

### Method 1: Using Supabase Dashboard (Recommended for Quick Setup)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the migration files in order:
   - First: `supabase/migrations/001_create_tables.sql`
   - Second: `supabase/migrations/002_enable_rls.sql`

### Method 2: Using Supabase CLI (Recommended for Development)

1. Install Supabase CLI:
   ```bash
   bun add -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Push migrations:
   ```bash
   supabase db push
   ```

4. Generate TypeScript types:
   ```bash
   bun run db:types
   ```

## Verify Setup

After running the migrations, verify the setup by running:

```bash
bun run test:db
```

This will test the database connection and verify that tables are created correctly.

## Database Schema

### Tables Created

1. **rsvp_submissions**
   - Stores RSVP form submissions
   - Fields: id, name, email, attending, guests, dietary_restrictions, message, created_at, updated_at
   - RLS: Anyone can insert, anyone can read

2. **guest_messages**
   - Stores guest messages for the couple
   - Fields: id, name, message, approved, created_at
   - RLS: Anyone can insert, only approved messages can be read

### Row Level Security (RLS)

Both tables have RLS enabled with the following policies:

- **rsvp_submissions**: Public insert and read access
- **guest_messages**: Public insert, read only approved messages

## Troubleshooting

If you encounter issues:

1. Verify environment variables are set correctly
2. Check that your Supabase project is active
3. Ensure the anon key has the correct permissions
4. Review the Supabase logs in the dashboard
