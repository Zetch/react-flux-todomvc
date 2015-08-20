import React from 'react';
import TodoActions from '../actions/TodoActions';


class TodoForm extends React.Component {

  // Init
  constructor(props) {
    super(props);
    this.state = { name: '', allDone: false };
    // Binding
    this._handleCheckAll = this._handleCheckAll.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  // Actions
  _handleCheckAll() {
    this.setState({ allDone: !this.state.allDone }, function() {
      TodoActions.toggleAll(this.state.allDone);
    });
  }

  _handleDeleteCompleted() {
    TodoActions.destroyCompleted();
  }

  _handleEdit(e) {
    this.setState({ name: e.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (this.state.name.trim() != '') {
      TodoActions.create(this.state.name);
      this.setState({ name: '' });
    }
  }

  // Rendering
  render() {
    return (
      <div className="todo-form">
        <form className="form-inline" onSubmit={ this._handleSubmit }>
          <div className="input-group">
            <span className="input-group-addon">
              <input
                type="checkbox"
                value={ this.state.allDone }
                onChange={ this._handleCheckAll } />
            </span>
            <input
              type="text"
              className="form-control"
              value={ this.state.name }
              onChange={ this._handleEdit } />
            <span className="input-group-btn">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={ this._handleSubmit }>
                Add
              </button>
              <button
                className="btn btn-danger"
                value="Delete Completed"
                onClick={ this._handleDeleteCompleted }>
                Delete Completed
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }

}

export default TodoForm;