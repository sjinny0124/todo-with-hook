import React from 'react';
import {Button} from 'antd';

export default function FooterTodo(props) {
  const {items, onUnselectAll, onSelectAll} = props;
  const isSelectedAll = items.every(({completed}) => completed);

  return (
    <div className="FooterTodo">
      {isSelectedAll ? (
        <Button onClick={onUnselectAll}>선택해제</Button>
      ) : (
        <Button onClick={onSelectAll}>전체선택</Button>
      )}

      <div>
        <span>할일 {items.filter(item => !item.completed).length}</span>
        <span>완료 {items.filter(item => item.completed).length}</span>
      </div>
    </div>
  );
}
