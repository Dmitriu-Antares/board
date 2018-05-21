
exports.up = function(knex, Promise) {
    return knex.schema.createTable('userBoards', table => {
        table.increments();
        table.string('userId').notNullable();
        table.string('boardId').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('userBoards');
};
