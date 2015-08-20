import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import '../styles/app.css';


class TodoApp extends React.Component {

  render() {
    return (
      <div className="container todo-app">
        <h1>TodoApp</h1>
        <TodoForm />
        <TodoList />
      </div>
    );
  }

}

export default TodoApp;