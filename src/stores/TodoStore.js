import TodoDispatcher from '../dispatcher/TodoDispatcher';
import TodoConstants from '../constants/TodoConstants';
import TodoStorage from '../api/TodoStorage';
import { EventEmitter } from 'events';
import assign from 'object-assign';


const CHANGE_EVENT = 'change';
const storage = new TodoStorage();

const TodoStore = assign({}, EventEmitter.prototype, {

  getState: function() {
    return storage.getAll() ;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    console.info('Component registered!');
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    console.info('Component unregistered!');
  },

  dispatcherIndex: TodoDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch (action.actionType) {
      case TodoConstants.TODO_CREATE:
        name = action.name.trim();
        if (name != '') {
          storage.create(name);
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        storage.destroy(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UPDATE_TEXT:
        storage.update(action.id, action.text);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_COMPLETE:
        storage.complete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UNDO_COMPLETE:
        storage.uncomplete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
        storage.toggleAll(action.state);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_DESTROY_COMPLETED:
        storage.destroyCompleted();
        TodoStore.emitChange();
        break;
    }

    return true;
  })

});

export default TodoStore;