import {Component} from 'react';

export default class ItemStatusFilter extends Component {
  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'},
  ];

  checkCurrentFilter = label => {
    const {currentFilter} = this.props;
    const notActiveClass = 'btn btn-outline-secondary';
    const activeClass = 'btn btn-info';
    return currentFilter === label ? activeClass : notActiveClass;
  };

  render() {
    const {onStatusChange} = this.props;
    const buttons = this.buttons.map(({name, label}) => {
      return (
        <button
          key={name}
          type="button"
          className={this.checkCurrentFilter(name)}
          onClick={() => onStatusChange(name)}
        >
          {label}
        </button>
      );
    });
    return <div className="btn-group">{buttons}</div>;
  }
}
