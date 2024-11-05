const pool = require('../services/mysql');
const fs = require('fs');
const path = require('path');

async function initDb() {
  try {
    // Charger le schéma SQL depuis un fichier (par exemple `schema.sql`)
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    const connection = await pool.getConnection();
    try {
      await connection.query(schema);
      console.log('Database initialized successfully.');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

module.exports = { initDb };