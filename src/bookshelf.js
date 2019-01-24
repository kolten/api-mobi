const knex = require('../db/knex');

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('pagination');
bookshelf.plugin('visibility');

module.exports = {
  bookshelf,
  knex
}

