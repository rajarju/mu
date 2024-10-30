// lib/db.js
import { Pool } from 'pg';

// Use a connection pool to manage database connections efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
