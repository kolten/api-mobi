const shortid = require('shortid');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('password_resets').del()
    .then(function () {
      // Inserts seed entries
      return knex('password_resets').insert([
        {user_id: 1, token: shortid.generate()},
        {user_id: 2, token: shortid.generate()},
        {user_id: 3, token: shortid.generate()}
      ]);
    });
};
