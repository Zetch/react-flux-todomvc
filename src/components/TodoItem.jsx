var React = require('react');
var TodoActions = require('../actions/TodoActions');

var TodoItem = React.createClass({

  // Check properties
  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    done: React.PropTypes.bool
  },

  // Default values
  getInitialState: function() {
    return {
      name: this.props.name,
      isEditable: false
    };
  },

  getDefaultProps: function() {
    return {
      done: false
    }
  },

  // Lifecyle
  // componentWillMount: function() {},
  // componentWillReceiveProps: function(nextProps) {},
  // componentWillUpdate: function(nextProps, nextState) {},

  // Actions
  _handleEdit: function(e) {
    this.setState({ name: e.target.value });
  },

  _handleEditBlur: function() {
    this._toggleEditor();
  },

  _handleCheck: function() {
    if (this.props.done) {
      TodoActions.uncomplete(this.props.id);
    } else {
      TodoActions.complete(this.props.id);
    }
  },

  _handleDelete: function() {
    TodoActions.destroy(this.props.id);
  },

  _toggleEditor: function() {
    this.setState({
      isEditable: !this.state.isEditable
    }, function() {
      if (this.state.isEditable) {
        React.findDOMNode(this.refs.inputName).focus();
      } else {
        TodoActions.update(this.props.id, this.state.name);
      }
    });
  },


  // Rendering
  render: function() {
    if (!this.state.isEditable) {
      return (
        <li className="list-group-item todo-item">
          <input
            type="checkbox"
            checked={ this.props.done }
            onChange={ this._handleCheck } />
          <span onDoubleClick={ this._toggleEditor }>
            { this.props.name }
          </span>
          <button
            type="button"
            className="btn btn-default btn-xs pull-right"
            onClick={ this._handleDelete }>
            <span>&times;</span>
          </button>
        </li>
      );

    } else {
      return (
        <li className="list-group-item todo-item">
          <input
            ref="inputName"
            type="text"
            value={ this.state.name }
            onChange={ this._handleEdit }
            onBlur={ this._handleEditBlur } />
        </li>
      );
    }
  }

});

module.exports = TodoItem;