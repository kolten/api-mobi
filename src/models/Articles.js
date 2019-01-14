'use strict';

const { bookshelf } = require('../bookshelf');

const Articles = bookshelf.Model.extend({
  tableName: 'articles'
})

module.exports = bookshelf.model('Articles', Articles);