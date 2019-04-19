import React, {useContext} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import IndexPage from './pages/IndexPage';
import AboutPage from './pages/login/LoginPage';
import TodoListPage from './pages/todo-list/TodoListPage';
import {AuthContext} from './contexts';
import './AppRouter.less';
import BlogHomePage from './pages/blog/BlogHomePage';
import BlogDetailPage from './pages/blog/BlogDetailPage';
import BlogPostPage from './pages/blog/BlogPostPage';
import GuestHomePage from './pages/guest/GuestHomePage';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
};

const AppRouter = props => (
  <Router>
    <div className={'AppRouter'}>
      <Navigation {...props} />
      <Route path="/" exact component={IndexPage} />
      <Route path="/blog" exact component={BlogHomePage} />
      <Switch>
        <PrivateRoute path="/blog/new-post" exact component={BlogPostPage} />
        <Route path="/blog/:title" exact component={BlogDetailPage} />
      </Switch>
      <Route path="/login/" component={AboutPage} />
      <Route path="/guest/" component={GuestHomePage} />
      <PrivateRoute path="/todo-list/" component={TodoListPage} />
    </div>
  </Router>
);
export default AppRouter;
