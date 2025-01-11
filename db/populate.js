const pool = require("./pool");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const insertDataQuery = `
  INSERT INTO messages (username, message)
  VALUES 
    ('Alice', 'Hello, this is Alice!'),
    ('Bob', 'Hey there, Bob here.'),
    ('Charlie', 'Charlie reporting in.');
`;

async function populateDB() {
  try {
    await pool.query(createTableQuery);
    console.log("Messages table created or already exists.");

    await pool.query(insertDataQuery);
    console.log("Initial messages inserted.");
  } catch (err) {
    console.error("Error populating the database:", err);
  } finally {
    await pool.end();
  }
}

populateDB();
