
exports.up = function(knex, Promise) {
  return knex.schema.createTable('boards', table => {
      table.increments();
      table.string('name');
      table.json('admin');
      table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('boards');
};
