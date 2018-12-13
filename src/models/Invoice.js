const BaseModel = require('./model');

class Invoice extends BaseModel {
  static get tableName() {
    return 'invoices'
  }
}

module.exports = Invoice