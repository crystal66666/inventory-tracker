module.exports = {
  skuSchema: `
    CREATE TABLE IF NOT EXISTS sku (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )`,

  inventorySchema: `
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      skuId INTEGER,
      quantity INTEGER,
      FOREIGN KEY(skuId) REFERENCES sku(id)
    )`
};