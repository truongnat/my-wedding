/**
 * Environment Variables Check
 *
 * Quick script to verify that required environment variables are set.
 * Run with: bun run scripts/check-env.ts
 */

console.log('🔍 Checking environment variables...\n');

const requiredVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];

let allPresent = true;

for (const varName of requiredVars) {
  const value = process.env[varName];

  if (!value) {
    console.log(`❌ ${varName}: Not set`);
    allPresent = false;
  } else if (value.includes('your-') || value.includes('example')) {
    console.log(`⚠️  ${varName}: Set but appears to be a placeholder`);
    console.log(`   Value: ${value}`);
    allPresent = false;
  } else {
    console.log(`✅ ${varName}: Set`);
    // Show partial value for verification
    const partial = `${value.substring(0, 20)}...`;
    console.log(`   Value: ${partial}`);
  }
}

console.log('');

if (allPresent) {
  console.log('✨ All required environment variables are set!\n');
  console.log('Next step: Run "bun run test:db" to verify database connection.');
  process.exit(0);
} else {
  console.log('❌ Some environment variables are missing or invalid.\n');
  console.log('Please follow these steps:');
  console.log('1. Create a .env.local file in the project root');
  console.log('2. Add your Supabase credentials:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  console.log('\nSee supabase/SETUP_GUIDE.md for detailed instructions.');
  process.exit(1);
}
