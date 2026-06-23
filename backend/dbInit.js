const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

async function run() {
  const maskedConn = connectionString ? connectionString.replace(/:([^:@]+)@/, ':****@') : 'undefined';
  console.log('Connecting to PostgreSQL database at:', maskedConn);
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Successfully connected to database.');

    // Read schema.sql
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    console.log('Reading schema file:', schemaPath);
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Run schema.sql
    console.log('Initializing schema...');
    await client.query(schemaSql);
    console.log('Schema initialized successfully.');

    // Read seed.sql
    const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');
    console.log('Reading seed file:', seedPath);
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    // Run seed.sql
    console.log('Seeding database...');
    await client.query(seedSql);
    console.log('Database seeded successfully.');

  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
