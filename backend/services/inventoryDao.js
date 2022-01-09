const debug = require('debug')('backend:db');
const sqlite3 = require('sqlite3');
const schemas = require('../models/inventory')

class InventoryDao {
  constructor() {
    this.db = null;
  }
  init() {
    if (!this.db) {
      this.db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
          this.db = null;
          throw `Failed to create DB: ${err.message}`;
        }
        debug('DB connection opened.');
        this.db.run(schemas.skuSchema, (err) => {
          if (err) {
            throw `Failed to create sku table: ${err.message}`;
          }
          this.db.run(schemas.inventorySchema, (err) => {
            if (err) {
              throw `Failed to create inventory table: ${err.message}`;
            }
          });
        });
        debug('Tables created successfully.')
      });
    }
  }
  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          throw `Failed to close DB: ${err.message}`;
        }
        this.db = null;
        debug('DB connection closed.');
      });
    }
  }
  addSkus(skus) {
    if (this.db) {
      const placeholders = skus.map((sku) => '(?)').join(',');
      this.db.run('INSERT INTO sku VALUES ' + placeholders, skus, (err) => {
        if (err) {
          throw `Failed to add skus ${skus}: ${err.message}`;
        }
        debug(`Inserted ${this.changes} rows into sku table.`)
      });
    }
  }
}

module.exports = new InventoryDao();