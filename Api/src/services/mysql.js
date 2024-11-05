const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fonction pour vérifier la connexion
async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.query('SELECT 1'); // Simple query to test the connection
    console.log('Database connection successful.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    connection.release();
  }
}

module.exports = { pool, testConnection };
