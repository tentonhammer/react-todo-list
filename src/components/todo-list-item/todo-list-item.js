import './todo-list-item.css';
import {Component} from 'react';

export default class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      important: false,
    };
  }

  render() {
    const {label, onDeleted, onToggleDone, onToggleImportant, done, important} =
      this.props;
    let classes = 'todo-list-item';
    if (done) {
      classes += ' done';
    }
    if (important) {
      classes += ' important';
    }

    return (
      <span className={classes}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-end"
          onClick={onToggleImportant}
        >
          <i className="fas fa-exclamation" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-end"
          onClick={onDeleted}
        >
          <i className="fas fa-trash" />
        </button>
      </span>
    );
  }
}
