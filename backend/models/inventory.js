module.exports = {
  inventorySchema: `
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      quantity INTEGER NOT NULL,
      lastUpdated INTEGER NOT NULL,
      status TEXT,
      comments TEXT
    )`
};