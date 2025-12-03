-- Create rsvp_submissions table
CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INTEGER NOT NULL DEFAULT 0,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guest_messages table
CREATE TABLE IF NOT EXISTS guest_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_rsvp_submissions_email ON rsvp_submissions(email);
CREATE INDEX IF NOT EXISTS idx_rsvp_submissions_created_at ON rsvp_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guest_messages_approved ON guest_messages(approved);
CREATE INDEX IF NOT EXISTS idx_guest_messages_created_at ON guest_messages(created_at DESC);

-- Add updated_at trigger for rsvp_submissions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rsvp_submissions_updated_at
  BEFORE UPDATE ON rsvp_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
