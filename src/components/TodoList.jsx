import React from 'react';
import TodoItem from './TodoItem';
import TodoStore from '../stores/TodoStore';


class TodoList extends React.Component {

  // Defaults
  state = TodoStore.getState();

  // Lifecycle
  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }
  componentWillUnmount(nextProps, nextState) {
    TodoStore.removeChangeListener(this._onChange);
  }

  // Actions
  _onChange = (e) => {
    this.setState(TodoStore.getState());
  }

  // Rendering
  render() {
    let items = Object.keys(this.state.items).map(key => {
      return (
        <TodoItem
          key={ key }
          id={ this.state.items[key].id }
          name={ this.state.items[key].name }
          done={ this.state.items[key].done } />
      );
    });

    return (
      <ul className="list-group todo-list">
        { items }
      </ul>
    );
  }

}

export default TodoList;