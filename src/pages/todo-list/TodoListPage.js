import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import FooterTodo from './components/FooterTodo';

const Page = styled.div`
  min-height: 80vh;
  padding: 50px;

  .CreateTodo {
    margin-bottom: 20px;
  }

  .FooterTodo {
    display: flex;
    justify-content: space-between;

    div {
      span {
        margin-left: 10px;
      }
    }
  }
`;

function TodoListPage(props) {
  const initialState = () => {
    const todo = localStorage.getItem('todos') || '[]';
    return JSON.parse(todo);
  };

  const [items, setItems] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

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
    //localStorage.setItem('todos', JSON.stringify(items));
    setItems([...items]);
  };

  const handleDeleteItem = index => {
    items.splice(index, 1);
    //localStorage.setItem('todos', JSON.stringify(items));
    setItems([...items]);
  };

  const handleAddItem = text => {
    const newItems = [...items, {name: text, completed: false}];
    setItems(newItems);
  };

  return (
    <Page>
      <CreateTodo onCreate={handleAddItem} />
      <TodoList
        items={items}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
        onChangeComplete={handleChangeComplete}
      />
      <FooterTodo
        items={items}
        onSelectAll={handleSelectAll}
        onUnselectAll={handleUnselectAll}
      />
    </Page>
  );
}

export default TodoListPage;
