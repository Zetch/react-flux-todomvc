var React = require('react');
var TodoList = require('./TodoList');
var TodoForm = require('./TodoForm');


var TodoApp = React.createClass({

  render: function() {
    return (
      <div className="container todo-app">
        <div className="row">
          <div className="col-xs-6">
            <h1>TodoList</h1>
            <TodoForm />
            <TodoList />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TodoApp;