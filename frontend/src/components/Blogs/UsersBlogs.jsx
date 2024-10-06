import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersBlogs } from '../../store/blog';

import { useParams } from 'react-router-dom';
import Card from './Card'
import './Blogs.css'

const UsersBlogs = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const usersBlogs = useSelector((state) => state.blog.allBlogs);

    const usersFirstName = usersBlogs[0].User.firstName;
    const usersLastName = usersBlogs[0].User.lastName

    useEffect(() => {
        dispatch(getUsersBlogs(userId));
      }, [dispatch]);

    return (
        <>
        <h2>{usersFirstName} {usersLastName}</h2>
        <div className = "blogs">
             {usersBlogs?.map((blog) => (
                <div key = {blog.name}>
                 <Card  blog={blog}/>
                 </div>
            ))}
        </div>
        </>
    );
}

export default UsersBlogs;