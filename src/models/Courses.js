'use strict';

const {bookshelf} = require('../bookshelf');

const Courses = Bookshelf.Model.extend({
  tableName: 'courses'
})

module.exports = bookshelf.model('Courses', Courses);;