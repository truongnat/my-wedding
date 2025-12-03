/**
 * Database Connection and Schema Test
 *
 * This script tests the Supabase connection and verifies that the database
 * schema is set up correctly.
 *
 * Run with: bun run scripts/test-database.ts
 */

import { createClient } from '../lib/supabase/client';

async function testDatabaseConnection() {
  console.log('🔍 Testing Supabase database connection...\n');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing environment variables');
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
  }

  console.log('✅ Environment variables found');
  console.log(`   URL: ${supabaseUrl}\n`);

  const supabase = createClient();

  // Test 1: Check rsvp_submissions table
  console.log('📋 Test 1: Checking rsvp_submissions table...');
  try {
    const { data, error } = await supabase.from('rsvp_submissions').select('*').limit(1);

    if (error) {
      console.error('❌ Error accessing rsvp_submissions table:', error.message);
      return false;
    }

    console.log('✅ rsvp_submissions table exists and is accessible');
    console.log(`   Current records: ${data?.length || 0}\n`);
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }

  // Test 2: Check guest_messages table
  console.log('📋 Test 2: Checking guest_messages table...');
  try {
    const { data, error } = await supabase.from('guest_messages').select('*').limit(1);

    if (error) {
      console.error('❌ Error accessing guest_messages table:', error.message);
      return false;
    }

    console.log('✅ guest_messages table exists and is accessible');
    console.log(`   Current records: ${data?.length || 0}\n`);
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }

  // Test 3: Test insert into rsvp_submissions
  console.log('📋 Test 3: Testing insert into rsvp_submissions...');
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      attending: true,
      guests: 2,
      message: 'This is a test submission',
    };

    const { data, error } = await supabase
      .from('rsvp_submissions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.error('❌ Error inserting test data:', error.message);
      return false;
    }

    console.log('✅ Successfully inserted test RSVP');
    console.log(`   ID: ${data.id}\n`);

    // Clean up test data
    await supabase.from('rsvp_submissions').delete().eq('id', data.id);
    console.log('🧹 Cleaned up test data\n');
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }

  // Test 4: Test insert into guest_messages
  console.log('📋 Test 4: Testing insert into guest_messages...');
  try {
    const testMessage = {
      name: 'Test Guest',
      message: 'This is a test message',
      approved: false,
    };

    const { data, error } = await supabase
      .from('guest_messages')
      .insert(testMessage)
      .select()
      .single();

    if (error) {
      console.error('❌ Error inserting test message:', error.message);
      return false;
    }

    console.log('✅ Successfully inserted test message');
    console.log(`   ID: ${data.id}\n`);

    // Clean up test data
    await supabase.from('guest_messages').delete().eq('id', data.id);
    console.log('🧹 Cleaned up test data\n');
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }

  // Test 5: Test RLS policy for approved messages
  console.log('📋 Test 5: Testing RLS policy for guest_messages...');
  try {
    // Insert an unapproved message
    const { data: unapprovedMsg } = await supabase
      .from('guest_messages')
      .insert({
        name: 'RLS Test',
        message: 'Unapproved message',
        approved: false,
      })
      .select()
      .single();

    // Insert an approved message
    const { data: approvedMsg } = await supabase
      .from('guest_messages')
      .insert({
        name: 'RLS Test',
        message: 'Approved message',
        approved: true,
      })
      .select()
      .single();

    // Try to read all messages (should only get approved ones)
    const { data: messages } = await supabase
      .from('guest_messages')
      .select('*')
      .in('id', [unapprovedMsg?.id, approvedMsg?.id]);

    const foundApproved = messages?.some((m) => m.id === approvedMsg?.id);
    const foundUnapproved = messages?.some((m) => m.id === unapprovedMsg?.id);

    if (foundApproved && !foundUnapproved) {
      console.log('✅ RLS policy working correctly');
      console.log('   Only approved messages are readable\n');
    } else {
      console.error('❌ RLS policy not working as expected');
      return false;
    }

    // Clean up
    if (unapprovedMsg?.id) {
      await supabase.from('guest_messages').delete().eq('id', unapprovedMsg.id);
    }
    if (approvedMsg?.id) {
      await supabase.from('guest_messages').delete().eq('id', approvedMsg.id);
    }
    console.log('🧹 Cleaned up test data\n');
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }

  return true;
}

// Run the tests
testDatabaseConnection()
  .then((success) => {
    if (success) {
      console.log('✨ All database tests passed!\n');
      console.log('Your Supabase database is configured correctly.');
      process.exit(0);
    } else {
      console.error('\n❌ Some tests failed. Please check the errors above.');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('\n❌ Fatal error:', err);
    process.exit(1);
  });
