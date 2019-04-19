import {useState, useEffect} from 'react';

export function useLocalStorage(key, defaultValue, callback) {
  const initialState = () => {
    const values = JSON.parse(
      localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
    callback && callback(values);
    return values;
  };

  const [items, setItems] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  return [items, setItems];
}
