const debug = require('debug')('backend:db');
const sqlite3 = require('better-sqlite3');
const schemas = require('../models/inventory')

class InventoryDao {
  constructor() {
    this.db = null;
  }
  init() {
    if (!this.db) {
      this.db = new sqlite3(':memory:');
      debug('DB connection opened.');
      this.db.exec(schemas.skuSchema);
      this.db.exec(schemas.inventorySchema);
      debug('Tables created successfully.')
      const info = this.db.prepare('INSERT INTO sku (name) VALUES (?)').run('stuff');
      debug(`Inserted ${info.changes} rows`);
      const result = this.db.prepare('SELECT * FROM sku').get();
      debug(result.id);
      debug(result.name);
    }
  }
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      debug('DB connection closed.');
    }
  }
  listInventory() {
    if (this.db) {
      //const result = this.db.prepare('SELECT * FROM inventory')
    }
  }
  listSkus() {
    return this.db.prepare('SELECT * FROM sku').all();
  }
  addSkus(skus) {
    const placeholders = skus.map((sku) => '(?)').join(',');
    const info = this.db.prepare('INSERT INTO sku (name) VALUES ' + placeholders).run(skus);
    debug(`Inserted ${info.changes} rows into sku table.`);
  }
}

module.exports = new InventoryDao();