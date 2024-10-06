import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneBlog } from "../../store/blog";
import {Link, NavLink} from "react-router-dom";
// import { getBlogPosts } from '../../store/post';
import Posts from './Posts'



const BlogDetails = () => {
  const dispatch = useDispatch();
  let { blogId } = useParams();

  let blog = useSelector((state) => state.blog.byId[blogId]);
  console.log('My blog is ', blog)
   
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = async () => {
    const curr = await dispatch(getOneBlog(blogId));
    console.log("The bunnies live in", curr)
  };

  useEffect(() => {
   
    if (!blog) {
        getData();
    } else {
      setIsLoaded(true);
    }
  }, [dispatch, blog, isLoaded]);


  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

   
  
  return (
    <>
       <h2>{blog.title}</h2>
       <div className="authorBox">
         <p><strong>Created by:</strong>{blog.User.username} <br></br>or:<em>{blog.User.firstName} {blog.User.lastName}</em></p>
         <NavLink to = {`/users/${blog.userId}`}>View More Blogs By This User</NavLink>
       </div>
       <p><em>{blog.description}</em></p>
        <Posts blog = {blog} /> 
    </>
  );
};

export default BlogDetails;