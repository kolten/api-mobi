'use strict';

const Bookshelf = require('../bookshelf');

const Courses = Bookshelf.Model.extend({
  tableName: 'courses'
})

module.exports = bookshelf.model('Courses', Courses);;