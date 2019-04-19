import React, {useRef} from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import TodoListFooter from './components/TodoListFooter';
import {useLocalStorage} from '../../hooks';

const Page = styled.div`
  min-height: 80vh;
  padding: 50px;

  .CreateTodo {
    margin-bottom: 20px;
  }

  .TodoListFooter {
    margin-top: 20px;
  }
`;

function TodoListPage(props) {
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
    <Page>
      <CreateTodo onCreate={handleAddItem} />
      <TodoList
        items={items}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
        onChangeComplete={handleChangeComplete}
      />
      <TodoListFooter
        items={items}
        onSelectAll={handleSelectAll}
        onUnselectAll={handleUnselectAll}
      />
    </Page>
  );
}

export default TodoListPage;
