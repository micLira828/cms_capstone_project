
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteBlogModal from './DeleteBlogModal';
import { PiFileMagnifyingGlassLight } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import './Card.css'
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
         <div className = 'content'>
            <h2>{blog.title}</h2> 
            <h4><em>#{blog.category}</em></h4>
            <p>{blog.description}</p>
          
         
          <div className = "buttonGroup">
            <button onClick = {navigateToPost} className = "viewPosts"><PiFileMagnifyingGlassLight />View Posts</button>
         
        
         {sessionUser && sessionUser.id === blog.userId ? <>
            
            <button onClick = {updatePost}><FaEdit/></button>
            <OpenModalButton 
                 modalComponent = {<DeleteBlogModal blogId = {blog.id}/>}
                 buttonText = {<FaRegTrashCan />}
                /> 
         </>: ""}
         </div>
         </div>
        
        </div>
        // </Link>
    );
}
export default Card;