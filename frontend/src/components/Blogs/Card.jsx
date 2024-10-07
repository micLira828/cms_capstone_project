
import { useNavigate} from 'react-router-dom';
// import { useSelector } from "react-redux";

const Card = ({blog}) => {// optional: callback function that will be called once the modal is closed}) => {
   const navigate = useNavigate();
//    const sessionUser =  useSelector((state) => state.session.user);

   const navigateToPost = () => {
    navigate(`/blogs/${blog.id}/posts`)
   }
  
  return (
    //   <Link className = "blogCard" to ={`/blogs/${blog.id}/posts`}>
        <div className = 'card'>
         <div className = 'cardBody'>
            <h4>{blog.title}</h4> 
            <p><em>{blog.description}</em></p>
         </div>
         <button onClick = {navigateToPost} className = "blogCard">View Posts</button>
         {/* {sessionUser.id === blog.userId ? <div className = "usersOptions">
            <button>Edit Blog</button>
            <button>Delete Blog</button>
         </div>: ""} */}
        </div>
        // </Link>
    );
}
export default Card;