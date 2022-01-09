const debug = require('debug')('backend:db');
const sqlite3 = require('better-sqlite3');
const schemas = require('../models/inventory')
const seedData = require('../data/seedData');

class InventoryDao {
  constructor() {
    this.db = null;
  }
  init() {
    if (!this.db) {
      this.db = new sqlite3(':memory:');
      debug('DB connection opened.');
      this.db.exec(schemas.inventorySchema);
      debug('Tables created successfully.')

      // For demo purposes, we seed the table with some initial data
      for (const elem of seedData) this.add(elem.name, elem.quantity);
    }
  }
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      debug('DB connection closed.');
    }
  }
  list() {
    return this.db.prepare('SELECT * FROM inventory').all();
  }
  add(name, quantity) {
    const info = this.db.prepare('INSERT INTO inventory (name, quantity) VALUES (?, ?)').run(name, quantity);
    return info.changes;
  }
  update(id, field, value) {
    field = field.toLowerCase();
    if (field !== 'name' && field !== 'quantity') {
      throw `Unknown field ${field}`;
    }
    const info = this.db.prepare('UPDATE inventory SET ' + field + ' = ? WHERE id = ?').run(value, id);
    return info.changes;
  }
  delete(id) {
    const info = this.db.prepare('DELETE FROM inventory WHERE id = ?').run(id);
    return info.changes;
  }
}

module.exports = new InventoryDao();