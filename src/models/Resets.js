'use strict';

const {bookshelf} = require('../bookshelf');
const User = require('./User');

const Resets = bookshelf.Model.extend({
  tableName: 'password_resets',

  user: function(){
    return this.belongsTo('User')
  }
})


module.exports = bookshelf.model('Resets', Resets);