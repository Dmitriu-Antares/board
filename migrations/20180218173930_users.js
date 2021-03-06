
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string('fullname').notNullable();
      table.string('username').notNullable().unique;
      table.string('email').notNullable().unique;
      table.string('password').notNullable();
      table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
