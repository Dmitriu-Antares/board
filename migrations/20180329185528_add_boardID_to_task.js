exports.up = function(knex, Promise) {
    return knex.schema.table('tasks', table => {
        table.integer('boardID');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('tasks', table => {
        table.dropColumn('boardID');
    });
};