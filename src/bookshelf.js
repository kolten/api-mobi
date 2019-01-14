const knex = require('../db/knex');

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('pagination')

module.exports = {
  bookshelf,
  knex
}

