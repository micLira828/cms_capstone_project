import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePostModal from "./Posts/CreatePostModal";
import OpenModalButton from "../OpenModalButton";
import { getOneBlog } from "../../store/blog";
import {Link, NavLink} from "react-router-dom";
// import { getBlogPosts } from '../../store/post';
import Posts from './Posts'



const BlogDetails = () => {
  const dispatch = useDispatch();
  let { blogId } = useParams();

     
  let blog = useSelector((state) => state.blog.byId[blogId]);
  const sessionUser = useSelector((state) => state.session.user);

   
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
  }, [dispatch, isLoaded]);


  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

   
  return (
    <>
       <h2>{blog.title}</h2>
       {sessionUser.id === blog.userId ? <div>
        <OpenModalButton 
                 modalComponent = {<CreatePostModal blog = {blog}/>}
                 buttonText = {'Create a Post'}
        />
       </div>: ""}
       <div className="authorBox">
         <p><strong>Created by:</strong>{blog?.User?.username} <br></br>or:<em>{blog?.User?.firstName} {blog?.User?.lastName}</em></p>
         <p>{blog.category}</p>
         <NavLink to = {`/users/${blog?.userId}`}>View More Blogs By This User</NavLink>
       </div>
       <p><em>{blog?.description}</em></p>
        <Posts blog = {blog} /> 
    </>
  );
};

export default BlogDetails;