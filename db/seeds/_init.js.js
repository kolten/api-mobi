const shortid = require('shortid');

exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(function() {
    return knex('users').insert([
      {id: 1, first_name: 'Kolten', last_name: 'Sturgill', student_id: '1001089599', email: 'kolten.sturgill@mavs.uta.edu', password: '$2a$10$y9t1Noglwg55acUzBeuAVeTg8/zHKfNNZo9iUsWGeqZc5keQOJUri', is_admin: true, member: true},
      {id: 2, first_name: 'Mary', last_name: 'Huerta', student_id: '1001000000', email: 'mary.huerta@mavs.uta.edu', password: '$2a$10$w5GnIiV6c/EXP3PTjAfXyOF7QpI3cxXYJInuXBzpwtg3UjnQmQYSG'},
      {id: 3, first_name: 'Zach', last_name: 'Gentry', student_id: '1001011111', email: 'zach.gentry@mavs.uta.edu', password: '$2a$10$w5GnIiV6c/EXP3PTjAfXyOF7QpI3cxXYJInuXBzpwtg3UjnQmQYSG'},
    ]);
  })
  .then(function(){
    return knex('password_resets').del()
  })
  .then(function() {
    return knex('password_resets').insert([
      {user_id: 1, token: shortid.generate()},
      {user_id: 2, token: shortid.generate()},
      {user_id: 3, token: shortid.generate()}
    ]);
  })
  .then(function () {
    return knex('invoices').del()
  })
  .then(function(){
    return knex('invoices').insert([
      {user_id: 1}
    ])
  })
};
