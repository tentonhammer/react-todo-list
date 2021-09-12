import './App.css';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import {Component} from 'react';
import ItemAddForm from '../item-add-form';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createTodoItem('Drink coffee'),
        this.createTodoItem('Build React App'),
        this.createTodoItem('Have a lunch'),
      ],
      todoDataFiltered: [],
      currentFilter: 'all',
      searchText: '',
    };
  }
  maxId = 100;

  deleteItem = id => {
    this.setState(({todoData}) => {
      return {
        todoData: todoData.filter(elem => elem.id !== id),
        // todoDataFiltered: todoData.filter(elem => elem.id !== id),
      };
    });
  };

  addItem = text => {
    this.setState(({todoData}) => {
      return {
        todoData: [...todoData, this.createTodoItem(text)],
      };
    });
    // this.setState(({todoData}) => {
    //   return {
    //     todoDataFiltered: [...todoData],
    //   };
    // });
  };

  onToggleImportant = id => {
    this.setState(({todoData}) => {
      return {
        todoData: this.changeTodoItemProperty(todoData, id, 'important'),
        // todoDataFiltered: this.changeTodoItemProperty(
        //   todoData,
        //   id,
        //   'important',
        // ),
      };
    });
  };

  onToggleDone = id => {
    this.setState(({todoData}) => {
      return {
        todoData: this.changeTodoItemProperty(todoData, id, 'done'),
        // todoDataFiltered: this.changeTodoItemProperty(todoData, id, 'done'),
      };
    });
  };

  onStatusChange = label => {
    console.log('onStatusChange');
    // При смене статуса сбрасываем фильтр по тексту
    console.log('status', label);
    this.setState({
      currentFilter: label,
      searchText: '',
    });
    // switch (label) {
    //   case 'all':
    //     this.setState(({todoData}) => {
    //       return {
    //         currentFilter: label,
    //         todoDataFiltered: [...todoData],
    //       };
    //     });
    //     break;
    //   case 'active':
    //     this.setState(({todoData}) => {
    //       return {
    //         currentFilter: label,
    //         todoDataFiltered: [...todoData.filter(elem => !elem.done)],
    //       };
    //     });
    //     break;
    //   case 'done':
    //     this.setState(({todoData}) => {
    //       return {
    //         currentFilter: label,
    //         todoDataFiltered: [...todoData.filter(elem => elem.done)],
    //       };
    //     });
    //     break;
    //   default:
    //     this.setState(({todoData}) => {
    //       return {
    //         currentFilter: label,
    //         todoDataFiltered: [...todoData],
    //       };
    //     });
    // }
  };

  search = (items, text) => {
    if (text.length === 0) {
      return items;
    }
    return items.filter(elem =>
      elem.label
        .toString()
        .toLowerCase()
        .includes(text.toString().toLowerCase()),
    );
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(elem => !elem.done);
      case 'done':
        return items.filter(elem => elem.done);
      default:
        return items;
    }
  };

  onSearchChange = text => {
    this.setState({searchText: text});
  };

  findItem = (todoData, id) => {
    return todoData.findIndex(elem => elem.id === id);
  };

  createTodoItem = label => {
    return {label, important: false, done: false, id: this.maxId++};
  };

  changeTodoItemProperty = (arr, id, label) => {
    const index = this.findItem(arr, id);
    const oldItem = arr[index];
    const newItem = {...oldItem, [label]: !oldItem[label]};
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  render() {
    const {todoData, searchText, currentFilter} = this.state;
    const filtered = this.filter(
      this.search(todoData, searchText),
      currentFilter,
    );
    const doneCount = todoData.filter(elem => elem.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <div>
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel
              onSearch={this.onSearchChange}
              searchText={searchText}
            />
            <ItemStatusFilter
              onStatusChange={this.onStatusChange}
              currentFilter={currentFilter}
            />
          </div>
          <TodoList
            todos={filtered}
            onDeleted={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
          />
          <ItemAddForm onNewItem={this.addItem} />
        </div>
      </div>
    );
  }
}
