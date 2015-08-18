var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var _todos = {};

function create(text) {
  var id = Date.now();
  _todos[id] = {
    id: id,
    done: false,
    name: text
  };
}

function destroy(id) {
  delete _todos[id];
}

function update(id, text) {
  _todos[id].name = text;
}

function complete(id) {
  _todos[id].done = true;
}

function uncomplete(id) {
  _todos[id].done = false;
}

function toggleAll(state) {
  Object.keys(_todos).forEach(function(key) {
    _todos[key].done = state;
  });
}

function destroyCompleted() {
  Object.keys(_todos)
    .filter(function(key) {
      return _todos[key].done;
    })
    .forEach(function(key) {
      delete _todos[key];
    });
}


var TodoStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _todos;
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
          create(name);
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UPDATE_TEXT:
        update(action.id, action.text);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_COMPLETE:
        complete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UNDO_COMPLETE:
        uncomplete(action.id);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
        toggleAll(action.state);
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_DESTROY_COMPLETED:
        destroyCompleted();
        TodoStore.emitChange();
        break;
    }

    return true;
  })

});

module.exports = TodoStore;