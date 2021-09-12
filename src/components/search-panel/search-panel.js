import './search-panel.css';
import {Component} from 'react';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  onSearch = event => {
    const searchText = event.target.value;
    this.setState({searchText});
    this.props.onSearch(searchText);
  };

  render() {
    return (
      <input
        type="text"
        className="search-input form-control"
        placeholder="Type to search..."
        onChange={this.onSearch}
        value={this.state.searchText}
      />
    );
  }
}
