# Supabase Database Schema

This directory contains the database migrations for the wedding website application.

## Migrations

### 001_create_tables.sql
Creates the core database tables:
- `rsvp_submissions`: Stores RSVP form submissions from guests
- `guest_messages`: Stores messages from guests to the couple

Also includes:
- Indexes for query performance optimization
- Trigger for automatic `updated_at` timestamp updates

### 002_enable_rls.sql
Enables Row Level Security (RLS) and creates security policies:
- Public insert access for both tables
- Public read access for RSVP submissions
- Read access only for approved guest messages

## Schema Details

### rsvp_submissions Table

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| name | TEXT | No | - | Guest name |
| email | TEXT | No | - | Guest email |
| attending | BOOLEAN | No | - | Whether guest is attending |
| guests | INTEGER | No | 0 | Number of additional guests |
| dietary_restrictions | TEXT | Yes | NULL | Dietary restrictions |
| message | TEXT | Yes | NULL | Message to the couple |
| created_at | TIMESTAMPTZ | No | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | No | NOW() | Last update timestamp |

**Indexes:**
- `idx_rsvp_submissions_email` on `email`
- `idx_rsvp_submissions_created_at` on `created_at DESC`

### guest_messages Table

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| name | TEXT | No | - | Guest name |
| message | TEXT | No | - | Message content |
| approved | BOOLEAN | No | false | Whether message is approved |
| created_at | TIMESTAMPTZ | No | NOW() | Creation timestamp |

**Indexes:**
- `idx_guest_messages_approved` on `approved`
- `idx_guest_messages_created_at` on `created_at DESC`

## Row Level Security Policies

### rsvp_submissions
- **Insert**: Anyone can insert RSVP submissions
- **Select**: Anyone can read RSVP submissions

### guest_messages
- **Insert**: Anyone can insert guest messages
- **Select**: Anyone can read approved messages only (where `approved = true`)

## Setup Instructions

See [../scripts/setup-database.md](../scripts/setup-database.md) for detailed setup instructions.

## Testing

Run the database connection test:
```bash
bun run test:db
```

This will verify:
- Database connection is working
- Tables are created correctly
- Insert operations work
- RLS policies are functioning as expected
