// Test script to verify Supabase connection
// Run this after updating your .env.local with the actual password
// Usage: node test-supabase-connection.js

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔄 Testing Supabase connection...');
    console.log('Database URL (masked):', process.env.DATABASE_URL.replace(/:[^:@]*@/, ':***@'));
    
    const client = await pool.connect();
    
    // Test basic connection
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Connection successful!');
    console.log('📅 Server time:', result.rows[0].current_time);
    console.log('🗄️  PostgreSQL version:', result.rows[0].pg_version.split(' ')[0] + ' ' + result.rows[0].pg_version.split(' ')[1]);
    
    // Check if we can create a test table (optional)
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS connection_test (
          id SERIAL PRIMARY KEY,
          test_message TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      
      await client.query(`
        INSERT INTO connection_test (test_message) 
        VALUES ('Supabase connection test successful')
      `);
      
      const testResult = await client.query(`
        SELECT * FROM connection_test 
        ORDER BY created_at DESC 
        LIMIT 1
      `);
      
      console.log('✅ Database write test successful');
      console.log('📝 Test record:', testResult.rows[0]);
      
      // Clean up test table
      await client.query('DROP TABLE IF EXISTS connection_test');
      console.log('🧹 Cleaned up test table');
      
    } catch (tableError) {
      console.log('⚠️  Table test failed (this is normal if you don\'t have write permissions)');
      console.log('Error:', tableError.message);
    }
    
    client.release();
    await pool.end();
    
    console.log('\n🎉 Supabase configuration is ready for migration!');
    
  } catch (error) {
    console.log('❌ Connection failed!');
    console.error('Error:', error.message);
    console.log('\n🔧 Please check:');
    console.log('1. Your DATABASE_URL in .env.local has the correct password');
    console.log('2. Your Supabase project is running');
    console.log('3. Your internet connection is working');
    process.exit(1);
  }
}

testConnection();