import React, {useContext} from 'react';
import {BlogContext} from '../../contexts/BlogContext';

export default function BlogDetailPage(props) {
  const {
    params: {postId},
  } = props.match;

  const {posts} = useContext(BlogContext);
  console.log('id', postId, posts);

  const ids = posts.map(({id}) => id);

  console.log('postId...', ids.includes(postId - 0));

  if (!ids.includes(postId - 0)) {
    props.history.replace('/blog');
  }
  return <div>블로그 상세 페이지</div>;
}
