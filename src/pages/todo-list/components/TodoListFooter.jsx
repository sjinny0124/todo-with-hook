import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';

const Footer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    span {
      margin-left: 10px;
    }
  }
`;
export default function TodoListFooter(props) {
  const {items, onUnselectAll, onSelectAll} = props;
  const isSelectedAll = items.every(({completed}) => completed);

  return (
    <Footer className="TodoListFooter">
      {isSelectedAll ? (
        <Button onClick={onUnselectAll}>선택해제</Button>
      ) : (
        <Button onClick={onSelectAll}>전체선택</Button>
      )}

      <div>
        <span>할일 {items.filter(item => !item.completed).length}</span>
        <span>완료 {items.filter(item => item.completed).length}</span>
      </div>
    </Footer>
  );
}
