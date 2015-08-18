var React = require('react');
var TodoItem = require('./TodoItem');
var TodoStore = require('../stores/TodoStore');


var TodoList = React.createClass({

  // Init
  getInitialState: function() {
    return { items: TodoStore.getAll() };
  },

  // Lifecycle
  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(nextProps, nextState) {
    TodoStore.removeChangeListener(this._onChange);
  },

  // Actions
  _onChange: function(e) {
    this.setState({ items: TodoStore.getAll() });
  },

  // Rendering
  render: function() {
    var items = Object.keys(this.state.items).map(function(key) {
      return (
        <TodoItem
          key={ key }
          id={ this.state.items[key].id }
          name={ this.state.items[key].name }
          done={ this.state.items[key].done } />
      );
    }.bind(this));

    return (
      <div className="todo-list">
        { items }
      </div>
    );
  }

});

module.exports = TodoList;