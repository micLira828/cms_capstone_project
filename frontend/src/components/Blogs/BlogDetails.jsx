import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOneBlog } from "../../store/blog";
import Header from "../Header";
import Posts from './Posts';



const BlogDetails = () => {
  const dispatch = useDispatch();
  let { blogId } = useParams();

     
  let blog = useSelector((state) => state.blog.byId[blogId]);
  // const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

   
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = async () => {
    const curr = await dispatch(getOneBlog(blogId));
    console.log("The bunnies live in", curr)
  };

  const navigateToUsersBlogs = () => {
      navigate(`/users/${blog?.userId}`)
  }


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
       <Header title = {blog.title}/>
       
       <div className = "desc">
       <div className="authorBox">
         <p><strong>Created by:</strong>{blog?.User?.username} <br></br>or:<em>{blog?.User?.firstName} {blog?.User?.lastName}</em></p>
         <p>#{blog.category}</p>
         <button onClick = {navigateToUsersBlogs}>View More Blogs By User</button>
       </div> 
       <p><em>{blog?.description}</em></p>
       </div>
        <Posts blog = {blog} /> 
        
    </>
  );
};

export default BlogDetails;