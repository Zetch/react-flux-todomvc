import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';


class TodoApp extends React.Component {

  render() {
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

}

export default TodoApp;