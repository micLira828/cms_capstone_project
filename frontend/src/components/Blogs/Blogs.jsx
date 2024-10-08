import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../store/blog';
import Card from './Card'
import './Blogs.css'

const Blogs = () => {
    const dispatch = useDispatch();
     
    const blogs = useSelector((state) => state.blog.allBlogs);

    
    useEffect(() => {
        dispatch(getAllBlogs());
      }, [dispatch]);

    return (
        <div className = "blogs">
             {blogs?.map((blog) => (
                <div key = {blog.id}>
                 <Card  blog={blog}/>
                 </div>
            ))}
        </div>
    );
}

export default Blogs;