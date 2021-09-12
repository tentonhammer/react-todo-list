import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {
  // console.log('todos', todos); //! Тут массив!!!!!!!!!!
  const elements = todos.map(todoItem => {
    // Получаем пропсы
    const {id, ...props} = todoItem;
    //! Лепим разметку из нескольких <li>
    return (
      <li key={todoItem.id} className="list-group-item">
        <TodoListItem
          {...props}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });
  // console.log('elements', elements); //! Массив реакт-элементов!!!!!!
  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
