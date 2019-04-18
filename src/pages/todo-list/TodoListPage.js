import React, {useState} from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

function TodoListPage(props) {
  const todo = localStorage.getItem('todos') || '[]';

  const [items, setItems] = useState(JSON.parse(todo));

  this.headerRef = React.createRef();

  // componentWillUnmount() {
  //   localStorage.setItem('todos', JSON.stringify(this.state.items));
  // }

  const handleSelectAll = () => {
    const {items} = this.state;

    setItems(
      items.map(item => {
        item.completed = true;
        return item;
      })
    );
  };

  const handleUnselectAll = () => {
    const {items} = this.state;
    setItems(
      items.map(item => {
        item.completed = false;
        return item;
      })
    );
  };

  const handleChangeComplete = (idx, item) => {
    const {items} = this.state;
    items[idx] = item;

    setItems([...items]);
  };

  const handleEditItem = (index, value) => {
    const {items} = this.state;
    items[index].name = value;

    localStorage.setItem('todos', JSON.stringify(items));

    setItems([...items]);
  };

  const handleDeleteItem = index => {
    const {items} = this.state;
    items.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(items));

    setItems([...items]);
  };

  const handleAddItem = text => {
    this.setState(prevState => {
      const items = [...prevState.items, {name: text, completed: false}];

      localStorage.setItem('todos', JSON.stringify(items));
      return {
        items,
      };
    });
  };
  return (
    <Page>
      <TodoList
        items={items}
        onCreate={handleAddItem}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
        onSelectAll={handleSelectAll}
        onUnselectAll={handleUnselectAll}
        onChangeComplete={handleChangeComplete}
      />
    </Page>
  );
}

export default TodoListPage;
