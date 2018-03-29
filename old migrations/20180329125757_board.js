
exports.up = function(knex, Promise) {
    return knex.schema.createTable('board', table => {
        table.increments();
        table.string('name');
        table.string('text');
        table.string('author');
        table.string('state');
        table.string('assigned');
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tasks');
};
