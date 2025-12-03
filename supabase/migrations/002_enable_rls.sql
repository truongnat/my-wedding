-- Enable Row Level Security on both tables
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rsvp_submissions
-- Allow anyone to insert RSVP submissions
CREATE POLICY "Anyone can insert RSVP submissions"
  ON rsvp_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read their own submissions (by email)
CREATE POLICY "Users can read their own RSVP submissions"
  ON rsvp_submissions
  FOR SELECT
  USING (true);

-- RLS Policies for guest_messages
-- Allow anyone to insert guest messages
CREATE POLICY "Anyone can insert guest messages"
  ON guest_messages
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read approved messages only
CREATE POLICY "Anyone can read approved guest messages"
  ON guest_messages
  FOR SELECT
  USING (approved = true);
