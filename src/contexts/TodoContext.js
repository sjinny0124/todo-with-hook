import React, {useRef} from 'react';
import {useLocalStorage} from '../hooks';

let TodoContext;
const {Provider} = (TodoContext = React.createContext());

function TodoProvider(props) {
  const todoId = useRef(0);

  const [items, setItems] = useLocalStorage('todos', [], values => {
    todoId.current = values.reduce((sum, value) => {
      return Math.max(sum, value.id); //가장 큰 값을 반환
    }, 0);
  });

  const handleSelectAll = () => {
    setItems(
      items.map(item => {
        item.completed = true;
        return item;
      })
    );
  };

  const handleUnselectAll = () => {
    setItems(
      items.map(item => {
        item.completed = false;
        return item;
      })
    );
  };

  const handleChangeComplete = (idx, item) => {
    items[idx] = item;
    setItems([...items]);
  };

  const handleEditItem = (index, value) => {
    items[index].name = value;
    setItems([...items]);
  };

  const handleDeleteItem = index => {
    items.splice(index, 1);
    setItems([...items]);
  };

  const handleAddItem = text => {
    todoId.current += 1;

    const newItems = [
      ...items,
      {id: todoId.current, name: text, completed: false},
    ];
    setItems(newItems);
  };

  console.log(todoId);

  return (
    <Provider
      value={{
        items,
        handleSelectAll,
        onCreate: handleAddItem,
        handleUnselectAll,
        handleEditItem,
        handleDeleteItem,
        handleChangeComplete,
      }}>
      {props.children}
    </Provider>
  );
}

export {TodoProvider, TodoContext};
