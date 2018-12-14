'use strict';

const {bookshelf} = require('../bookshelf');

const Invoices = bookshelf.Model.extend({
  tableName: 'invoices'
})

module.exports = bookshelf.model('Invoices', Invoices);;