var React = require('react');
var TodoList = require('./TodoList');
var TodoForm = require('./TodoForm');


var TodoApp = React.createClass({

  render: function() {
    return (
      <div className="todo-app">
        <TodoForm />
        <TodoList />
      </div>
    );
  }

});

module.exports = TodoApp;