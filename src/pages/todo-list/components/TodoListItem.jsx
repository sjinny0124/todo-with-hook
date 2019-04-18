import React, {useState} from 'react';
import {Checkbox, Input, Icon} from 'antd';

function TodoListItem(props) {
  const {name, completed, onDelete, onEdit, onChangeSelect} = props;
  const [isEditable, setEditable] = useState(false);

  const handleDelete = e => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = e => {
    console.log(e.target.value);
    onEdit(e.target.value);
    setEditable(false);
  };

  return (
    <div className="TodoListItem" onClick={handleEdit}>
      <div className="col-ck-box">
        <Checkbox checked={completed} onChange={onChangeSelect} />
      </div>
      <div className="col-content">
        {isEditable ? (
          <Input defaultValue={name} onPressEnter={handleSave} />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div className="col-cmd-box">
        {!isEditable && <Icon type={'edit'} className={'btn btn-edit'} />}
        {!isEditable && (
          <Icon
            type={'delete'}
            className={'btn btn-delete'}
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default TodoListItem;
