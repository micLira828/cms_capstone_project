// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Description from './components/Description';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Blogs from './components/Blogs';
import CreateBlog from './components/Blogs/CreateBlog';
import BlogDetails from './components/Blogs/BlogDetails';
import UpdateBlogForm from './components/Blogs/UpdateBlogForm';
import UsersBlogs from './components/Blogs/UsersBlogs';
import ManageYourBlogs from './components/Blogs/ManageYourBlogs';

import * as sessionActions from './store/session';



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (<>
          <Header title="Welcome!"/>
          <Description/>
          <Blogs/>
        </>)
      },
      {
        path: "signup",
        element: <SignupFormPage />
      },
      {
        path: "/blogs/:blogId/posts",
        element: <BlogDetails/>
      },
      {
        path: "/blogs/current",
        element: <ManageYourBlogs/>
      },
      {
        path: "/blogs/new",
        element: <CreateBlog/>
      },
      {
        path: "/blogs/:blogId/update",
        element: <UpdateBlogForm/>
      },
      {
        path: "/users/:userId",
        element: <UsersBlogs/>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;