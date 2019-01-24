'use strict';

const { bookshelf } = require('../bookshelf');
const Resets = require('./Resets');
const Invoices = require('./Invoices');

const User = bookshelf.Model.extend({
  tableName: 'users',

  hidden: ['password', 'id'],

  resets: function(){
    return this.hasMany(Resets);
  },

  invoices: function () {
    return this.hasMany(Invoices);
  }
}, {
  // byId: async id => User.query({where: {id: id}}).fetch(),
  // byEmail: async email => User.query({where: { email: email }}).fetch()

  byEmail: async function(email) {
    return User.query({where: { email: email }}).fetch()
  },

  byId: async function (id) {
    return User.query({where: {id: id}}).fetch()
  }
})

module.exports = bookshelf.model('User', User);

