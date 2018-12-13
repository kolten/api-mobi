
exports.up = function(knex, Promise) {
  return knex.schema.createTable('password_resets', function(table) {
    table.string('token')
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('expires_at').defaultTo(knex.raw(`CURRENT_TIMESTAMP + '00:30:00'::interval`));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('password_resets');
};
