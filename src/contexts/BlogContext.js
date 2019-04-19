import React from 'react';
import {useLocalStorage} from '../hooks';

let BlogContext;
const {Provider} = (BlogContext = React.createContext());

function BlogProvider(props) {
  //const [posts, setPosts] = useState([]);

  const [posts, setPosts] = useLocalStorage('posts', []);

  const onAddPost = (text, callback) => {
    const newPosts = [
      ...posts,
      {
        id: new Date().getTime(),
        dateAt: new Date(),
        text,
      },
    ];

    setPosts(newPosts);
    callback && callback('success');
  };

  return <Provider value={{posts, onAddPost}}>{props.children}</Provider>;
}

export {BlogProvider, BlogContext};
