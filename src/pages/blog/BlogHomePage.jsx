import React, {useContext} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import {AuthContext} from '../../contexts/AuthContext';
import {BlogContext} from '../../contexts/BlogContext';
import {markdown} from 'markdown';
import {Link} from 'react-router-dom';

const Page = styled.div`
  .new-post-button {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    position: fixed;
    right: 10px;
    bottom: 10px;

    .ant-btn-primary {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
`;

console.log(markdown);
export default function BlogHomePage(props) {
  //라우트와 1:1매칭 -> history, location, match를 갖고있음
  const {isAuthenticated} = useContext(AuthContext);
  const {posts} = useContext(BlogContext);

  console.log(props);
  function handleClick() {
    props.history.push('/blog/new-post');
  }

  return (
    <Page>
      <h2>블로그 홈 페이지</h2>
      <div>
        {posts.map(post => {
          return (
            <div key={post.id}>
              <Link to={`/blog/${post.id}`}>
                <div
                  dangerouslySetInnerHTML={{__html: markdown.toHTML(post.text)}}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {isAuthenticated && (
        <div className="new-post-button">
          <Button type="primary" icon="plus" onClick={handleClick} />
        </div>
      )}
    </Page>
  );
}
