import React from 'react';
import TodoItem from './TodoItem';
import TodoStore from '../stores/TodoStore';

const ALL = 0;
const COMPLETED = 1;
const UNCOMPLETED = 2;


class TodoList extends React.Component {

  // Defaults
  state = {
    items: TodoStore.getState(),
    visibility: ALL
  };

  // Lifecycle
  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }
  componentWillUnmount(nextProps, nextState) {
    TodoStore.removeChangeListener(this._onChange);
  }

  // Actions
  _onChange = (e) => {
    this.setState({ items: TodoStore.getState() });
  }

  _onChangeVisibility = (e) => {
    this.setState({ visibility: parseInt(e.target.id) });
  }

  // Rendering
  render() {
    let items = Object.keys(this.state.items)
      .filter(key => {
        switch (this.state.visibility) {
          case COMPLETED:   return this.state.items[key].done;
          case UNCOMPLETED: return !this.state.items[key].done;
          default:          return true;
        }
      })
      .map(key => {
        return (
          <TodoItem
            key={ key }
            id={ this.state.items[key].id }
            name={ this.state.items[key].name }
            done={ this.state.items[key].done } />
        );
      });

    return (
      <div className="todo-list">
        <ul className="list-group">
          { items }
        </ul>
        <hr />
        <div className="btn-group" role="group">
          <button
            id={ ALL }
            type="button"
            className={ "btn btn-default" + (this.state.visibility == '0' ? ' active':'') }
            onClick={ this._onChangeVisibility }>All</button>
          <button
            id={ COMPLETED }
            type="button"
            className={ "btn btn-default" + (this.state.visibility == '1' ? ' active':'') }
            onClick={ this._onChangeVisibility }>Completed</button>
          <button
            id={ UNCOMPLETED }
            type="button"
            className={ "btn btn-default" + (this.state.visibility == '2' ? ' active':'') }
            onClick={ this._onChangeVisibility }>Uncompleted</button>
        </div>
      </div>
    );
  }

}

export default TodoList;