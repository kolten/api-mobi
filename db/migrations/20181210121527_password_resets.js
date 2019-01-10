
exports.up = function(knex) {
  return knex.schema.createTable('password_resets', function(table) {
    table.increments('id')
    table.string('token')
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('expires_at').defaultTo(knex.raw(`CURRENT_TIMESTAMP + '00:30:00'::interval`));
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('password_resets');
};
