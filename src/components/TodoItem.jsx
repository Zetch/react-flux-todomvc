import React from 'react';
import TodoActions from '../actions/TodoActions';


class TodoItem extends React.Component {

  // Defaults
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    done: React.PropTypes.bool
  };

  static defaultProps = {
    done: false
  };

  state = {
    name: this.props.name,
    isEditable: false
  };

  // Actions
  _handleEdit = (e) => {
    this.setState({ name: e.target.value });
  }

  _handleEditBlur = () => {
    this._toggleEditor();
  }

  _handleCheck = () => {
    if (this.props.done) {
      TodoActions.uncomplete(this.props.id);
    } else {
      TodoActions.complete(this.props.id);
    }
  }

  _handleDelete = () => {
    TodoActions.destroy(this.props.id);
  }

  _toggleEditor = () => {
    this.setState({
      isEditable: !this.state.isEditable
    }, function() {
      if (this.state.isEditable) {
        React.findDOMNode(this.refs.inputName).focus();
      } else {
        TodoActions.update(this.props.id, this.state.name);
      }
    });
  }


  // Rendering
  render() {
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
            className="btn btn-danger btn-xs pull-right"
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

}

export default TodoItem;