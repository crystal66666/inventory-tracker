module.exports = {
  inventorySchema: `
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name INTEGER NOT NULL UNIQUE,
      quantity INTEGER NOT NULL,
      status TEXT
    )`
};