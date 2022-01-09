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
    const info = this.db.prepare('INSERT INTO inventory (name, quantity, lastUpdated, status) VALUES (?, ?, ?, ?)')
        .run(name, quantity, Date.now(), 'valid');
    return info.changes;
  }
  update(id, field, value) {
    field = field.toLowerCase();
    let stmt;
    if (field === 'name') {
      stmt = this.db.prepare('UPDATE inventory SET name = ?, lastUpdated = ? WHERE id = ? AND status = ?');
    } else if (field === 'quantity') {
      stmt = this.db.prepare('UPDATE inventory SET quantity = ?, lastUpdated = ? WHERE id = ? AND status = ?');
    } else {
      throw `Unknown field ${field}`;
    }
    const info = stmt.run(value, Date.now(), id, 'valid');
    return info.changes;
  }
  delete(id, comments) {
    let info;
    if (!comments) comments = '';
    info = this.db.prepare('UPDATE inventory SET status = ?, lastUpdated = ?, comments = ? WHERE id = ? AND status = ?')
          .run('deleted', Date.now(), comments, id, 'valid');
    return info.changes;
  }
  undelete(id) {
    const info = this.db.prepare('UPDATE inventory SET status = ?, lastUpdated = ? WHERE id = ? AND status = ?')
        .run('valid', Date.now(), id, 'deleted');
    return info.changes;
  }
}

module.exports = new InventoryDao();