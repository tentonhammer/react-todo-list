import './item-add-form.css';
import {Component} from 'react';

export default class ItemAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = event => {
    this.setState(() => {
      return {label: event.target.value};
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onNewItem(this.state.label);
    this.setState({label: ''});
  };

  render() {
    return (
      <form className="d-flex bottom-panel" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="text-input form-control"
          placeholder="What needs to be done?"
          id="newItemName"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button type="submit" className="btn btn-outline-primary">
          Add item
        </button>
      </form>
    );
  }
}
