import React, {useContext} from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import TodoListFooter from './components/TodoListFooter';
import {TodoContext} from '../../contexts/TodoContext';

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
  const {
    items,
    handleChangeComplete,
    handleUnselectAll,
    handleDeleteItem,
    handleEditItem,
    handleSelectAll,
  } = useContext(TodoContext);

  return (
    <Page>
      <CreateTodo />
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
