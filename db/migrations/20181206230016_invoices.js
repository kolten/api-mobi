
exports.up = function(knex, Promise) {
  return knex.schema.createTable('invoices', function(table) {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.string('stripe_charge_id');
    table.boolean('is_cash').defaultTo('false');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('invoices');
};
