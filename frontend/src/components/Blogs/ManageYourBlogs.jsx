import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUsersBlogs } from '../../store/blog';
import { NavLink } from 'react-router-dom';
import Header from '../Header';

import Card from './Card'
import './Blogs.css'

const ManageYourBlogs = () => {
    const dispatch = useDispatch();

    const yourBlogs = useSelector((state) => state.blog.allBlogs);
    const navigate = useNavigate();

    console.log('Your blogs are ', yourBlogs)

    const yourFirstName = yourBlogs[0].User.firstName;
    const yourLastName = yourBlogs[0].User.lastName;

    const name = yourFirstName + '' + yourLastName

    const navigateToCreateBlogPage = () => {
        navigate(`/blogs/new`)
    }

    useEffect(() => {
        dispatch(getCurrentUsersBlogs());
      }, [dispatch]);

    return (
        <>
       <Header title = {name}/>
       <div className = "desc">
             <p>This is a page with all of your blogs.
                Scroll below to view, or click on the button
                below to create a new one!
             </p>
            <button onClick = {navigateToCreateBlogPage} > Create a Blog </button>
       </div>
        <div className = "blogs">
             {yourBlogs?.map((blog) => (
                <div key = {blog.name}>
                 <Card  blog={blog}/>
                 </div>
            ))}
        </div>
        </>
    );
}

export default ManageYourBlogs;