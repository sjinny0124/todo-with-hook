import React, {useRef, useState} from 'react';
import {Input} from 'antd';

const MAX_LEN = 20;

export default function CreateTodo(props) {
  const {onCreate} = props;
  const inputRef = useRef();
  const [count, setCount] = useState(MAX_LEN);

  const handleEnterTodoText = e => {
    if (e.target.value === '') {
      return;
    }

    onCreate(e.target.value);
    inputRef.current.setState({
      value: '',
    });
  };

  /**
   * key down -> key up -> press
   */
  const handleKeyDown = e => {
    const text = e.target.value;

    //console.log(e.key, e.target.value);
    console.log(text.length);

    if (20 <= text.length && e.key !== 'Backspace') {
      e.preventDefault();

      //한글 길이 제한
      inputRef.current.setState({
        value: text.substr(0, 18),
      });

      //alert(`${MAX_LEN}자 이내로 입력하세요!`);
    }
  };

  const handleKeyUp = e => {
    const text = e.target.value;
    setCount(MAX_LEN - text.length);
  };

  return (
    <div className="CreateTodo">
      <Input
        length={20}
        ref={inputRef}
        onPressEnter={handleEnterTodoText}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        addonAfter={<div>{count}</div>}
      />
    </div>
  );
}
