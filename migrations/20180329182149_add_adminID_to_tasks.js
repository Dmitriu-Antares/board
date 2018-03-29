
exports.up = function(knex, Promise) {
    return knex.schema.table('tasks', table => {
        table.integer('adminID');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('tasks', table => {
        table.dropColumn('adminID');
    });
};
