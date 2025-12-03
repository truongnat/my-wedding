# Supabase Database Setup Guide

This guide will walk you through setting up the Supabase database for the wedding website.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Wedding Website (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the region closest to your users
4. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root of your project:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Run Database Migrations

### Option A: Using Supabase Dashboard (Easiest)

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `supabase/migrations/001_create_tables.sql`
4. Paste into the SQL editor and click "Run"
5. Create another new query
6. Copy the contents of `supabase/migrations/002_enable_rls.sql`
7. Paste and click "Run"

### Option B: Using Supabase CLI (For Development)

1. Install Supabase CLI:
   ```bash
   bun add -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project (get project ref from dashboard URL):
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Push migrations:
   ```bash
   supabase db push
   ```

## Step 5: Verify the Setup

Run the database test script:
```bash
bun run test:db
```

You should see output like:
```
🔍 Testing Supabase database connection...

✅ Environment variables found
   URL: https://your-project-id.supabase.co

📋 Test 1: Checking rsvp_submissions table...
✅ rsvp_submissions table exists and is accessible
   Current records: 0

📋 Test 2: Checking guest_messages table...
✅ guest_messages table exists and is accessible
   Current records: 0

📋 Test 3: Testing insert into rsvp_submissions...
✅ Successfully inserted test RSVP
   ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
🧹 Cleaned up test data

📋 Test 4: Testing insert into guest_messages...
✅ Successfully inserted test message
   ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
🧹 Cleaned up test data

📋 Test 5: Testing RLS policy for guest_messages...
✅ RLS policy working correctly
   Only approved messages are readable
🧹 Cleaned up test data

✨ All database tests passed!

Your Supabase database is configured correctly.
```

## Step 6: Verify in Supabase Dashboard

1. Go to **Table Editor** in your Supabase dashboard
2. You should see two tables:
   - `rsvp_submissions`
   - `guest_messages`
3. Click on each table to verify the schema matches the design

## Troubleshooting

### Error: "Missing environment variables"
- Make sure `.env.local` exists and contains the correct values
- Restart your development server after creating `.env.local`

### Error: "relation does not exist"
- The migrations haven't been run yet
- Follow Step 4 to run the migrations

### Error: "Invalid API key"
- Double-check that you copied the **anon public** key, not the service role key
- Make sure there are no extra spaces in your `.env.local` file

### Error: "new row violates row-level security policy"
- RLS policies may not be set up correctly
- Re-run the `002_enable_rls.sql` migration

## Next Steps

Once the database is set up and verified:
1. The database is ready for use by the application
2. You can proceed with implementing the data fetching hooks
3. The RSVP form and guest messages features will be able to store data

## Updating Database Types

If you make changes to the database schema in the future, regenerate the TypeScript types:

```bash
# Update the project-id in package.json first
bun run db:types
```

Or manually:
```bash
supabase gen types typescript --project-id your-project-id > types/database.ts
```
