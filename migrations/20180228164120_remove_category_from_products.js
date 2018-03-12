
exports.up = function(knex, Promise) {
    return knex.schema.table('boards', table => {
        table.dropColumn('admin');
        table.integer('adminID');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('products', table => {
        table.dropColumn('adminID');
    });
};
