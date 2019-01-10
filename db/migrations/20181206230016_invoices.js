
exports.up = function(knex, Promise) {
  return knex.schema.createTable('invoices', function(table) {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('amount').defaultTo(0)
    table.boolean('paid').defaultTo('false');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('invoices');
};
