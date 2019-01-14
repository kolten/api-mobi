const hat = require('hat');

exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(function() {
    return knex('users').insert([
      {id: 1, first_name: 'Kolten', last_name: 'Sturgill', student_id: '1001089599', email: 'kolten.sturgill@mavs.uta.edu', password: hat(), is_admin: true, member: true, shirt_size: 'M'},
      {id: 2, first_name: 'Mary', last_name: 'Huerta', student_id: '1001000000', email: 'mary.huerta@mavs.uta.edu', password: hat(), shirt_size: 'S'},
      {id: 3, first_name: 'Zach', last_name: 'Gentry', student_id: '1001011111', email: 'zach.gentry@mavs.uta.edu', password: hat(), shirt_size: 'M'},
    ]);
  })
  .then(function(){
    return knex('password_resets').del()
  })
  .then(function() {
    return knex('password_resets').insert([
      {user_id: 1, token: hat()},
      {user_id: 2, token: hat()},
      {user_id: 3, token: hat()}
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
