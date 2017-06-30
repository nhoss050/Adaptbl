exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('likes', function (table) {
      table.increments();

      table.string('name').unique();
      table.integer('like');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('likes')
  ]);
};
