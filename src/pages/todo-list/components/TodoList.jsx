import React from 'react';
import TodoListItem from './TodoListItem';
import StyledTodoList from './StyledTodoList.jsx';
import PropTypes from 'prop-types';

function TodoList(props) {
  const {items, onDelete, onEdit, onChangeComplete} = props;

  const handleChangeComplteItem = (item, index, value) => {
    item.completed = value;
    onChangeComplete(index, item);
  };

  return (
    <StyledTodoList className="TodoList">
      <div>
        {items.map((item, index) => {
          return (
            <TodoListItem
              key={`item-${index}`}
              {...item}
              onDelete={e => onDelete(index)}
              onEdit={value => onEdit(index, value)}
              onChangeSelect={e =>
                handleChangeComplteItem(item, index, e.target.checked)
              }
            />
          );
        })}
      </div>
    </StyledTodoList>
  );
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
  onUnselectAll: PropTypes.func,
};

export default TodoList;
