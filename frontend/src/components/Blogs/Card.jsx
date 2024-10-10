
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteBlogModal from './DeleteBlogModal';
// import { useSelector } from "react-redux";

const Card = ({blog}) => {// optional: callback function that will be called once the modal is closed}) => {
   const navigate = useNavigate();
   const sessionUser = useSelector((state) => state.session.user);
//    const sessionUser =  useSelector((state) => state.session.user);
   

   const navigateToPost = () => {
    navigate(`/blogs/${blog.id}/posts`)
   }


   const updatePost = () => {
    navigate(`/blogs/${blog.id}/update`)
   }
  
  return (
    //   <Link className = "blogCard" to ={`/blogs/${blog.id}/posts`}>
        <div className = 'card'>
         <div className = 'cardBody'>
            <h4>{blog.title}</h4> 
            <p><em>{blog.description}</em></p>
            <p>{blog.category}</p>
         </div>
         <button onClick = {navigateToPost} className = "blogCard">View Posts</button>
         {sessionUser.id === blog.userId ? <div className = "usersOptions">
            <button onClick = {updatePost}>Edit Blog</button>
            <OpenModalButton 
                 modalComponent = {<DeleteBlogModal blogId = {blog.id}/>}
                 buttonText = {'Delete Blog'}
                /> 
         </div>: ""}
        </div>
        // </Link>
    );
}
export default Card;