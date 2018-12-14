'use strict';

const { bookshelf } = require('../bookshelf');
const Resets = require('./Resets');
const Invoices = require('./Invoices');

const User = bookshelf.Model.extend({
  tableName: 'users',

  resets: function(){
    return this.hasMany('Resets');
  },

  invoices: function () {
    return this.hasMany('Invoices');
  }
}, {
  byId: id => User
    .query({where: {id: id}}).fetch()
})

module.exports = bookshelf.model('User', User);

