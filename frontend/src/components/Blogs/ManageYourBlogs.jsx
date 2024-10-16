import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUsersBlogs } from '../../store/blog';
import Header from '../Header';

import Card from './Card'
import './Blogs.css'

const ManageYourBlogs = () => {
    const dispatch = useDispatch();


    const yourBlogs = useSelector((state) => state.blog.allBlogs);
    const navigate = useNavigate();

    console.log('Your blogs are ', yourBlogs)

   
    const navigateToCreateBlogPage = () => {
        navigate(`/blogs/new`)
    }

    useEffect(() => {
        dispatch(getCurrentUsersBlogs());
      }, [dispatch]);

    return (
        <>
        <Header title = "Your Blogs"/>
       <div className = "desc">
             <p>This is a page with all of your blogs.
                Scroll below to view, or click on the button
                below to create a new one!
             </p>
            <button onClick = {navigateToCreateBlogPage}> Create a Blog </button>
       </div>
        <div className = "blogs">
             {yourBlogs ? yourBlogs.map((blog) => (
                <div key = {blog.name}>
                 <Card  blog={blog}/>
                 </div> 
            )) : <><h2>You do not have any blogs yet!</h2><button onClick = {navigate('/blogs/new')}>Create A blog</button></>}
        </div>
        </>
    );
}

export default ManageYourBlogs;