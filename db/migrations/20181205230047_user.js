
exports.up = function(knex, Promise) {
  let promises = []

  promises.push(knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'))

  promises.push(knex.schema.createTable('users', function(table) {
    table.increments('id');

    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.string('student_id', 10).notNullable();
    table.string('email', 50).notNullable();
    table.string('password').notNullable();
    // was going to use an enum, but knex complains too much
    table.string('shirt_size').notNullable();

    table.boolean('is_admin').defaultTo('false');
    table.boolean('member').defaultTo('false');
    table.boolean('recieved_shirt').defaultTo('false');
    table.boolean('email_verified').defaultTo('false');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.unique('email');
  }))

  return Promise.all(promises)
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
