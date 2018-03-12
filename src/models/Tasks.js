import bookshelf from '../../bookshelf';
import Boards from './Boards';

export const Tasks = bookshelf.Model.extend({
    tableName: 'tasks',
    author: function() {
        return this.belongsTo(Boards);
    }
});