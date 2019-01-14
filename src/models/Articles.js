'use strict';

const { bookshelf } = require('../bookshelf');

const Articles = Bookshelf.Model.extend({
  tableName: 'articles'
})

module.exports = bookshelf.model('Articles', Articles);