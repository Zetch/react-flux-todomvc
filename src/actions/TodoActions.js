import TodoDispatcher from '../dispatcher/TodoDispatcher';
import TodoConstants from '../constants/TodoConstants';


const TodoActions = {

  create: function(text) {
    console.info('CREATE');
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_CREATE,
      name: text
    });
  },

  destroy: function(id) {
    console.info('DESTROY');
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  update: function(id, text) {
    console.info('UPDATE');
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  complete: function(id) {
    console.info('COMPLETE');
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_COMPLETE,
      id: id
    });
  },

  uncomplete: function(id) {
    console.info('UNDO COMPLETE');
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_UNDO_COMPLETE,
      id: id
    });
  },

  toggleAll: function(state) {
    console.info('TOGGLE ALL');
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL,
      state: state
    });
  },

  destroyCompleted: function() {
    console.info('DESTROY COMPLETED');
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

};

export default TodoActions;