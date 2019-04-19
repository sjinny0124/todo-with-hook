import React from 'react';

let BlogContext;
const {Provider} = (BlogContext = React.createContext());

class BlogProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [], //블로그 글 목록
      onAddPost: (text, callback) => {
        /**
         * 1. API를 이용해서 원격지에 저장하고 그 응답을 받아서 this.setState({posts})에 저장
         * 2. 로컬스토리지에 저장
         * 3. 메모리 쓰기
         */

        this.setState(state => {
          return {
            posts: [
              ...state.posts,
              {
                id: new Date().getTime(),
                dateAt: new Date(),
                text,
              },
            ],
          };
        });

        callback && callback('success');
      },
    };
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export {BlogProvider, BlogContext};
