const pool = require("./pool");

async function getAllMessages() {
  try {
    const res = await pool.query(
      "SELECT username, message, created_at FROM messages ORDER BY created_at DESC"
    );
    console.log("Database response:", res.rows); // Debug log
    return res.rows;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
}

async function addMessage(username, message) {
  const insertQuery =
    "INSERT INTO messages (username, message) VALUES ($1, $2)";
  await pool.query(insertQuery, [username, message]);
}

async function deleteAllMessages() {
  const deleteQuery = "DELETE FROM messages";
  await pool.query(deleteQuery);
}

module.exports = {
  getAllMessages,
  addMessage,
  deleteAllMessages,
};
