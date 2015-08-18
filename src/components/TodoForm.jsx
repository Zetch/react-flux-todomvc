var React = require('react');
var TodoActions = require('../actions/TodoActions');


var TodoForm = React.createClass({

  // Init
  getInitialState: function() {
    return { name: '', allDone: false };
  },

  // Actions
  _handleCheckAll: function() {
    this.setState({ allDone: !this.state.allDone }, function() {
      TodoActions.toggleAll(this.state.allDone);
    });
  },

  _handleDeleteCompleted: function() {
    TodoActions.destroyCompleted();
  },

  _handleEdit: function(e) {
    this.setState({ name: e.target.value });
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.name.trim() != '') {
      TodoActions.create(this.state.name);
      this.setState({ name: '' });
    }
  },

  // Rendering
  render: function() {
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

});

module.exports = TodoForm;