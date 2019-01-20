

exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function(table){
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title')
    table.string('body')
    table.string('img_url')
    table.string('github_url')
    table.string('src_url')

    table.jsonb('tags').notNullable().defaultTo("[]")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};

