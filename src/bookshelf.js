const knex = require('../db/knex');

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = {
  bookshelf,
  knex
}

