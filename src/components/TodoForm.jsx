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
    TodoActions.create(this.state.name);
    this.setState({ name: '' });
  },

  // Rendering
  render: function() {
    return (
      <div className="todo-form">
        <form onSubmit={ this._handleSubmit }>
          <input
            type="checkbox"
            value={ this.state.allDone }
            onChange={ this._handleCheckAll } />
          <input
            type="text"
            value={ this.state.name }
            onChange={ this._handleEdit } />
          <input
            type="submit"
            value="Add"
            onClick={ this._handleSubmit } />
          <input
            type="button"
            value="Delete Completed"
            onClick={ this._handleDeleteCompleted } />
        </form>
      </div>
    );
  }

});

module.exports = TodoForm;