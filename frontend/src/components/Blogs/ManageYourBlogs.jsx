import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUsersBlogs } from '../../store/blog';

import Card from './Card'
import './Blogs.css'

const ManageYourBlogs = () => {
    const dispatch = useDispatch();

    const yourBlogs = useSelector((state) => state.blog.allBlogs);

    console.log('Your blogs are ', yourBlogs)

    const yourFirstName = yourBlogs[0].User.firstName;
    const yourLastName = yourBlogs[0].User.lastName

    useEffect(() => {
        dispatch(getCurrentUsersBlogs());
      }, [dispatch]);

    return (
        <>
        <h2>{yourFirstName} {yourLastName}</h2>
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