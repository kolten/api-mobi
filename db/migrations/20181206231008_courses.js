
exports.up = function(knex, Promise) {
  return knex.schema.createTable('courses', function(table){
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title')
    table.string('img_url')
    table.string('github_url')
    table.string('playlist_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('courses');
};
